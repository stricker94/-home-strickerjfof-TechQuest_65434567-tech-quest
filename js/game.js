/**
 * Tech Quest — Lógica principal (modos, boss, progresión, logros)
 */
(function () {
  const state = {
    mode: "campaign",
    practice: false,
    timed: false,
    worldId: null,
    level: null,
    questions: [],
    qIndex: 0,
    lives: 3,
    score: 0,
    streak: 0,
    bestStreakRun: 0,
    hintsLeft: 2,
    hintsUsedRun: 0,
    totalQ: 0,
    answered: false,
    matchSelections: {},
    orderItems: [],
    hintUsedThisQ: false,
    hintCost: 0,
    shownAt: 0,
    feedbackAt: 0,
    hintAt: 0,
    feedbackTimedOut: false,
    matchPending: null,
    correctCount: 0,
    wrongCount: 0,
    timeLeft: 0,
    timerId: null,
    pendingAchievements: [],
    runAchievements: [],
    missed: [],
    // Pistas disponibles en esta partida (no en Práctica, Repaso, Reto del día ni Tickets)
    hintsOn: true,
    // Modo de prueba (?pregunta=…): no guarda nada; tickets y prueba no van a «Repasar errores»
    noSave: false,
    noMistakes: false,
    testIds: null,
    marathonScope: null,
    ticket: null,
    ticketNotes: [],
    dailyDay: null,
    nextLevel: null
  };

  let worldPickMode = "campaign";
  let selectedWorldForLevels = null;
  // Cómo llegó el foco al elemento actual: "pointer" (clic/toque) o "keyboard" (Tab)
  let navMode = "pointer";
  // Tiempo mínimo tras mostrar una pregunta (o un resultado) antes de aceptar clics: evita que el segundo
  // clic de un doble clic responda la pregunta nueva o pulse "Continuar" sin haber visto el resultado
  const ANSWER_CLICK_GUARD_MS = 350;
  // Tras "¡Tiempo agotado!" se ignoran Enter y los atajos un momento: el jugador quizá seguía escribiendo
  const TIMEOUT_KEY_GUARD_MS = 1000;
  const QUIT_MSG = "¿Volver al menú? Se perderá el progreso de esta partida.";
  // Partida en curso (de startRun a endGame o a salir): Atrás, recargar o cerrar la pestaña piden confirmar
  let inRun = false;

  function init() {
    bindEvents();
    refreshMenu();
    UI.showScreen("screen-menu");
    UI.updateMuteButton();
    // index.html avisa en pantalla si esto no llega a ejecutarse (navegador viejo o error en js/)
    window.techQuestReady = true;
    // index.html?pregunta=lx01,lx02 abre esas preguntas en el modo de prueba (para revisar preguntas nuevas)
    const ids = testIdsFromUrl();
    if (ids) beginTest(ids);
    registerServiceWorker();
  }

  /** Instalable y sin conexión solo cuando se sirve por http(s) (p. ej. GitHub Pages), no con doble clic. */
  function registerServiceWorker() {
    try {
      if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;
      const go = () => navigator.serviceWorker.register("sw.js").catch(() => {});
      if (document.readyState === "complete") go();
      else window.addEventListener("load", go);
    } catch (_) { /* sin service worker el juego funciona igual */ }
  }

  function bindEvents() {
    // Atrás (botón o gesto del móvil) durante una partida pregunta lo mismo que Salir. Todas las partidas
    // usan una sola entrada del historial, que la siguiente reutiliza, así no se acumulan
    try { history.scrollRestoration = "manual"; } catch (_) {}
    window.addEventListener("popstate", () => {
      // Fuera de partida, Atrás sale del juego de una vez, como siempre
      if (!inRun) {
        if (!onRunEntry()) history.back();
        return;
      }
      if (confirm(QUIT_MSG)) quitToMenu();
      else pushRunEntry();
    });
    window.addEventListener("beforeunload", (e) => {
      // En el modo de prueba no hay nada que perder: recargar tras editar una pregunta no pregunta nada
      if (!inRun || state.noSave) return;
      e.preventDefault();
      e.returnValue = "";
    });
    // Otra pestaña cambió el progreso (p. ej. lo reinició): el menú muestra los datos actuales
    window.addEventListener("storage", (e) => {
      if (e.key === null || String(e.key).startsWith("techQuest")) refreshMenu();
    });
    // «Cargar respaldo» (Stats) abre este selector de archivo
    const backupInput = document.getElementById("backup-file");
    if (backupInput) {
      backupInput.addEventListener("change", () => {
        const f = backupInput.files && backupInput.files[0];
        backupInput.value = "";
        loadBackupFile(f);
      });
    }

    // Los navegadores solo permiten iniciar audio tras un gesto del usuario (clic, toque o tecla)
    document.addEventListener("pointerdown", () => { navMode = "pointer"; TechAudio.unlock(); }, { passive: true });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") navMode = "keyboard";
      TechAudio.unlock();
    });

    document.body.addEventListener("click", (e) => {
      const t = e.target.closest("[data-action]");
      if (!t) return;
      const action = t.getAttribute("data-action");
      // El segundo clic/toque de un doble clic cae en el botón que ocupa ese lugar en la pantalla o pregunta
      // recién mostrada (Continuar, un nivel, Pista, Salir, Elegir mundo…): se ignora
      const sinceShown = Math.min(UI.sinceScreen(), performance.now() - state.shownAt);
      if (e.detail > 0 && action !== "mute" && sinceShown < ANSWER_CLICK_GUARD_MS) return;
      onAction(action, t, e);
    });

    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const playOn = document.getElementById("screen-play")?.classList.contains("active");
      const fbOn = document.getElementById("screen-feedback")?.classList.contains("active");
      if (e.repeat) {
        // Mantener Enter (o Espacio en el resultado) pulsado no debe activar de forma nativa "Continuar"
        // y saltarse el resultado
        if ((e.key === "Enter" && (playOn || fbOn)) || (e.key === " " && fbOn)) e.preventDefault();
        return;
      }
      const focusedBtn = e.target instanceof HTMLButtonElement ? e.target : null;
      // Al escribir en el campo de texto, las letras no son atajos (p. ej. "chmod" no debe usar pista ni silenciar)
      const typing = e.target instanceof HTMLElement && e.target.matches("input, textarea, [contenteditable]");
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (fbOn && state.feedbackTimedOut && performance.now() - state.feedbackAt < TIMEOUT_KEY_GUARD_MS &&
          (key === "Enter" || key === " " || key.length === 1)) {
        e.preventDefault();
        return;
      }

      if (key === "Escape" && (playOn || fbOn)) {
        e.preventDefault();
        confirmQuit();
        return;
      }

      if (key === "Enter") {
        if (playOn) {
          // Un botón elegido con Tab conserva su Enter nativo (▲/▼, ítems de emparejar, Pista, Sonido, Salir…).
          // Si el foco quedó en él por un clic (Pista, Sonido, Salir tras Cancelar, un ítem), Enter envía la
          // respuesta, como en la pantalla de resultado. Las opciones y V/F siempre conservan su Enter nativo:
          // un clic en ellas ya responde, y un lector de pantalla puede llevarles el foco sin Tab
          const pointerFocus = navMode === "pointer" && focusedBtn && !focusedBtn.matches(".option-btn");
          if (focusedBtn && focusedBtn.id !== "btn-submit" && !pointerFocus) return;
          e.preventDefault();
          // Un segundo Enter justo tras "Continuar" o un nivel no debe enviar el puzzle que acaba de aparecer
          // (en "completar" no hace falta: el campo vacío no se envía)
          const t = currentQ()?.type;
          if ((t === "order" || t === "match") && performance.now() - state.shownAt < ANSWER_CLICK_GUARD_MS) return;
          // En "completar" la pista devuelve el foco al campo: un Enter doble sobre Pista no debe enviar lo escrito
          if (t === "fill" && performance.now() - state.hintAt < ANSWER_CLICK_GUARD_MS) return;
          submitAnswer();
        } else if (fbOn) {
          // Otro botón elegido con Tab (p. ej. Sonido) conserva su Enter nativo
          if (focusedBtn && focusedBtn.id !== "btn-next-feedback" && navMode === "keyboard") return;
          // preventDefault evita que el botón enfocado reciba un segundo clic y salte una pregunta
          e.preventDefault();
          // Un segundo Enter justo tras responder no debe saltarse el resultado sin verlo
          if (performance.now() - state.feedbackAt < ANSWER_CLICK_GUARD_MS) return;
          TechAudio.playClick();
          advance();
        }
        return;
      }

      if (typing) return;

      if (playOn && !state.answered && /^[1-4]$/.test(key)) {
        const btn = document.querySelector(`#options .option-btn[data-index="${+key - 1}"]`);
        if (btn && !btn.disabled) btn.click();
      }

      if (key === "h" && playOn && state.hintsOn) {
        // La pista en «completar» lleva el foco al campo durante esta tecla: sin esto la "h" se escribiría ahí
        e.preventDefault();
        document.querySelector("#btn-hint:not([disabled])")?.click();
      }

      if (key === "m") onAction("mute");

      if (playOn && !state.answered) {
        if (key === "v") document.querySelector('.tf-btn[data-val="true"]')?.click();
        if (key === "f") document.querySelector('.tf-btn[data-val="false"]')?.click();
      }
    });
  }

  function onAction(action, el, ev) {
    switch (action) {
      case "mute":
        TechAudio.toggleMute();
        UI.updateMuteButton();
        TechAudio.playClick();
        // Con la tecla M el foco suele estar en otro control y el cambio del botón no se lee
        if (!el && document.activeElement !== UI.$("#btn-mute")) {
          UI.announce(TechAudio.isMuted() ? "Sonido desactivado" : "Sonido activado");
        }
        break;
      case "play":
        TechAudio.playClick();
        worldPickMode = "campaign";
        renderWorlds();
        UI.showScreen("screen-worlds");
        break;
      case "practice":
        TechAudio.playClick();
        worldPickMode = "practice";
        renderWorlds();
        UI.showScreen("screen-worlds");
        break;
      case "marathon":
        TechAudio.playClick();
        UI.setText("#marathon-mine-count", Math.min(GAME_CONFIG.marathonCount, myLevelPool().length) + " de " + myLevelPool().length + " preguntas");
        UI.setText("#marathon-all-count", GAME_CONFIG.marathonCount + " de " + allLevelQuestions().length + " preguntas");
        UI.showScreen("screen-marathon");
        break;
      case "marathon-mine":
      case "marathon-all":
        TechAudio.playClick();
        beginMarathon(action === "marathon-mine" ? "mine" : "all");
        break;
      case "continue": {
        TechAudio.playClick();
        const next = nextAdventureLevel();
        if (next) beginCampaign(next.worldId, next.level);
        break;
      }
      case "next-level":
        TechAudio.playClick();
        if (state.nextLevel) beginCampaign(state.nextLevel.worldId, state.nextLevel.level);
        break;
      case "resume":
        TechAudio.playClick();
        resumeRun();
        break;
      case "daily":
        TechAudio.playClick();
        beginDaily();
        break;
      case "tickets":
        TechAudio.playClick();
        renderTickets();
        UI.showScreen("screen-tickets");
        break;
      case "pick-ticket":
        TechAudio.playClick();
        beginTicket(el.getAttribute("data-ticket"));
        break;
      case "locked":
        // Tarjeta bloqueada: dice cómo se abre (sigue siendo enfocable para teclado y lector de pantalla)
        TechAudio.playClick();
        UI.toast("🔒 " + (el.getAttribute("data-why") || "Bloqueado"));
        break;
      case "backup-download":
        TechAudio.playClick();
        downloadBackup();
        break;
      case "backup-upload":
        TechAudio.playClick();
        UI.$("#backup-file")?.click();
        break;
      case "review":
        TechAudio.playClick();
        beginReview();
        break;
      case "reset-progress":
        TechAudio.playClick();
        if (confirm("¿Borrar todo tu progreso, logros, estadísticas y récord? Esto no se puede deshacer, salvo que antes descargues un respaldo (botón «Descargar respaldo»).")) {
          Progress.resetAll();
          clearRunSnapshot();
          renderStats();
          refreshMenu();
          UI.toast("Progreso reiniciado.");
        }
        break;
      case "timer":
        TechAudio.playClick();
        worldPickMode = "timer";
        renderWorlds();
        UI.showScreen("screen-worlds");
        break;
      case "boss":
        TechAudio.playClick();
        worldPickMode = "boss";
        renderWorlds();
        UI.showScreen("screen-worlds");
        break;
      case "howto":
        TechAudio.playClick();
        UI.showScreen("screen-howto");
        break;
      case "stats":
        TechAudio.playClick();
        renderStats();
        UI.showScreen("screen-stats");
        break;
      case "achievements":
        TechAudio.playClick();
        renderAchievements();
        UI.showScreen("screen-achievements");
        break;
      case "menu":
        TechAudio.playClick();
        if (inRun && !state.noSave) clearRunSnapshot();
        inRun = false;
        clearTimer();
        refreshMenu();
        UI.showScreen("screen-menu");
        break;
      case "pick-world": {
        TechAudio.playClick();
        const id = el.getAttribute("data-world");
        if (worldPickMode === "boss") {
          beginBoss(id);
        } else {
          selectedWorldForLevels = id;
          renderLevels(id);
          UI.showScreen("screen-levels");
        }
        break;
      }
      case "pick-level": {
        TechAudio.playClick();
        const id = el.getAttribute("data-world") || selectedWorldForLevels;
        const level = parseInt(el.getAttribute("data-level"), 10);
        if (worldPickMode === "practice") beginPractice(id, level);
        else if (worldPickMode === "timer") beginTimer(id, level);
        else beginCampaign(id, level);
        break;
      }
      case "pick-again": {
        // "Elegir mundo" en la pantalla final vuelve al selector del modo que se acaba de jugar
        TechAudio.playClick();
        if (state.mode === "ticket") {
          renderTickets();
          UI.showScreen("screen-tickets");
          break;
        }
        const again = { practice: "practice", timer: "timer", boss: "boss" };
        worldPickMode = again[state.mode] || "campaign";
        renderWorlds();
        UI.showScreen("screen-worlds");
        break;
      }
      case "back-worlds":
        TechAudio.playClick();
        renderWorlds();
        UI.showScreen("screen-worlds");
        break;
      case "hint":
        useHint();
        break;
      case "submit":
        submitAnswer();
        break;
      case "next":
        // Un segundo clic, toque o Espacio justo tras responder no debe saltarse el resultado sin verlo
        if (ev && performance.now() - state.feedbackAt < ANSWER_CLICK_GUARD_MS) break;
        TechAudio.playClick();
        advance();
        break;
      case "quit":
        TechAudio.playClick();
        confirmQuit();
        break;
      case "retry":
        TechAudio.playClick();
        retry();
        break;
      default:
        break;
    }
  }

  function confirmQuit() {
    if (confirm(QUIT_MSG)) quitToMenu();
  }

  function quitToMenu() {
    // La prueba de preguntas no guarda ni borra nada: si había una partida para reanudar, sigue ahí
    if (!state.noSave) clearRunSnapshot();
    inRun = false;
    clearTimer();
    refreshMenu();
    UI.showScreen("screen-menu");
  }

  function onRunEntry() {
    try { return !!(history.state && history.state.tq === "run"); } catch (_) { return false; }
  }

  function pushRunEntry() {
    // Una sola entrada para todas las partidas: si ya existe, la siguiente la reutiliza
    try { if (!onRunEntry()) history.pushState({ tq: "run" }, ""); } catch (_) { /* queda beforeunload */ }
  }

  function retry() {
    if (state.mode === "marathon") beginMarathon(state.marathonScope || "all");
    else if (state.mode === "review") beginReview();
    else if (state.mode === "daily") beginDaily();
    else if (state.mode === "test") beginTest(state.testIds || []);
    else if (state.mode === "ticket" && state.ticket) beginTicket(state.ticket.id);
    else if (state.mode === "boss") beginBoss(state.worldId);
    else if (state.mode === "timer") beginTimer(state.worldId, state.level);
    else if (state.practice) beginPractice(state.worldId, state.level);
    else if (state.worldId) beginCampaign(state.worldId, state.level);
    else {
      refreshMenu();
      UI.showScreen("screen-menu");
    }
  }

  function countQuestions() {
    return WORLDS.reduce((n, w) => n + w.questions.length + (w.boss ? w.boss.length : 0), 0);
  }

  function refreshMenu() {
    UI.setText("#menu-highscore", String(UI.getHighScore()));
    UI.setText("#menu-total-q", String(countQuestions()));
    UI.setText("#menu-worlds", String(WORLDS.length));
    UI.setText("#howto-worlds", String(WORLDS.length));
    // Repaso espaciado: el número es lo que toca hoy; lo demás espera a otro día (se puede adelantar)
    const review = reviewPool();
    UI.setText("#menu-review-count", String(review.due.length));
    UI.setText("#menu-review-wait", review.later.length ? " · " + review.later.length + " en espera" : "");
    const reviewBtn = UI.$("#btn-review");
    if (reviewBtn) reviewBtn.disabled = review.due.length + review.later.length === 0;

    // Reanudar (tras recargar en plena partida) y Continuar aventura (primer nivel que falta)
    const snap = loadRunSnapshot();
    const resumeBtn = UI.$("#btn-resume");
    if (resumeBtn) {
      resumeBtn.hidden = !snap;
      if (snap) UI.setText("#resume-label", snap.label + " · pregunta " + (Math.min(snap.next, snap.ids.length - 1) + 1) + " de " + snap.ids.length);
    }
    const next = nextAdventureLevel();
    const contBtn = UI.$("#btn-continue");
    if (contBtn) {
      contBtn.hidden = !next;
      // Con una partida por reanudar, esa es la acción principal
      contBtn.classList.toggle("btn-primary", !snap);
      if (next) {
        const w = getWorldById(next.worldId);
        UI.setText("#continue-label", w.icon + " " + w.name + " · Nivel " + next.level);
      }
    }

    // Reto del día y racha de días
    const daily = Progress.getDaily();
    UI.setText("#daily-label", daily && daily.done ? "✔ hecho" : "");
    const streak = Progress.getDayStreak();
    const streakPill = UI.$("#menu-streak-pill");
    if (streakPill) streakPill.hidden = streak.count === 0;
    UI.setText("#menu-streak", String(streak.count));
    UI.setText("#menu-streak-unit", streak.count === 1 ? "día seguido" : "días seguidos");
    const ticketsBtn = UI.$("#btn-tickets");
    if (ticketsBtn) ticketsBtn.hidden = TICKETS.length === 0;
    const unlocked = Progress.getAchievements();
    UI.setText("#menu-ach-count", Object.keys(unlocked).length + " / " + ACHIEVEMENTS.length);
    const wrap = UI.$("#menu-badges");
    if (wrap) {
      wrap.innerHTML = ACHIEVEMENTS.map((a) => {
        const on = !!unlocked[a.id];
        const name = UI.escapeHtml(a.name);
        // El brillo solo no basta: el lector de pantalla dice el nombre y si está desbloqueado
        return `<span class="mini-badge ${on ? "on" : ""}" role="img" aria-label="${name}: ${on ? "desbloqueado" : "bloqueado"}" title="${name}">${a.icon}</span>`;
      }).join("");
    }
  }

  function renderWorlds() {
    const title = UI.$("#worlds-title");
    const map = {
      campaign: "Aventura — elige mundo",
      practice: "Práctica (sin vidas)",
      timer: "Cronómetro — elige mundo",
      boss: "Desafío Boss 👹"
    };
    if (title) title.textContent = map[worldPickMode] || "Mundos";

    const maxL = Progress.levelsPerWorld();
    UI.$("#world-grid").innerHTML = WORLDS.map((w, i) => {
      if (worldPickMode === "boss" && !(w.boss && w.boss.length)) return "";
      // Práctica y Cronómetro abren todo; Aventura y Boss requieren el mundo desbloqueado
      const needsUnlock = worldPickMode === "campaign" || worldPickMode === "boss";
      const open = !needsUnlock || Progress.isUnlocked(w.id) || i === 0;
      const pct = Progress.worldProgressPct(w.id);
      const boss = Progress.getBossWins()[w.id];
      // Bloqueado: la tarjeta sigue enfocable y dice qué falta para abrirla
      const why = open ? "" : "Se abre al completar el Nivel " + maxL + " de " + (WORLDS[i - 1] ? WORLDS[i - 1].name : "el mundo anterior") + " en Aventura";
      return `<button type="button" class="world-card ${open ? "" : "locked"}"
        style="--accent:${w.color}"
        ${open ? `data-action="pick-world" data-world="${w.id}"` : `data-action="locked" aria-disabled="true" data-why="${UI.escapeHtml(why)}"`}>
        <span class="world-num">Mundo ${i + 1}${boss ? " 👑" : ""}</span>
        <span class="world-icon">${w.icon}</span>
        <span class="world-name">${UI.escapeHtml(w.name)}</span>
        <span class="world-desc">${UI.escapeHtml(w.description)}</span>
        ${open ? "" : `<span class="lock-why">🔒 ${UI.escapeHtml(why)}</span>`}
        <span class="world-progress"><span aria-hidden="true">★</span> ${Progress.countStars(w.id)}/${maxL * 3}<span class="sr-only"> estrellas</span> · ${pct}%</span>
        <span class="world-count">${w.questions.length} retos · ${maxL} niveles${w.boss && w.boss.length ? " · boss" : ""}</span>
      </button>`;
    }).join("");
  }

  function renderLevels(worldId) {
    const w = getWorldById(worldId);
    if (!w) return;
    const title = UI.$("#levels-title");
    const sub = UI.$("#levels-world-sub");
    if (title) title.textContent = "Niveles — " + w.icon + " " + w.name;
    if (sub) {
      const modeLabel = { campaign: "Aventura", practice: "Práctica", timer: "Cronómetro" }[worldPickMode] || "";
      sub.textContent = modeLabel + " · Progreso del mundo: " + Progress.worldProgressPct(worldId) + "%";
    }
    const maxL = (Progress.levelsPerWorld && Progress.levelsPerWorld()) || GAME_CONFIG.levelsPerWorld || 5;
    const labels = LEVEL_LABELS;
    const counts = countLevelsForWorld(worldId);
    UI.$("#level-grid").innerHTML = Array.from({ length: maxL }, (_, i) => i + 1)
      .map((L) => {
        const open = worldPickMode === "practice" || worldPickMode === "timer" || Progress.isLevelUnlocked(worldId, L);
        const cleared = Progress.isLevelCleared(worldId, L);
        // Cronómetro juega como mucho timerMaxQuestions del nivel
        const n = worldPickMode === "timer" ? Math.min(GAME_CONFIG.timerMaxQuestions, counts[L] || 0) : counts[L] || 0;
        const why = open ? "" : "Se abre al completar el Nivel " + (L - 1);
        return `<button type="button" class="level-card ${open ? "" : "locked"} ${cleared ? "cleared" : ""}"
          style="--accent:${w.color}"
          ${open ? `data-action="pick-level" data-world="${worldId}" data-level="${L}"` : `data-action="locked" aria-disabled="true" data-why="${UI.escapeHtml(why)}"`}>
          <span class="level-icon">${(labels[L] && labels[L].icon) || ("🔢")}</span>
          <span class="level-name">Nivel ${L}: ${(labels[L] && labels[L].name) || ("Nv." + L)}</span>
          <span class="level-count">${n} desafíos</span>
          <span class="level-state">${cleared ? "Completado " + UI.stars(Progress.getLevelStars(worldId, L)) : open ? "Disponible" : "🔒 " + why}</span>
        </button>`;
      })
      .join("");
  }

  function startRun(opts) {
    clearTimer();
    inRun = true;
    pushRunEntry();
    state.mode = opts.mode;
    // practice = sin vidas (Práctica, Repaso, Reto del día, Tickets y prueba)
    state.practice = !!opts.practice;
    state.timed = !!opts.timed;
    state.worldId = opts.worldId || null;
    state.level = opts.level != null ? opts.level : null;
    state.noSave = !!opts.noSave;
    state.noMistakes = !!opts.noMistakes || !!opts.noSave;
    state.testIds = opts.testIds || null;
    state.marathonScope = opts.marathonScope || null;
    state.ticket = opts.ticket || null;
    state.ticketNotes = [];
    state.dailyDay = opts.dailyDay || null;
    state.nextLevel = null;
    // Un hueco en una lista de preguntas (",," en los datos) no debe colgar la partida
    const questions = opts.questions.filter((q) => q && typeof q === "object");
    state.questions = questions.map(prepareQuestion);
    state.qIndex = 0;
    state.lives = opts.practice ? 99 : GAME_CONFIG.maxLives;
    state.score = 0;
    state.streak = 0;
    state.bestStreakRun = 0;
    state.hintsLeft = opts.hints != null ? opts.hints : opts.practice ? 0 : opts.mode === "boss" ? 1 : GAME_CONFIG.hintsPerWorld;
    state.hintsOn = state.hintsLeft > 0;
    state.hintsUsedRun = 0;
    state.totalQ = questions.length;
    state.answered = false;
    state.correctCount = 0;
    state.wrongCount = 0;
    state.pendingAchievements = [];
    state.runAchievements = [];
    state.missed = [];
    // Si el progreso se reinicia en otra pestaña durante la partida, esta deja de guardar
    state.saveId = Progress.saveId();
    // Las partidas sin vidas (no se pueden perder) no cuentan como partidas en Stats; la prueba no guarda nada
    if (!state.noSave) {
      if (state.practice) Progress.recordPracticeRun();
      else Progress.recordGameStart();
    }
    saveRunSnapshot();
    UI.showScreen("screen-play");
    showQuestion();
  }

  const CHOICE_TYPES = ["mc", "identify", "scenario"];

  // Sin pista donde la pista dejaría una sola respuesta posible: V/F, y opción múltiple, emparejar u ordenar con solo 2
  function hintGivesAway(q) {
    return q.type === "tf" ||
      (CHOICE_TYPES.includes(q.type) && q.options.length < 3) ||
      (q.type === "match" && q.pairs.length < 3) ||
      (q.type === "order" && q.items.length < 3);
  }

  /** Copia la pregunta y baraja sus opciones para que la correcta no quede siempre en la misma posición. */
  function prepareQuestion(q) {
    if (!CHOICE_TYPES.includes(q.type) || !Array.isArray(q.options)) return q;
    const order = UI.shuffle(q.options.map((_, i) => i));
    return Object.assign({}, q, {
      options: order.map((i) => q.options[i]),
      answer: order.indexOf(q.answer)
    });
  }

  function questionsFor(worldId, level) {
    return UI.shuffle(getQuestionsForLevel(worldId, level));
  }

  function beginCampaign(worldId, level) {
    level = level || 1;
    if (!Progress.isUnlocked(worldId)) {
      UI.toast("Mundo bloqueado. Completa el anterior.");
      return;
    }
    if (!Progress.isLevelUnlocked(worldId, level)) {
      UI.toast("Nivel bloqueado. Completa el anterior.");
      return;
    }
    const qs = questionsFor(worldId, level);
    if (!qs.length) {
      UI.toast("Este nivel aún no tiene desafíos.");
      return;
    }
    startRun({ mode: "campaign", worldId, level, questions: qs });
  }

  function beginPractice(worldId, level) {
    level = level || 1;
    const qs = questionsFor(worldId, level);
    if (!qs.length) {
      UI.toast("Este nivel aún no tiene desafíos.");
      return;
    }
    startRun({ mode: "practice", practice: true, worldId, level, questions: qs });
  }

  function beginTimer(worldId, level) {
    level = level || 1;
    let qs = questionsFor(worldId, level);
    if (!qs.length) {
      UI.toast("Este nivel aún no tiene desafíos.");
      return;
    }
    qs = qs.slice(0, GAME_CONFIG.timerMaxQuestions);
    startRun({ mode: "timer", timed: true, worldId, level, questions: qs });
  }

  /** Todas las preguntas de nivel (sin las del Boss). */
  function allLevelQuestions() {
    const pool = [];
    WORLDS.forEach((w) => w.questions.forEach((q) => pool.push(q)));
    return pool;
  }

  /** Preguntas de los mundos y niveles que el jugador ya abrió en Aventura («Mi nivel»). */
  function myLevelPool() {
    const pool = [];
    WORLDS.forEach((w, i) => {
      if (!(Progress.isUnlocked(w.id) || i === 0)) return;
      w.questions.forEach((q) => { if (Progress.isLevelUnlocked(w.id, q.level)) pool.push(q); });
    });
    return pool;
  }

  function beginMarathon(scope) {
    const pool = scope === "mine" ? myLevelPool() : allLevelQuestions();
    const qs = UI.shuffle(pool).slice(0, GAME_CONFIG.marathonCount);
    if (!qs.length) {
      UI.toast("Aún no hay preguntas para esta maratón.");
      return;
    }
    startRun({ mode: "marathon", worldId: null, marathonScope: scope, questions: qs });
  }

  /** Primer nivel de Aventura que falta (en orden de mundos), o null si ya están todos. */
  function nextAdventureLevel() {
    const maxL = Progress.levelsPerWorld();
    for (let i = 0; i < WORLDS.length; i++) {
      const w = WORLDS[i];
      if (!(Progress.isUnlocked(w.id) || i === 0)) continue;
      for (let L = 1; L <= maxL; L++) {
        if (!Progress.isLevelCleared(w.id, L) && Progress.isLevelUnlocked(w.id, L) && getQuestionsForLevel(w.id, L).length) {
          return { worldId: w.id, level: L };
        }
      }
    }
    return null;
  }

  /** Todas las preguntas del juego (niveles y Boss) por id. */
  function questionIndex() {
    const out = Object.create(null);
    WORLDS.forEach((w) => w.questions.concat(w.boss || []).forEach((q) => { if (q.id && !out[q.id]) out[q.id] = q; }));
    return out;
  }

  /** Errores por repasar (incluidas las de Boss): due = los que tocan hoy, later = los que esperan a otro día. */
  function reviewPool() {
    const pending = Progress.getMistakes();
    const day = Progress.today();
    const due = [];
    const later = [];
    WORLDS.forEach((w) => {
      w.questions.concat(w.boss || []).forEach((q) => {
        if (!q.id || !Object.prototype.hasOwnProperty.call(pending, q.id)) return;
        (Progress.isMistakeDue(pending[q.id], day) ? due : later).push(q);
      });
    });
    return { due, later };
  }

  function pendingMistakeQuestions() {
    const r = reviewPool();
    return r.due.concat(r.later);
  }

  function beginReview() {
    const r = reviewPool();
    if (!r.due.length && !r.later.length) {
      UI.toast("No tienes errores pendientes. ¡Bien hecho!");
      refreshMenu();
      return;
    }
    // Primero las que tocan hoy; si sobra sitio, se adelantan las que esperan (un acierto hoy solo cuenta una vez)
    const qs = UI.shuffle(r.due).concat(UI.shuffle(r.later)).slice(0, GAME_CONFIG.reviewMaxQuestions || GAME_CONFIG.marathonCount);
    startRun({ mode: "review", practice: true, questions: qs });
  }

  /** Generador pseudoaleatorio con semilla (el mismo día da el mismo reto). */
  function seededRandom(seed) {
    let h = 1779033703 ^ seed.length;
    for (let i = 0; i < seed.length; i++) {
      h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return (h >>> 0) / 4294967296;
    };
  }
  function seededShuffle(arr, rand) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /** Las preguntas del reto de hoy: las mismas todo el día (se guardan al generarlas la primera vez). */
  function dailyQuestions() {
    const byId = questionIndex();
    const saved = Progress.getDaily();
    if (saved) {
      const qs = saved.ids.map((id) => byId[id]).filter(Boolean);
      if (qs.length) return { day: saved.day, qs };
    }
    const day = Progress.today();
    const rand = seededRandom("tq-" + day);
    const n = GAME_CONFIG.dailyCount || 10;
    const fromMistakes = seededShuffle(pendingMistakeQuestions(), rand).slice(0, Math.min(GAME_CONFIG.dailyMistakes || 0, n));
    const taken = new Set(fromMistakes.map((q) => q.id));
    const rest = seededShuffle(myLevelPool().filter((q) => !taken.has(q.id)), rand).slice(0, n - fromMistakes.length);
    const qs = seededShuffle(fromMistakes.concat(rest), rand);
    Progress.saveDaily({ day, ids: qs.map((q) => q.id), done: false, correct: 0, total: qs.length });
    return { day, qs };
  }

  function beginDaily() {
    const d = dailyQuestions();
    if (!d.qs.length) {
      UI.toast("Aún no hay preguntas para el reto de hoy.");
      return;
    }
    startRun({ mode: "daily", practice: true, dailyDay: d.day, questions: d.qs });
  }

  // ——— Simulador de tickets ———
  const TICKET_LEVELS = { 1: "Fácil", 2: "Medio", 3: "Difícil" };

  function renderTickets() {
    const grid = UI.$("#ticket-grid");
    if (!grid) return;
    grid.innerHTML = TICKETS.map((t) => {
      const w = getWorldById(t.world);
      const best = Progress.getTicketBest(t.id);
      const n = t.steps.length;
      const stateTxt = best >= n ? "✔ Resuelto sin fallos"
        : best > 0 || Progress.hasTicketResult(t.id) ? "Mejor: " + best + "/" + n + " pasos bien" : "Sin intentar";
      return `<button type="button" class="level-card ticket-card ${best >= n ? "cleared" : ""}" style="--accent:${w ? w.color : "#ff7755"}"
        data-action="pick-ticket" data-ticket="${UI.escapeHtml(t.id)}">
        <span class="level-icon">${UI.escapeHtml(t.icon || "🎫")}</span>
        <span class="level-name">${UI.escapeHtml(t.title)}</span>
        <span class="level-count">${TICKET_LEVELS[t.level] || "Medio"} · ${n} pasos${w ? " · " + UI.escapeHtml(w.name) : ""}</span>
        <span class="level-state">${stateTxt}</span>
      </button>`;
    }).join("");
  }

  function beginTicket(id) {
    const t = TICKETS.find((x) => x.id === id);
    if (!t) return;
    // Los pasos van en orden (cada uno se apoya en lo que reveló el anterior); solo se barajan sus opciones
    startRun({ mode: "ticket", practice: true, noMistakes: true, ticket: t, worldId: null, questions: t.steps.slice() });
  }

  // ——— Modo de prueba: index.html?pregunta=lx01,lx02 (o lxL5* para todas las que empiezan así) ———
  function testIdsFromUrl() {
    let raw = null;
    try {
      const params = new URLSearchParams(location.search);
      raw = params.get("pregunta") || params.get("preguntas");
    } catch (_) { return null; }
    if (!raw) return null;
    const ids = raw.split(",").map((s) => s.trim()).filter(Boolean);
    return ids.length ? ids : null;
  }

  function beginTest(ids) {
    const all = [];
    WORLDS.forEach((w) => w.questions.concat(w.boss || []).forEach((q) => all.push(q)));
    TICKETS.forEach((t) => t.steps.forEach((q) => all.push(q)));
    const found = [];
    const missing = [];
    ids.forEach((id) => {
      const matches = id.endsWith("*") ? all.filter((q) => String(q.id).startsWith(id.slice(0, -1))) : all.filter((q) => q.id === id);
      if (matches.length) matches.forEach((q) => { if (!found.includes(q)) found.push(q); });
      else missing.push(id);
    });
    if (found.length) {
      // Sin vidas ni reloj, con una pista por pregunta para probarla también; no guarda nada
      startRun({ mode: "test", practice: true, noSave: true, hints: found.length, testIds: ids, questions: found });
    }
    if (missing.length) UI.toast("Modo de prueba: no encontré " + missing.join(", "));
    else if (!found.length) UI.toast("Modo de prueba: no encontré ninguna pregunta");
  }

  // ——— Reanudar la partida tras recargar la página (copia en sessionStorage: solo esta pestaña) ———
  const RUN_KEY = "techQuestRun";

  function saveRunSnapshot() {
    if (!inRun || state.mode === "test") return;
    const snap = {
      v: 1,
      mode: state.mode, practice: state.practice, timed: state.timed, worldId: state.worldId, level: state.level,
      ids: state.questions.map((q) => q.id),
      // La siguiente pregunta por responder
      next: state.answered ? state.qIndex + 1 : state.qIndex,
      lives: state.lives, score: state.score, streak: state.streak, bestStreakRun: state.bestStreakRun,
      hintsLeft: state.hintsLeft, hintsOn: state.hintsOn, hintsUsedRun: state.hintsUsedRun,
      correctCount: state.correctCount, wrongCount: state.wrongCount,
      runAchievements: state.runAchievements, missed: state.missed, saveId: state.saveId,
      noMistakes: state.noMistakes, marathonScope: state.marathonScope, dailyDay: state.dailyDay,
      ticketId: state.ticket ? state.ticket.id : null, ticketNotes: state.ticketNotes,
      label: UI.modeLabel(hud())
    };
    try { sessionStorage.setItem(RUN_KEY, JSON.stringify(snap)); } catch (_) { /* sin reanudar */ }
  }

  function clearRunSnapshot() {
    try { sessionStorage.removeItem(RUN_KEY); } catch (_) {}
  }

  /** La partida guardada en esta pestaña con sus preguntas, o null si no hay (o ya no cuadra con los datos). */
  function loadRunSnapshot() {
    let snap;
    try { snap = JSON.parse(sessionStorage.getItem(RUN_KEY)); } catch (_) { return null; }
    if (!snap || snap.v !== 1 || !Array.isArray(snap.ids) || !snap.ids.length || typeof snap.next !== "number") return null;
    // Empezada antes de reiniciar el progreso o cargar un respaldo: ya no guardaría nada, así que no se ofrece
    if ((snap.saveId || "") !== Progress.saveId()) return null;
    let pool;
    if (snap.mode === "ticket") {
      const t = TICKETS.find((x) => x.id === snap.ticketId);
      if (!t) return null;
      pool = Object.create(null);
      t.steps.forEach((q) => { pool[q.id] = q; });
      snap.ticket = t;
    } else pool = questionIndex();
    const qs = snap.ids.map((id) => pool[id]);
    if (qs.some((q) => !q)) return null;
    snap.questions = qs;
    return snap;
  }

  function resumeRun() {
    const snap = loadRunSnapshot();
    if (!snap) {
      refreshMenu();
      return;
    }
    clearTimer();
    inRun = true;
    pushRunEntry();
    Object.assign(state, {
      mode: snap.mode, practice: !!snap.practice, timed: !!snap.timed, worldId: snap.worldId || null,
      level: snap.level != null ? snap.level : null,
      questions: snap.questions.map(prepareQuestion), qIndex: snap.next, totalQ: snap.questions.length,
      lives: snap.lives, score: snap.score, streak: snap.streak, bestStreakRun: snap.bestStreakRun,
      hintsLeft: snap.hintsLeft, hintsOn: !!snap.hintsOn, hintsUsedRun: snap.hintsUsedRun,
      correctCount: snap.correctCount, wrongCount: snap.wrongCount,
      runAchievements: Array.isArray(snap.runAchievements) ? snap.runAchievements : [],
      missed: Array.isArray(snap.missed) ? snap.missed : [], pendingAchievements: [],
      saveId: snap.saveId, noSave: false, noMistakes: !!snap.noMistakes, testIds: null,
      marathonScope: snap.marathonScope || null, dailyDay: snap.dailyDay || null,
      ticket: snap.ticket || null, ticketNotes: Array.isArray(snap.ticketNotes) ? snap.ticketNotes : [],
      ticketResumed: !!snap.ticket, nextLevel: null, answered: false
    });
    // Recargó en el resultado de la última pregunta (o sin vidas): la partida termina como habría terminado
    if (!state.practice && state.lives <= 0) {
      state.answered = true;
      endGame(false);
    } else if (state.qIndex >= state.totalQ) {
      state.answered = true;
      endGame(true);
    } else {
      UI.showScreen("screen-play");
      showQuestion();
    }
  }

  // ——— Respaldo del progreso (.json) ———
  function downloadBackup() {
    try {
      const data = Progress.exportBackup();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "tech-quest-respaldo-" + Progress.today() + ".json";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
      UI.toast("Respaldo descargado: " + a.download);
    } catch (_) {
      UI.toast("No se pudo descargar el respaldo en este navegador.");
    }
  }

  function loadBackupFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      let obj = null;
      try { obj = JSON.parse(String(reader.result)); } catch (_) {}
      const datos = Progress.checkBackup(obj);
      if (!datos) {
        UI.toast("Ese archivo no es un respaldo de Tech Quest.");
        return;
      }
      const when = obj.fecha && !isNaN(Date.parse(obj.fecha)) ? new Date(obj.fecha).toLocaleString("es-MX") : "fecha desconocida";
      if (!confirm("¿Cargar el respaldo del " + when + "? Reemplaza todo el progreso de este navegador.")) return;
      const n = Progress.importBackup(obj);
      clearRunSnapshot();
      renderStats();
      refreshMenu();
      UI.toast(n > 0 ? "Respaldo cargado." : "El respaldo estaba vacío: progreso en cero.");
    };
    reader.onerror = () => UI.toast("No se pudo leer el archivo.");
    reader.readAsText(file);
  }

  function beginBoss(worldId) {
    const w = getWorldById(worldId);
    if (!w || !w.boss) return;
    if (!Progress.isUnlocked(worldId)) {
      UI.toast("Mundo bloqueado. Desbloquéalo en Aventura.");
      return;
    }
    startRun({ mode: "boss", timed: true, worldId, questions: w.boss.slice() });
  }

  function currentQ() { return state.questions[state.qIndex]; }

  function clearTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function hud() {
    return {
      mode: state.mode,
      practice: state.practice,
      hintsOn: state.hintsOn,
      marathonScope: state.marathonScope,
      ticketTitle: state.ticket ? state.ticket.title : "",
      timed: state.timed,
      worldId: state.worldId,
      level: state.level,
      lives: state.lives,
      score: state.score,
      streak: state.streak,
      hintsLeft: state.hintsLeft,
      qIndex: state.qIndex,
      totalQ: state.totalQ,
      timeLeft: state.timeLeft
    };
  }

  function armTimer() {
    clearTimer();
    if (!state.timed) {
      state.timeLeft = 0;
      UI.updateHUD(hud());
      return;
    }
    state.timeLeft =
      state.mode === "boss" ? GAME_CONFIG.bossTimerSeconds : GAME_CONFIG.timerSeconds;
    UI.updateHUD(hud());
    state.timerId = setInterval(() => {
      // Pausa el reloj si la pestaña está oculta, para no perder por cambiar de ventana
      if (state.answered || document.hidden) return;
      state.timeLeft--;
      if (state.timeLeft > 0 && state.timeLeft <= 5) {
        if (state.timeLeft <= 3) TechAudio.playUrgentTick();
        else TechAudio.playTick();
      }
      UI.updateHUD(hud());
      if (state.timeLeft <= 0) {
        clearTimer();
        if (!state.answered) finishRound(false, timeoutResult(currentQ()), true);
      }
    }, 1000);
  }

  function showQuestion() {
    state.answered = false;
    state.hintUsedThisQ = false;
    state.hintCost = 0;
    state.matchSelections = {};
    state.matchPending = null;
    state.shownAt = performance.now();

    const q = currentQ();
    UI.updateHUD(hud());

    const hintBox = UI.$("#hint-box");
    if (hintBox) {
      hintBox.hidden = true;
      hintBox.textContent = "";
    }

    // En la prueba se ve el id (para encontrarla en js/mundos/); en un ticket, en qué paso vas
    UI.setText("#question-type",
      (state.ticket ? "Paso " + (state.qIndex + 1) + " de " + state.totalQ + " · " : "") +
      typeLabel(q.type) + (state.mode === "test" ? " · " + q.id : ""));
    UI.setText("#question-text", q.q);
    // Al empezar un ticket (o al reanudarlo), el lector de pantalla oye también el caso y lo anotado, no solo
    // la pregunta. En los demás pasos no se repite: cada nota nueva ya se anuncia en el resultado
    const qText = UI.$("#question-text");
    if (qText) {
      if (state.ticket && (state.qIndex === 0 || state.ticketResumed)) qText.setAttribute("aria-describedby", "ticket-head ticket-text ticket-notes");
      else qText.removeAttribute("aria-describedby");
    }
    state.ticketResumed = false;
    const ticketBox = UI.$("#ticket-box");
    if (ticketBox) {
      ticketBox.hidden = !state.ticket;
      if (state.ticket) {
        UI.setText("#ticket-head", "🎫 Ticket: " + state.ticket.title);
        UI.setText("#ticket-text", state.ticket.ticket || "");
        const notes = UI.$("#ticket-notes");
        notes.hidden = !state.ticketNotes.length;
        notes.innerHTML = state.ticketNotes.map((n) => `<li>📝 ${UI.escapeHtml(n)}</li>`).join("");
      }
    }

    const area = UI.$("#challenge-area");
    area.innerHTML = "";
    area.className = "challenge-area type-" + q.type;

    const submitBtn = UI.$("#btn-submit");
    const hintBtn = UI.$("#btn-hint");
    if (hintBtn) {
      hintBtn.hidden = !state.hintsOn;
      // En Verdadero/Falso (o con solo 2 opciones) no hay pista útil que no regale la respuesta
      const noHint = hintGivesAway(q);
      hintBtn.disabled = state.hintsLeft <= 0 || noHint;
      hintBtn.removeAttribute("aria-disabled");
      hintBtn.title = q.type === "tf" ? "Sin pista en Verdadero / Falso" : noHint ? "Sin pista: solo hay 2 opciones" : "";
    }
    if (submitBtn) submitBtn.disabled = false;

    if (CHOICE_TYPES.includes(q.type)) {
      submitBtn.hidden = true;
      renderChoices(area, q.options);
    } else if (q.type === "tf") {
      submitBtn.hidden = true;
      renderTF(area);
    } else if (q.type === "fill") {
      submitBtn.hidden = false;
      area.innerHTML = `
        <label class="fill-label" for="fill-input">Tu respuesta:</label>
        <input id="fill-input" class="fill-input" type="text" autocomplete="off" spellcheck="false"
          placeholder="Escribe aquí…" aria-describedby="question-text" />
        <p class="fill-tip">Mayúsculas flexibles · Enter para enviar</p>`;
      // Enter se maneja en el listener global de teclado
      const input = UI.$("#fill-input");
      setTimeout(() => input && input.focus(), 40);
    } else if (q.type === "match") {
      submitBtn.hidden = false;
      renderMatch(area, q);
    } else if (q.type === "order") {
      submitBtn.hidden = false;
      renderOrder(area, q);
    }
    // El foco va a la pregunta nueva (el campo de texto lo toma en "completar"), no se pierde en <body>
    if (q.type !== "fill") UI.$("#question-text")?.focus({ preventScroll: true });
    // En un ticket lo anotado crece en cada paso: si en una pantalla baja deja las respuestas fuera de la
    // vista, la pregunta sube arriba (el caso sigue encima, a un desplazamiento)
    if (state.ticket && state.qIndex > 0) {
      const first = area.firstElementChild;
      if (first && first.getBoundingClientRect().bottom > window.innerHeight) UI.$(".question-meta")?.scrollIntoView({ block: "start" });
    }

    armTimer();
  }

  function typeLabel(t) {
    return ({
      mc: "Opción múltiple",
      identify: "Identificar herramienta",
      fill: "Completar comando",
      match: "Emparejar",
      order: "Ordenar pasos",
      tf: "Verdadero / Falso",
      scenario: "Escenario"
    })[t] || t;
  }

  /** true si el clic llega demasiado pronto tras mostrar la pregunta (segundo clic de un doble clic). */
  function tooSoon(ev) {
    return ev.detail > 0 && performance.now() - state.shownAt < ANSWER_CLICK_GUARD_MS;
  }

  function renderChoices(area, options) {
    const wrap = document.createElement("div");
    wrap.id = "options";
    wrap.className = "options";
    options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.dataset.index = String(i);
      btn.innerHTML = `<span class="opt-key">${i + 1}</span><span class="opt-text">${UI.escapeHtml(opt)}</span>`;
      btn.addEventListener("click", (ev) => {
        if (state.answered || tooSoon(ev)) return;
        gradeChoice(i);
      });
      wrap.appendChild(btn);
    });
    area.appendChild(wrap);
  }

  function renderTF(area) {
    const wrap = document.createElement("div");
    wrap.id = "options";
    wrap.className = "options tf-row";
    [["true", "Verdadero", "V"], ["false", "Falso", "F"]].forEach(([val, label, key]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn tf-btn";
      btn.dataset.val = val;
      btn.innerHTML = `<span class="opt-key">${key}</span><span class="opt-text">${label}</span>`;
      btn.addEventListener("click", (ev) => {
        if (state.answered || tooSoon(ev)) return;
        gradeTF(val === "true");
      });
      wrap.appendChild(btn);
    });
    area.appendChild(wrap);
  }

  /** Baraja sin devolver el orden original (si hay más de un elemento), para no mostrar el puzzle ya resuelto. */
  function shuffleUnsolved(arr, isSolved) {
    let out = UI.shuffle(arr);
    for (let t = 0; t < 20 && arr.length > 1 && isSolved(out); t++) out = UI.shuffle(arr);
    return out;
  }

  function renderMatch(area, q) {
    const lefts = q.pairs.map((p, i) => ({ text: p.left, i }));
    // Si cada pareja quedara justo enfrente de su concepto, el ejercicio saldría resuelto
    const rights = shuffleUnsolved(q.pairs.map((p, i) => ({ text: p.right, i })), (a) => a.every((r, k) => r.i === k));
    area.innerHTML = `
      <p class="match-help">Toca un concepto y luego su pareja (o al revés).</p>
      <div class="match-board">
        <div class="match-col" role="group" aria-labelledby="match-col-left">
          <p class="match-col-title" id="match-col-left">Concepto</p>${lefts.map((l) =>
          `<button type="button" class="match-item" data-side="left" data-i="${l.i}" aria-pressed="false">${UI.escapeHtml(l.text)}</button>`
        ).join("")}</div>
        <div class="match-col" role="group" aria-labelledby="match-col-right">
          <p class="match-col-title" id="match-col-right">Pareja</p>${rights.map((r) =>
          `<button type="button" class="match-item" data-side="right" data-i="${r.i}" aria-pressed="false">${UI.escapeHtml(r.text)}</button>`
        ).join("")}</div>
      </div>
      <div class="match-links" id="match-links"></div>`;
    area.querySelectorAll(".match-item").forEach((btn) => {
      btn.addEventListener("click", (ev) => {
        if (state.answered || tooSoon(ev)) return;
        TechAudio.playClick();
        const side = btn.dataset.side;
        const i = +btn.dataset.i;
        const pend = state.matchPending;
        if (pend && pend.side !== side) {
          // Se puede empezar por cualquiera de las dos columnas
          const l = side === "left" ? i : pend.i;
          const r = side === "right" ? i : pend.i;
          Object.keys(state.matchSelections).forEach((k) => {
            if (state.matchSelections[k] === r || +k === l) delete state.matchSelections[k];
          });
          state.matchSelections[l] = r;
          state.matchPending = null;
          UI.announce("Emparejado: " + q.pairs[l].left + " con " + q.pairs[r].right, true);
        } else if (pend && pend.i === i) {
          // Volver a tocar el ítem pendiente lo suelta
          state.matchPending = null;
        } else {
          state.matchPending = { side, i };
        }
        paintMatch();
      });
    });
  }

  function paintMatch() {
    const q = currentQ();
    const links = UI.$("#match-links");
    links.innerHTML = Object.entries(state.matchSelections)
      .map(([l, r]) =>
        `<span class="match-chip">${UI.escapeHtml(q.pairs[+l].left)} ↔ ${UI.escapeHtml(q.pairs[r].right)}</span>`
      )
      .join("");
    const pend = state.matchPending;
    UI.$all(".match-item").forEach((btn) => {
      const side = btn.dataset.side;
      const i = +btn.dataset.i;
      let partner = null;
      if (side === "left") {
        if (state.matchSelections[i] != null) partner = q.pairs[state.matchSelections[i]].right;
      } else {
        const l = Object.keys(state.matchSelections).find((k) => state.matchSelections[k] === i);
        if (l != null) partner = q.pairs[+l].left;
      }
      const selected = !!pend && pend.side === side && pend.i === i;
      btn.classList.toggle("paired", partner != null);
      btn.classList.toggle("selected", selected);
      btn.setAttribute("aria-pressed", selected ? "true" : "false");
      // El lector de pantalla también dice con qué quedó emparejado (el color solo no basta)
      if (partner != null) btn.setAttribute("aria-label", btn.textContent + ", emparejado con " + partner);
      else btn.removeAttribute("aria-label");
    });
  }

  function renderOrder(area, q) {
    state.orderItems = shuffleUnsolved(
      q.items.map((text, orig) => ({ text, orig })),
      (a) => a.every((x, i) => x.orig === q.answer[i])
    );
    const list = document.createElement("ul");
    list.className = "order-list";
    list.id = "order-list";

    function paint() {
      list.innerHTML = "";
      state.orderItems.forEach((item, idx) => {
        const li = document.createElement("li");
        li.className = "order-item";
        li.innerHTML = `
          <span class="order-num">${idx + 1}</span>
          <span class="order-text">${UI.escapeHtml(item.text)}</span>
          <span class="order-controls">
            <button type="button" class="icon-btn" data-dir="-1" data-idx="${idx}" aria-label="Subir: ${UI.escapeHtml(item.text)}" ${idx === 0 ? 'aria-disabled="true"' : ""}>▲</button>
            <button type="button" class="icon-btn" data-dir="1" data-idx="${idx}" aria-label="Bajar: ${UI.escapeHtml(item.text)}" ${idx === state.orderItems.length - 1 ? 'aria-disabled="true"' : ""}>▼</button>
          </span>`;
        list.appendChild(li);
      });
      list.querySelectorAll("[data-dir]").forEach((btn) => {
        btn.addEventListener("click", (ev) => {
          if (state.answered || tooSoon(ev)) return;
          TechAudio.playClick();
          const dir = +btn.dataset.dir;
          const idx = +btn.dataset.idx;
          const j = idx + dir;
          // Las flechas de los extremos no se desactivan de verdad (el foco se perdería): solo no hacen nada
          if (j < 0 || j >= state.orderItems.length) return;
          const tmp = state.orderItems[idx];
          state.orderItems[idx] = state.orderItems[j];
          state.orderItems[j] = tmp;
          paint();
          // paint() reconstruye los botones: el foco vuelve a la misma flecha del ítem movido, así con teclado
          // se puede seguir pulsando en la misma dirección
          list.querySelector(`[data-dir="${dir}"][data-idx="${j}"]`)?.focus();
          UI.announce("«" + tmp.text + "» ahora en la posición " + (j + 1) + " de " + state.orderItems.length, true);
        });
      });
    }
    area.innerHTML = `<p class="order-help">Ordena con ▲ ▼ (arriba = primero).</p>`;
    area.appendChild(list);
    paint();
  }

  function useHint() {
    const q = currentQ();
    if (state.answered || state.hintsLeft <= 0 || state.hintUsedThisQ || !state.hintsOn || hintGivesAway(q)) return;
    TechAudio.playClick();
    state.hintsLeft--;
    state.hintsUsedRun++;
    state.hintUsedThisQ = true;
    state.hintAt = performance.now();
    // El coste se cobra al resolver la pregunta (finishRound), así siempre es el mismo y se ve en el resultado
    state.hintCost = GAME_CONFIG.pointsHintPenalty;
    if (runSaves()) Progress.recordHint();
    UI.updateHUD(hud());
    // Sin guardar la partida aquí: si se recarga antes de responder, «Reanudar» vuelve a esta pregunta
    // con la pista sin gastar (la que se vio no se puede volver a mostrar igual: las opciones se barajan)
    // Una pista por pregunta: el botón vuelve a activarse en la siguiente si quedan. Se marca con
    // aria-disabled en vez de disabled para que, si tenía el foco, no caiga a <body> (y un segundo
    // Enter no envíe la respuesta a medias)
    const hintBtn = UI.$("#btn-hint");
    if (hintBtn) hintBtn.setAttribute("aria-disabled", "true");

    const box = UI.$("#hint-box");
    box.hidden = false;
    let tip = "Pista activa.";

    if (CHOICE_TYPES.includes(q.type)) {
      const wrong = q.options.map((_, i) => i).filter((i) => i !== q.answer);
      const elim = wrong[Math.floor(Math.random() * wrong.length)];
      tip = "Pista: elimina «" + q.options[elim] + "».";
      const btn = document.querySelector(`#options .option-btn[data-index="${elim}"]`);
      if (btn) {
        if (btn === document.activeElement) UI.$("#question-text")?.focus({ preventScroll: true });
        btn.disabled = true;
        btn.classList.add("eliminated");
      }
    } else if (q.type === "fill") {
      // Revela como mucho la mitad: con respuestas cortas (p. ej. "53", "DNS") no regala la respuesta
      const ans = String(q.answer).normalize("NFC");
      const n = ans.length <= 2 ? 0 : ans.length <= 4 ? 1 : Math.min(4, Math.floor(ans.length / 2));
      tip = n
        ? "Pista: empieza con «" + ans.slice(0, n) + "…» (" + ans.length + " caracteres)."
        : "Pista: la respuesta tiene " + ans.length + " caracteres.";
    } else if (q.type === "match") {
      // Revela la primera pareja que el jugador aún no tiene bien (no una que ya colocó)
      const miss = q.pairs.findIndex((_, i) => state.matchSelections[i] !== i);
      const h = miss < 0 ? 0 : miss;
      tip = "Pista: «" + q.pairs[h].left + "» ↔ «" + q.pairs[h].right + "».";
      Object.keys(state.matchSelections).forEach((key) => {
        if (state.matchSelections[key] === h) delete state.matchSelections[key];
      });
      state.matchSelections[h] = h;
      state.matchPending = null;
      paintMatch();
    } else if (q.type === "order") {
      // Nombra el primer paso que el jugador aún no tiene en su lugar
      const miss = state.orderItems.findIndex((x, i) => x.orig !== q.answer[i]);
      const h = miss < 0 ? 0 : miss;
      tip = h === 0
        ? "Pista: el primero es «" + q.items[q.answer[0]] + "»."
        : "Pista: el paso " + (h + 1) + " es «" + q.items[q.answer[h]] + "».";
    }
    box.textContent = tip + " (−" + state.hintCost + " pts)";
    // La pista sale junto a la respuesta: si el jugador bajó hasta el botón, que no quede fuera de la vista
    box.scrollIntoView({ block: "nearest" });
    UI.announce(box.textContent, true);
    // En "completar" se vuelve al campo para seguir escribiendo (con el foco en Pista las letras serían atajos)
    if (q.type === "fill") UI.$("#fill-input")?.focus();
  }

  function submitAnswer() {
    if (state.answered) return;
    const q = currentQ();
    if (q.type === "fill") {
      const raw = (UI.$("#fill-input")?.value || "").trim();
      if (!raw) {
        UI.$("#fill-input")?.focus();
        return;
      }
      gradeFill(raw);
    } else if (q.type === "match") gradeMatch();
    else if (q.type === "order") gradeOrder();
  }

  /** Lo que dejó el jugador cuando se acabó el tiempo: en emparejar y ordenar, cómo quedó cada pareja o paso. */
  function timeoutResult(q) {
    if (q.type === "match") return { correct: correctLabel(q), rows: matchRows(q) };
    if (q.type === "order") return { correct: correctLabel(q), rows: orderRows(q) };
    return { correct: correctLabel(q), yours: null };
  }

  /** Cada concepto con la pareja que eligió el jugador (✔/✘) y, si falló, la correcta. */
  function matchRows(q) {
    return q.pairs.map((p, i) => {
      const r = state.matchSelections[i];
      const ok = r === i;
      return {
        ok,
        text: p.left + " → " + (r != null ? q.pairs[r].right : "sin emparejar"),
        fix: ok ? "" : "correcta: " + p.right
      };
    });
  }

  /** Cada paso en la posición en que lo dejó el jugador (✔/✘) y, si está mal, en qué paso va. */
  function orderRows(q) {
    return state.orderItems.map((x, i) => {
      const ok = x.orig === q.answer[i];
      return { ok, text: i + 1 + ". " + x.text, fix: ok ? "" : "va en el paso " + (q.answer.indexOf(x.orig) + 1) };
    });
  }

  function correctLabel(q) {
    if (CHOICE_TYPES.includes(q.type)) return q.options[q.answer];
    if (q.type === "tf") return q.answer ? "Verdadero" : "Falso";
    if (q.type === "fill") return q.answer;
    if (q.type === "match") return q.pairs.map((p) => p.left + " → " + p.right).join("; ");
    if (q.type === "order") return q.answer.map((i) => q.items[i]).join(" → ");
    return "";
  }

  function gradeChoice(index) {
    const q = currentQ();
    const ok = index === q.answer;
    UI.$all("#options .option-btn").forEach((btn) => {
      btn.disabled = true;
      const i = +btn.dataset.index;
      if (i === q.answer) btn.classList.add("correct");
      if (i === index && !ok) btn.classList.add("wrong");
    });
    finishRound(ok, { correct: q.options[q.answer], yours: q.options[index] });
  }

  function gradeTF(val) {
    const q = currentQ();
    const ok = val === q.answer;
    UI.$all(".tf-btn").forEach((btn) => {
      btn.disabled = true;
      const v = btn.dataset.val === "true";
      if (v === q.answer) btn.classList.add("correct");
      if (v === val && !ok) btn.classList.add("wrong");
    });
    finishRound(ok, { correct: q.answer ? "Verdadero" : "Falso", yours: val ? "Verdadero" : "Falso" });
  }

  // NFC: una «ó» pegada como «o» + acento combinado (de un PDF o un nombre de archivo de macOS) es la misma letra
  function norm(s) { return String(s).normalize("NFC").trim().toLowerCase().replace(/\s+/g, " "); }

  function gradeFill(raw) {
    const q = currentQ();
    let accept = q.accept || [q.answer];
    if (typeof accept === "string") accept = accept.split("|");
    accept = accept.map(norm);
    finishRound(accept.includes(norm(raw)), { correct: q.answer, yours: raw });
  }

  function gradeMatch() {
    const q = currentQ();
    const n = q.pairs.length;
    if (Object.keys(state.matchSelections).length < n) {
      UI.toast("Empareja todos los ítems antes de comprobar.");
      return;
    }
    let ok = true;
    for (let i = 0; i < n; i++) if (state.matchSelections[i] !== i) ok = false;
    finishRound(ok, { correct: correctLabel(q), rows: matchRows(q) });
  }

  function gradeOrder() {
    const q = currentQ();
    const player = state.orderItems.map((x) => x.orig);
    const ok = player.length === q.answer.length && player.every((v, i) => v === q.answer[i]);
    finishRound(ok, { correct: correctLabel(q), rows: orderRows(q) });
  }

  /**
   * false en el modo de prueba, o si el progreso se reinició (o se cargó un respaldo) en otra pestaña después
   * de empezar la partida: ya no se guarda nada.
   */
  function runSaves() { return !state.noSave && Progress.saveId() === state.saveId; }

  // El sonido del logro lo pone quien llama, una vez por tanda (varios a la vez sonarían superpuestos y más fuerte)
  function grant(id) {
    if (!runSaves() || !Progress.unlockAchievement(id)) return;
    state.pendingAchievements.push(id);
    state.runAchievements.push(id);
    const a = ACHIEVEMENTS.find((x) => x.id === id);
    if (a) UI.toast("Logro: " + a.icon + " " + a.name);
  }

  /**
   * res: { correct: texto de la respuesta correcta, yours: lo que respondió el jugador (null si no respondió),
   *        rows: en emparejar y ordenar, cada pareja o paso con ✔/✘ }
   */
  function finishRound(ok, res, timedOut) {
    clearTimer();
    state.answered = true;
    const sub = UI.$("#btn-submit");
    const hint = UI.$("#btn-hint");
    if (sub) sub.disabled = true;
    if (hint) hint.disabled = true;

    const saves = runSaves();
    if (saves) Progress.recordAnswer(ok);
    const q = currentQ();
    // Lo fallado se guarda para el modo Repasar errores; sale de la lista al acertarlo en dos días distintos
    let reviewNote = "";
    if (saves && !state.noMistakes) {
      if (ok) {
        const r = Progress.recordReviewHit(q.id);
        if (r === "done") reviewNote = "🔁 Repaso: la acertaste en dos días distintos, sale de tus errores.";
        else if (r === "later") reviewNote = "🔁 Repaso: bien. Vuelve a salir otro día; si la aciertas otra vez, sale de tus errores.";
        else if (r === "same-day") reviewNote = "🔁 Repaso: hoy ya la acertaste; para salir de tus errores, acierta otro día.";
      } else Progress.addMistake(q.id);
    }
    if (!ok) {
      const yours = res.rows ? res.rows.filter((r) => !r.ok).map((r) => r.text).join("; ") : res.yours;
      state.missed.push({ q: q.q, correct: res.correct, yours: yours == null ? "" : String(yours), explain: q.explain || "" });
    }
    // En un ticket, lo que se descubre en cada paso queda en las notas del caso para los siguientes
    if (state.ticket && q.reveal) state.ticketNotes.push(String(q.reveal));
    let gained = 0;
    let hintPaid = 0;

    if (ok) {
      TechAudio.playCorrect();
      state.streak++;
      state.correctCount++;
      if (state.streak > state.bestStreakRun) state.bestStreakRun = state.streak;
      if (saves) Progress.recordStreak(state.streak);
      gained =
        GAME_CONFIG.pointsCorrect +
        (state.streak > 1 ? GAME_CONFIG.pointsStreakBonus * (state.streak - 1) : 0);
      if (state.mode === "boss") gained = Math.round(gained * 1.5);
      if (state.timed && state.timeLeft > 0) gained += Math.min(50, state.timeLeft * 2);
      hintPaid = Math.min(gained, state.hintCost);
      gained -= hintPaid;
      state.score += gained;
      if (state.streak >= 5) grant("streak5");
      if (state.streak >= 10) grant("streak10");
      if (state.pendingAchievements.length) TechAudio.playAchievement(0.4); // tras el sonido de acierto
    } else {
      TechAudio.playWrong();
      state.streak = 0;
      state.wrongCount++;
      if (!state.practice) state.lives--;
      // Al fallar, la pista se cobra de lo que haya en el marcador (nunca queda negativo)
      hintPaid = Math.min(state.score, state.hintCost);
      state.score -= hintPaid;
    }

    UI.updateHUD(hud());
    saveRunSnapshot();
    showFeedback(ok, gained, res, q, timedOut, hintPaid, reviewNote);
  }

  function showFeedback(ok, gained, res, q, timedOut, hintPaid, reviewNote) {
    state.feedbackAt = performance.now();
    state.feedbackTimedOut = !!timedOut;
    UI.showScreen("screen-feedback");
    UI.flashFeedback(ok);
    UI.$("#feedback-icon").textContent = ok ? "✅" : timedOut ? "⏰" : "❌";
    const title = UI.$("#feedback-title");
    const yoursEl = UI.$("#feedback-yours");
    const rowsEl = UI.$("#feedback-rows");
    let yoursText = "";
    if (ok) {
      title.textContent = "¡Correcto!";
      title.className = "ok";
      UI.setText(
        "#feedback-detail",
        (state.noSave ? "" : "+" + gained + " pts" + (hintPaid ? " (pista −" + hintPaid + ")" : "") +
          (state.streak > 1 ? " · Racha x" + state.streak : ""))
      );
    } else {
      title.textContent = timedOut ? "¡Tiempo agotado!" : "Incorrecto";
      title.className = "bad";
      // En emparejar, la lista de abajo ya dice la pareja correcta de cada concepto
      const showCorrect = !(res.rows && currentQ().type === "match");
      UI.setText(
        "#feedback-detail",
        [showCorrect ? "Respuesta correcta: " + res.correct : "",
          state.practice ? "" : "Vidas: " + Math.max(0, state.lives),
          hintPaid ? "Pista −" + hintPaid + " pts" : ""].filter(Boolean).join(" · ")
      );
      // Lo que respondió el jugador, al lado de la correcta (los colores de las opciones no llegan a verse)
      if (!res.rows) yoursText = res.yours == null ? "Tu respuesta: no respondiste a tiempo" : "Tu respuesta: " + res.yours;
    }
    if (yoursEl) {
      yoursEl.hidden = !yoursText;
      yoursEl.textContent = yoursText;
    }
    if (rowsEl) {
      const rows = !ok && res.rows ? res.rows : [];
      rowsEl.hidden = !rows.length;
      rowsEl.setAttribute("aria-label", currentQ().type === "match" ? "Tus parejas" : "Tu orden");
      rowsEl.innerHTML = rows.map((r) =>
        `<li class="${r.ok ? "row-ok" : "row-bad"}"><span class="row-mark" aria-hidden="true">${r.ok ? "✔" : "✘"}</span>` +
        `<span class="sr-only">${r.ok ? "Bien: " : "Mal: "}</span>${UI.escapeHtml(r.text)}` +
        (r.fix ? ` <span class="row-fix">(${UI.escapeHtml(r.fix)})</span>` : "") + "</li>"
      ).join("");
    }
    const reviewEl = UI.$("#feedback-review");
    if (reviewEl) {
      reviewEl.hidden = !reviewNote;
      reviewEl.textContent = reviewNote || "";
    }
    const explain = q.explain || "";
    UI.setText("#feedback-explain", explain);
    // Ticket: lo que descubres en este paso; comandos: «Pruébalo tú» en tu propia computadora
    const revealEl = UI.$("#feedback-reveal");
    const reveal = state.ticket && q.reveal ? "📝 " + q.reveal : "";
    if (revealEl) {
      revealEl.hidden = !reveal;
      revealEl.textContent = reveal;
    }
    const tryEl = UI.$("#feedback-try");
    const tryText = typeof q.try === "string" && q.try.trim() ? q.try.trim() : "";
    if (tryEl) {
      tryEl.hidden = !tryText;
      tryEl.innerHTML = tryText ? '<strong>🧪 Pruébalo tú:</strong> ' + UI.codeText(tryText) : "";
    }
    showPendingAchievements("#feedback-ach");
    // Un solo aviso con el resultado, tu respuesta, los logros de esta pregunta (sustituye al del toast del logro)
    // y, al final, la explicación: es lo que enseña y el foco va a Continuar, que está debajo
    const ach = UI.$("#feedback-ach");
    const rowsSummary = rowsEl && !rowsEl.hidden
      ? (rowsEl.getAttribute("aria-label") + ": " + Array.from(rowsEl.children).map((li) => li.textContent.replace(/^[✔✘]/, "")).join(". "))
      : "";
    const parts = [title.textContent, UI.$("#feedback-detail").textContent, yoursText, rowsSummary, reviewNote,
      ach && !ach.hidden ? ach.textContent : "", explain, reveal.replace(/^📝 /, ""), tryText ? "Pruébalo tú: " + tryText.replace(/`/g, "") : ""];
    UI.announce(parts.filter(Boolean).reduce((acc, s) => (acc ? acc + (/[.!?…]$/.test(acc) ? " " : ". ") + s : s), ""), true);
    // preventScroll: en pantallas pequeñas el título y la respuesta deben seguir visibles arriba
    UI.$("#btn-next-feedback")?.focus({ preventScroll: true });
  }

  /** Muestra (y vacía) los logros obtenidos desde la última vez; los toasts solo dejan ver el último. */
  function showPendingAchievements(sel) {
    renderAchievementList(sel, state.pendingAchievements);
    state.pendingAchievements = [];
  }

  function renderAchievementList(sel, ids) {
    const el = UI.$(sel);
    if (!el) return;
    if (!ids.length) {
      el.hidden = true;
      return;
    }
    el.hidden = false;
    el.textContent =
      "¡Logro! " +
      ids
        .map((id) => {
          const a = ACHIEVEMENTS.find((x) => x.id === id);
          return a ? a.icon + " " + a.name : id;
        })
        .join(" · ");
  }

  function advance() {
    // Evita avanzar dos veces (clic + Enter) o desde fuera de la pantalla de resultado
    if (!state.answered || !UI.$("#screen-feedback")?.classList.contains("active")) return;
    if (!state.practice && state.lives <= 0) {
      endGame(false);
      return;
    }
    state.qIndex++;
    if (state.qIndex >= state.totalQ) {
      endGame(true);
      return;
    }
    UI.showScreen("screen-play");
    showQuestion();
  }

  const MODE_LABELS = {
    campaign: "Aventura",
    practice: "Práctica",
    review: "Repaso de errores",
    marathon: "Maratón",
    timer: "Cronómetro",
    boss: "Boss",
    daily: "Reto del día",
    ticket: "Simulador de tickets",
    test: "Prueba de preguntas"
  };

  function endGame(victory) {
    clearTimer();
    if (!state.noSave) clearRunSnapshot();
    inRun = false;
    // Progreso reiniciado en otra pestaña durante la partida: este resultado no se guarda en el progreso nuevo
    const saves = runSaves();
    const totalAns = state.correctCount + state.wrongCount;
    const acc = totalAns ? Math.round((state.correctCount / totalAns) * 100) : 0;
    // Estrellas de Aventura: ★ superado, ★★ con 85% o más, ★★★ sin fallos
    let starsEarned = 0;
    let starsBest = 0;
    let dailyNote = "";
    let ticketNote = "";
    state.nextLevel = null;
    const isNew = saves && UI.saveHighScore(state.score);
    const world = state.worldId ? getWorldById(state.worldId) : null;
    const levelCleared = !!(victory && state.mode === "campaign" && state.worldId && state.level);
    if (!state.practice && saves) Progress.recordGameEnd({ victory, mode: state.mode, levelCleared });
    // Al repetir un nivel ya superado no se desbloquea nada nuevo: el aviso solo sale la primera vez
    let nextWasOpen = false;

    if (victory && saves) {
      if (state.mode === "campaign" && state.worldId && state.level) {
        const maxL = (Progress.levelsPerWorld && Progress.levelsPerWorld()) || GAME_CONFIG.levelsPerWorld || 5;
        const wi = WORLDS.findIndex((w) => w.id === state.worldId);
        nextWasOpen = state.level < maxL
          ? Progress.isLevelUnlocked(state.worldId, state.level + 1)
          : wi >= 0 && wi < WORLDS.length - 1 && Progress.isUnlocked(WORLDS[wi + 1].id);
        Progress.markLevelCleared(state.worldId, state.level);
        starsEarned = acc === 100 ? 3 : acc >= 85 ? 2 : 1;
        starsBest = Progress.saveLevelStars(state.worldId, state.level, starsEarned);
        grant("first_win");
        if (state.hintsUsedRun === 0) grant("no_hints");
        if (state.worldId === "support" && state.level >= maxL) grant("support_hero");
        if (state.worldId === "security" && state.level >= maxL) grant("security_hero");
        if (state.worldId === "hardware" && state.level >= maxL) grant("hardware_hero");
        if (state.worldId === "cloud" && state.level >= maxL) grant("cloud_hero");
        if (state.worldId === "database" && state.level >= maxL) grant("database_hero");
        if (state.worldId === "identity" && state.level >= maxL) grant("identity_hero");
        if (Progress.allLevelsCleared(state.worldId)) grant("world_maestro");
        if (Progress.countClearedLevels() >= 25) grant("level_master");
        if (WORLDS.every((w) => Progress.isLevelCleared(w.id, 1))) grant("all_worlds");
        if (WORLDS.every((w) => Progress.allLevelsCleared(w.id))) grant("all_levels");
        let perfect = 0;
        WORLDS.forEach((w) => { for (let L = 1; L <= maxL; L++) if (Progress.getLevelStars(w.id, L) === 3) perfect++; });
        if (perfect >= 10) grant("stars3");
        // «Siguiente nivel»: el que se acaba de abrir (o el primero del mundo siguiente)
        if (state.level < maxL) state.nextLevel = { worldId: state.worldId, level: state.level + 1 };
        else if (wi >= 0 && wi < WORLDS.length - 1 && Progress.isUnlocked(WORLDS[wi + 1].id)) state.nextLevel = { worldId: WORLDS[wi + 1].id, level: 1 };
      }
      if (state.mode === "daily") {
        // Empezado antes de la medianoche y terminado después: cuenta para el día en que se empezó
        const late = state.dailyDay === Progress.addDays(Progress.today(), -1);
        const d = Progress.getDaily(late ? state.dailyDay : null);
        if (d && d.day === state.dailyDay && !d.done) {
          Progress.saveDaily(Object.assign(d, { done: true, correct: state.correctCount, total: totalAns }));
          const streak = Progress.recordDailyDone(d.day);
          if (streak >= 7) grant("daily7");
          dailyNote = (late ? "Reto de ayer completado (lo terminaste pasada la medianoche)" : "Reto de hoy completado") +
            " · 🔥 " + streak + (streak === 1 ? " día seguido" : " días seguidos") +
            (late ? ". Hoy ya tienes uno nuevo." : ". Vuelve mañana por otro.");
        } else if (d && d.day === state.dailyDay) {
          dailyNote = "Ya habías completado el reto de " + (late ? "ayer" : "hoy") + ": esta vez fue práctica." +
            (late ? " Hoy ya tienes uno nuevo." : " Vuelve mañana por otro.");
        } else dailyNote = "Este reto era de otro día: no suma a la racha.";
      }
      if (state.mode === "ticket" && state.ticket) {
        const n = state.ticket.steps.length;
        const before = Progress.getTicketBest(state.ticket.id);
        Progress.saveTicketResult(state.ticket.id, state.correctCount);
        ticketNote = "Pasos bien: " + state.correctCount + " de " + n +
          (state.correctCount >= n ? " · ¡caso resuelto sin fallos!" : before > state.correctCount ? " · tu mejor: " + before + " de " + n : "");
        const solved = TICKETS.filter((t) => Progress.getTicketBest(t.id) >= t.steps.length).length;
        if (solved >= 5) grant("tickets5");
      }
      if (state.mode === "marathon") grant("marathon");
      if (state.mode === "timer") grant("timer_ace");
      if (state.mode === "boss" && state.worldId) {
        Progress.markBossWin(state.worldId);
        grant("boss_slayer");
        if (Progress.allBossesBeaten()) grant("all_bosses");
      }
    }

    UI.showScreen("screen-end");
    UI.$("#end-icon").textContent = victory ? (state.mode === "boss" ? "👹" : state.mode === "ticket" ? "🎫" : state.mode === "test" ? "🧪" : "🏆") : "💀";
    let titleTxt = victory ? "¡Completado!" : "Game Over";
    if (victory && state.mode === "boss") titleTxt = "¡Boss derrotado!";
    if (victory && state.mode === "marathon") titleTxt = "¡Maratón terminada!";
    if (victory && state.mode === "daily") titleTxt = "¡Reto del día terminado!";
    if (victory && state.mode === "ticket") titleTxt = "Ticket cerrado";
    if (victory && state.mode === "test") titleTxt = "Prueba terminada";
    const title = UI.$("#end-title");
    title.textContent = titleTxt;
    title.className = victory ? "ok" : "bad";

    const head = world ? world.icon + " " + world.name + (state.level ? " · Nivel " + state.level : "")
      : state.mode === "marathon" ? "Maratón mixta" + (state.marathonScope === "mine" ? " · Mi nivel" : "")
      : state.mode === "ticket" && state.ticket ? (state.ticket.icon || "🎫") + " " + state.ticket.title : "";
    UI.setText(
      "#end-summary",
      (head ? head + "\n" : "") +
        "Modo: " + (MODE_LABELS[state.mode] || state.mode) +
        (starsEarned ? "\nEstrellas: " + "★".repeat(starsEarned) + "☆".repeat(3 - starsEarned) + (starsBest > starsEarned ? " · tu mejor: " + "★".repeat(starsBest) + "☆".repeat(3 - starsBest) : "") : "") +
        (state.noSave ? "" : "\nPuntuación: " + state.score + (isNew ? " · ¡Nuevo récord!" : "")) +
        "\nAciertos: " + state.correctCount + "/" + totalAns + " (" + acc + "%)" +
        "\nMejor racha: " + state.bestStreakRun +
        (state.practice ? "" : " · Vidas: " + Math.max(0, state.lives))
    );
    const nextBtn = UI.$("#btn-next-level");
    const pickBtn = UI.$("#btn-pick-again");
    if (nextBtn) {
      const nl = state.nextLevel;
      nextBtn.hidden = !nl;
      if (nl) {
        const nw = getWorldById(nl.worldId);
        nextBtn.textContent = nl.worldId === state.worldId ? "Siguiente nivel ▶ (Nivel " + nl.level + ")" : "Siguiente mundo ▶ " + nw.icon + " " + nw.name;
      }
    }
    if (pickBtn) {
      pickBtn.classList.toggle("btn-primary", !state.nextLevel);
      pickBtn.textContent = state.mode === "ticket" ? "Elegir ticket" : "Elegir mundo";
    }
    UI.setText("#end-highscore", String(UI.getHighScore()));
    // La pantalla final lista todos los logros de la partida (también las rachas ya vistas en un resultado)
    const newAch = state.pendingAchievements.length > 0;
    state.pendingAchievements = [];
    renderAchievementList("#end-ach", state.runAchievements);
    renderMissed();

    const unlockEl = UI.$("#end-unlock");
    if (unlockEl) {
      if (state.noSave) {
        unlockEl.hidden = false;
        unlockEl.textContent = "Modo de prueba: no se guardó nada. Para jugar normal, abre index.html sin «?pregunta=…» en la dirección.";
      } else if (!saves) {
        unlockEl.hidden = false;
        unlockEl.textContent = "El progreso se reinició (o se cargó un respaldo) durante esta partida: este resultado no se guardó.";
      } else if (dailyNote || ticketNote) {
        unlockEl.hidden = false;
        unlockEl.textContent = dailyNote || ticketNote;
      } else if (victory && state.mode === "campaign" && world && state.level) {
        const maxL = (Progress.levelsPerWorld && Progress.levelsPerWorld()) || GAME_CONFIG.levelsPerWorld || 5;
        if (state.level < maxL) {
          unlockEl.hidden = nextWasOpen;
          unlockEl.textContent = "Desbloqueado: Nivel " + (state.level + 1) + " de " + world.name;
        } else {
          const idx = WORLDS.findIndex((w) => w.id === world.id);
          if (idx >= 0 && idx < WORLDS.length - 1) {
            unlockEl.hidden = nextWasOpen;
            unlockEl.textContent = "Mundo desbloqueado: " + WORLDS[idx + 1].icon + " " + WORLDS[idx + 1].name;
          } else {
            unlockEl.hidden = false;
            unlockEl.textContent = "¡Dominaste " + world.name + " (" + maxL + "/" + maxL + " niveles)!";
          }
        }
      } else unlockEl.hidden = true;
    }

    if (victory) TechAudio.playLevelComplete();
    else TechAudio.playGameOver();
    if (newAch) TechAudio.playAchievement(0.9); // una vez, tras la fanfarria
  }

  function renderMissed() {
    const box = UI.$("#end-mistakes");
    if (!box) return;
    if (!state.missed.length) {
      box.hidden = true;
      box.innerHTML = "";
      return;
    }
    box.hidden = false;
    box.innerHTML =
      `<summary>Repasa lo que fallaste (${state.missed.length})</summary><ol>` +
      state.missed
        .map((m) =>
          `<li><span class="mistake-q">${UI.escapeHtml(m.q)}</span>` +
          (m.yours ? `<span class="mistake-yours">✘ Tu respuesta: ${UI.escapeHtml(m.yours)}</span>` : "") +
          `<span class="mistake-a">✔ ${UI.escapeHtml(m.correct)}</span>` +
          (m.explain ? `<span class="mistake-explain">${UI.escapeHtml(m.explain)}</span>` : "") + "</li>")
        .join("") +
      "</ol>";
  }

  function renderStats() {
    const s = Progress.getStats();
    const review = reviewPool();
    const streak = Progress.getDayStreak();
    const total = s.correct + s.wrong;
    const pct = total ? Math.round((s.correct / total) * 100) : 0;
    UI.setHTML(
      "#stats-body",
      `<ul class="stats-list">
        <li><strong>Partidas con vidas:</strong> ${s.gamesPlayed} (ganadas ${s.gamesWon})</li>
        <li><strong>Partidas de práctica o repaso:</strong> ${s.practiceRuns}</li>
        <li><strong>Respuestas (todos los modos):</strong> ${s.correct} bien / ${s.wrong} mal (${pct}% acierto)</li>
        <li><strong>Mejor racha:</strong> ${s.bestStreak}</li>
        <li><strong>Pistas usadas:</strong> ${s.hintsUsed}</li>
        <li><strong>Maratones ganadas:</strong> ${s.marathonWins}</li>
        <li><strong>Cronómetro ganados:</strong> ${s.timerWins}</li>
        <li><strong>Boss (partidas ganadas):</strong> ${s.bossWins}</li>
        <li><strong>Niveles completados:</strong> ${Progress.countClearedLevels()} / ${WORLDS.length * Progress.levelsPerWorld()}</li>
        <li><strong>Estrellas:</strong> ${WORLDS.reduce((n, w) => n + Progress.countStars(w.id), 0)} / ${WORLDS.length * Progress.levelsPerWorld() * 3}</li>
        <li><strong>Errores por repasar:</strong> ${review.due.length + review.later.length} (${review.due.length} para hoy)</li>
        <li><strong>Reto del día:</strong> racha de ${streak.count} ${streak.count === 1 ? "día" : "días"} (mejor: ${streak.best})</li>
        ${TICKETS.length ? `<li><strong>Tickets resueltos sin fallos:</strong> ${TICKETS.filter((t) => Progress.getTicketBest(t.id) >= t.steps.length).length} / ${TICKETS.length}</li>` : ""}
        <li><strong>Récord puntos:</strong> ${UI.getHighScore()}</li>
      </ul>`
    );
  }

  function renderAchievements() {
    const unlocked = Progress.getAchievements();
    UI.setHTML(
      "#achievements-grid",
      ACHIEVEMENTS.map((a) => {
        const on = !!unlocked[a.id];
        return `<div class="ach-card ${on ? "unlocked" : "locked"}">
          <span class="ach-icon">${a.icon}</span>
          <span class="ach-name">${UI.escapeHtml(a.name)}</span>
          <span class="ach-desc">${UI.escapeHtml(a.desc)}</span>
          <span class="ach-state">${on ? "Desbloqueado" : "Bloqueado"}</span>
        </div>`;
      }).join("")
    );
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
