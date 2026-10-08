/**
 * Tech Quest — SFX sintetizados con Web Audio API (sin CDN, offline)
 */
const TechAudio = (() => {
  let ctx = null;
  let muted = false;
  // Todos los sonidos pasan por esta ganancia: silenciar corta también las notas ya programadas
  let master = null;
  // Si Web Audio falla (constructor que lanza, API bloqueada…), el juego sigue sin sonido: el sonido es decorativo
  let broken = false;

  function getCtx() {
    if (broken) return null;
    try {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = muted ? 0 : 1;
        master.connect(ctx.destination);
      }
      wake(ctx);
      return ctx;
    } catch (_) {
      broken = true;
      ctx = null;
      master = null;
      return null;
    }
  }

  // Safari/iOS deja el contexto en "interrupted" tras una llamada, Siri o una alarma: se reanuda igual que "suspended"
  function wake(c) {
    if (c && c.state !== "running" && c.state !== "closed") {
      const r = c.resume();
      if (r && typeof r.catch === "function") r.catch(() => {});
    }
  }

  // Al volver a la pestaña o a la app se intenta reanudar, sin crear el contexto antes del primer gesto
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      try { wake(ctx); } catch (_) {}
    }
  });

  function loadMute() {
    try {
      muted = localStorage.getItem(GAME_CONFIG.storageMuted) === "1";
    } catch (_) {
      muted = false;
    }
  }

  function saveMute() {
    try {
      localStorage.setItem(GAME_CONFIG.storageMuted, muted ? "1" : "0");
    } catch (_) {}
  }

  function isMuted() {
    return muted;
  }

  function setMuted(v) {
    muted = !!v;
    saveMute();
    if (ctx && master) {
      try {
        const g = master.gain;
        const t = ctx.currentTime;
        g.cancelScheduledValues(t);
        g.setValueAtTime(g.value, t);
        g.setTargetAtTime(muted ? 0 : 1, t, 0.01);
      } catch (_) {}
    }
  }

  function toggleMute() {
    setMuted(!muted);
    return muted;
  }

  function tone(freq, start, dur, type, gainVal, slideTo) {
    if (muted) return;
    const c = getCtx();
    if (!c) return;
    try {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = type || "square";
      osc.frequency.setValueAtTime(freq, c.currentTime + start);
      if (slideTo != null) {
        osc.frequency.linearRampToValueAtTime(slideTo, c.currentTime + start + dur);
      }
      g.gain.setValueAtTime(0.0001, c.currentTime + start);
      g.gain.exponentialRampToValueAtTime(gainVal, c.currentTime + start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
      osc.connect(g);
      g.connect(master);
      osc.start(c.currentTime + start);
      osc.stop(c.currentTime + start + dur + 0.05);
    } catch (_) {}
  }

  function noiseBurst(start, dur, gainVal) {
    if (muted) return;
    const c = getCtx();
    if (!c) return;
    try {
      const len = Math.floor(c.sampleRate * dur);
      const buf = c.createBuffer(1, len, c.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
      const src = c.createBufferSource();
      src.buffer = buf;
      const g = c.createGain();
      const f = c.createBiquadFilter();
      f.type = "bandpass";
      f.frequency.value = 1200;
      g.gain.setValueAtTime(gainVal, c.currentTime + start);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
      src.connect(f);
      f.connect(g);
      g.connect(master);
      src.start(c.currentTime + start);
    } catch (_) {}
  }

  function playClick() {
    tone(880, 0, 0.06, "square", 0.08);
  }

  function playCorrect() {
    tone(523.25, 0, 0.1, "square", 0.12);
    tone(659.25, 0.1, 0.1, "square", 0.12);
    tone(783.99, 0.2, 0.18, "square", 0.14);
  }

  function playWrong() {
    tone(220, 0, 0.15, "sawtooth", 0.1, 140);
    noiseBurst(0.05, 0.12, 0.06);
  }

  function playLevelComplete() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => tone(f, i * 0.12, 0.2, "square", 0.12));
    tone(1318.5, 0.5, 0.35, "triangle", 0.1);
  }

  function playGameOver() {
    tone(392, 0, 0.2, "sawtooth", 0.1);
    tone(311, 0.22, 0.25, "sawtooth", 0.1);
    tone(233, 0.48, 0.45, "sawtooth", 0.12, 180);
  }

  /** delay: segundos de espera, para sonar después del sonido de acierto o de nivel completado. */
  function playAchievement(delay) {
    const d = delay || 0;
    tone(659.25, d, 0.1, "triangle", 0.11);
    tone(783.99, d + 0.1, 0.1, "triangle", 0.11);
    tone(987.77, d + 0.2, 0.12, "triangle", 0.12);
    tone(1318.5, d + 0.35, 0.28, "square", 0.1);
  }

  function playTick() {
    tone(1200, 0, 0.04, "square", 0.05);
  }

  function playUrgentTick() {
    tone(1600, 0, 0.05, "square", 0.07);
  }

  function unlock() {
    getCtx();
  }

  loadMute();

  return {
    unlock,
    playClick,
    playCorrect,
    playWrong,
    playLevelComplete,
    playGameOver,
    playAchievement,
    playTick,
    playUrgentTick,
    isMuted,
    setMuted,
    toggleMute
  };
})();
