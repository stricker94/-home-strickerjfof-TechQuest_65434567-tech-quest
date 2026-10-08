/**
 * Tech Quest — Helpers de UI
 */
const UI = (() => {
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  let screenAt = 0;

  /** Milisegundos desde el último cambio de pantalla (para ignorar el segundo clic de un doble clic). */
  function sinceScreen() { return performance.now() - screenAt; }

  function showScreen(id) {
    screenAt = performance.now();
    let target = null;
    $all(".screen").forEach((el) => {
      const on = el.id === id;
      el.classList.toggle("active", on);
      if (on) {
        target = el;
        el.classList.remove("screen-enter");
        void el.offsetWidth;
        el.classList.add("screen-enter");
      }
    });
    // El margen para el HUD fijo de Cronómetro y Boss solo hace falta durante la pregunta
    if (id !== "screen-play") document.documentElement.style.scrollPaddingTop = "";
    // La pantalla nueva empieza arriba (si no, en móvil hereda el scroll de una lista larga)
    window.scrollTo(0, 0);
    // Si el foco quedó en una pantalla oculta, llévalo al título de la nueva para teclado y lector de pantalla
    const a = document.activeElement;
    if (target && (!a || a === document.body || !target.contains(a))) {
      const h = target.querySelector("h1, h2");
      if (h) {
        if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "-1");
        h.focus({ preventScroll: true });
      }
    }
  }

  /**
   * Anuncia un texto a lectores de pantalla mediante la región viva persistente #sr-status.
   * Los avisos que llegan casi a la vez (p. ej. varios logros) se leen juntos; con replace solo el último.
   */
  function announce(text, replace) {
    const el = $("#sr-status");
    if (!el || !text) return;
    const prev = !replace && el._q ? el._q : "";
    el._q = prev ? prev + (/[.!?…]$/.test(prev) ? " " : ". ") + text : text;
    el.textContent = "";
    clearTimeout(el._t);
    clearTimeout(el._c);
    // Vaciar y rellenar en otro turno hace que el lector lo lea aunque el texto se repita
    el._t = setTimeout(() => {
      el.textContent = el._q;
      el._q = "";
      // Luego se vacía para que el aviso viejo no aparezca al recorrer otras pantallas
      el._c = setTimeout(() => { el.textContent = ""; }, 7000);
    }, 60);
  }

  function setText(sel, text) {
    const el = $(sel);
    if (el) el.textContent = text;
  }

  function setHTML(sel, html) {
    const el = $(sel);
    if (el) el.innerHTML = html;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /** "★★☆" con un nombre para lectores de pantalla ("2 de 3 estrellas"). */
  function stars(n, max) {
    max = max || 3;
    return `<span class="stars" role="img" aria-label="${n} de ${max} estrellas">${"★".repeat(n)}${"☆".repeat(Math.max(0, max - n))}</span>`;
  }

  /** Escapa el texto y convierte `comando` en <code>comando</code> (para «Pruébalo tú»). */
  function codeText(s) {
    return escapeHtml(s).replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function updateMuteButton() {
    const btn = $("#btn-mute");
    if (!btn) return;
    const m = TechAudio.isMuted();
    // Interruptor con nombre fijo igual al texto visible ("Sonido") y aria-pressed = sonido activado
    btn.innerHTML = '<span aria-hidden="true">' + (m ? "🔇" : "🔊") + "</span> Sonido";
    btn.setAttribute("aria-pressed", m ? "false" : "true");
    btn.title = m ? "Activar sonido (M)" : "Silenciar (M)";
  }

  function updateHUD(st) {
    const livesWrap = $("#hud-lives-wrap");
    if (livesWrap) livesWrap.hidden = !!st.practice;
    // Práctica, Repaso, Reto del día y Tickets no tienen pistas: "Pistas 0" parecería que se gastaron
    const hintsWrap = $("#hud-hints-wrap");
    if (hintsWrap) hintsWrap.hidden = !st.hintsOn;
    if (!st.practice) {
      setText("#hud-lives", "❤️".repeat(Math.max(0, st.lives)) + (st.lives <= 0 ? "💀" : ""));
    }
    setText("#hud-score", String(st.score));
    setText("#hud-streak", String(st.streak));
    setText("#hud-hints", String(st.hintsLeft));
    setText("#hud-progress", (st.qIndex + 1) + " / " + st.totalQ);
    const timerWrap = $("#hud-timer-wrap");
    if (timerWrap) {
      timerWrap.hidden = !st.timed;
      if (st.timed) {
        setText("#hud-timer", Math.max(0, st.timeLeft) + "s");
        timerWrap.classList.toggle("urgent", st.timeLeft <= 5);
      }
    }
    setText("#hud-world", modeLabel(st));
    // Con reloj, el HUD queda fijo arriba (CSS #screen-play.timed); el foco con Tab no debe quedar debajo de él
    const play = $("#screen-play");
    if (play) play.classList.toggle("timed", !!st.timed);
    const hud = $("#screen-play .hud");
    document.documentElement.style.scrollPaddingTop =
      st.timed && hud && hud.offsetHeight ? hud.offsetHeight + 8 + "px" : "";
  }

  /** Texto del modo y el mundo de la partida (HUD y botón «Reanudar partida»). */
  function modeLabel(st) {
    let label = "—";
    if (st.mode === "marathon") label = "🏃 Maratón" + (st.marathonScope === "mine" ? " · Mi nivel" : st.marathonScope === "all" ? " · Todo" : "");
    else if (st.mode === "review") label = "🔁 Repaso de errores";
    else if (st.mode === "daily") label = "📅 Reto del día";
    else if (st.mode === "test") label = "🧪 Modo de prueba";
    else if (st.mode === "ticket") label = "🎫 Ticket" + (st.ticketTitle ? " · " + st.ticketTitle : "");
    else if (st.mode === "boss") {
      const w = getWorldById(st.worldId);
      label = "👹 Boss" + (w ? " · " + w.icon + " " + w.name : "");
    } else if (st.mode === "timer") {
      const w = getWorldById(st.worldId);
      label = "⏱️ Cronómetro" + (w ? " · " + w.name : "");
    } else if (st.practice) {
      const w = getWorldById(st.worldId);
      label = "📚 Práctica" + (w ? " · " + w.name : "");
    } else {
      const w = getWorldById(st.worldId);
      if (w) label = w.icon + " " + w.name + (st.level ? " · Nv." + st.level : "");
    }
    return label;
  }

  function getHighScore() {
    return Math.max(0, parseInt(Progress.readRaw(GAME_CONFIG.storageKey) || "0", 10) || 0);
  }

  function saveHighScore(score) {
    const prev = getHighScore();
    if (score > prev) {
      Progress.writeRaw(GAME_CONFIG.storageKey, String(score));
      return true;
    }
    return false;
  }

  function toast(msg) {
    let el = $("#tq-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "tq-toast";
      el.className = "tq-toast";
      // Lo visual no se lee: el aviso va por la región viva #sr-status
      el.setAttribute("aria-hidden", "true");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    announce(msg);
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2800);
  }

  function flashFeedback(ok) {
    const panel = $("#screen-feedback .panel");
    if (!panel) return;
    panel.classList.remove("flash-ok", "flash-bad");
    void panel.offsetWidth;
    panel.classList.add(ok ? "flash-ok" : "flash-bad");
  }

  return {
    $, $all, showScreen, sinceScreen, setText, setHTML, escapeHtml, shuffle, stars, codeText,
    updateMuteButton, updateHUD, modeLabel, getHighScore, saveHighScore, toast, flashFeedback, announce
  };
})();
