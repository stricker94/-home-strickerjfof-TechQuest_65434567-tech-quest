/**
 * Tech Quest — Progreso, logros, estadísticas y niveles
 */
const Progress = (() => {
  // Copia en memoria: si el navegador bloquea localStorage o no deja escribir, el progreso
  // se conserva al menos durante la sesión en lugar de perderse en cada lectura.
  const mem = {};
  // Claves cuya última escritura falló (almacenamiento lleno o bloqueado): localStorage aún tiene un valor
  // viejo, así que se leen de memoria aunque otras claves sí se hayan podido guardar después
  const failed = new Set();

  function readRaw(key) {
    if (failed.has(key)) return mem[key];
    try {
      return localStorage.getItem(key);
    } catch (_) {
      return key in mem ? mem[key] : null;
    }
  }

  function writeRaw(key, raw) {
    mem[key] = raw;
    try {
      localStorage.setItem(key, raw);
      failed.delete(key);
    } catch (_) {
      failed.add(key);
    }
  }

  function removeRaw(key) {
    delete mem[key];
    failed.delete(key);
    try { localStorage.removeItem(key); } catch (_) {}
  }

  function isObj(v) { return !!v && typeof v === "object" && !Array.isArray(v); }

  /** Lee un objeto guardado; un valor ausente, corrupto o que no sea objeto (null, [], 5…) da el fallback. */
  function parse(key, fallback) {
    try {
      const v = JSON.parse(readRaw(key));
      return isObj(v) ? v : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function save(key, val) {
    writeRaw(key, JSON.stringify(val));
  }

  const LEVELS_KEY = GAME_CONFIG.storageLevels || "techQuestLevelClears";

  function defaultUnlocks() {
    const u = {};
    WORLDS.forEach((w, i) => { u[w.id] = i === 0; });
    if (WORLDS[0]) u[WORLDS[0].id] = true;
    return u;
  }

  function getUnlocks() {
    const u = Object.assign(defaultUnlocks(), parse(GAME_CONFIG.storageUnlocks, {}));
    if (WORLDS[0]) u[WORLDS[0].id] = true;
    return u;
  }

  function isUnlocked(id) { return !!getUnlocks()[id]; }

  function unlockWorld(id) {
    const u = getUnlocks();
    if (u[id]) return false;
    u[id] = true;
    save(GAME_CONFIG.storageUnlocks, u);
    return true;
  }

  function unlockNextAfter(id) {
    const i = WORLDS.findIndex((w) => w.id === id);
    if (i >= 0 && i < WORLDS.length - 1) return unlockWorld(WORLDS[i + 1].id);
    return false;
  }

  function getLevelClears() {
    return parse(LEVELS_KEY, {});
  }

  function isLevelCleared(worldId, level) {
    const c = getLevelClears();
    return !!(c[worldId] && c[worldId][String(level)]);
  }

  function levelsPerWorld() {
    return (GAME_CONFIG && GAME_CONFIG.levelsPerWorld) || 5;
  }

  function markLevelCleared(worldId, level) {
    const c = getLevelClears();
    if (!isObj(c[worldId])) c[worldId] = {};
    c[worldId][String(level)] = Date.now();
    save(LEVELS_KEY, c);
    const maxL = levelsPerWorld();
    // Completing the top level clears the world and unlocks next world
    if (level >= maxL) {
      markWorldCompleted(worldId);
      unlockNextAfter(worldId);
    } else if (level === 1) {
      unlockWorld(worldId);
    }
  }

  function isLevelUnlocked(worldId, level) {
    const idx = WORLDS.findIndex((w) => w.id === worldId);
    const worldOpen = isUnlocked(worldId) || idx === 0;
    if (!worldOpen) return false;
    if (level <= 1) return true;
    return isLevelCleared(worldId, level - 1);
  }

  function worldProgressPct(worldId) {
    const maxL = levelsPerWorld();
    let cleared = 0;
    for (let L = 1; L <= maxL; L++) if (isLevelCleared(worldId, L)) cleared++;
    return Math.round((cleared / maxL) * 100);
  }

  function allLevelsCleared(worldId) {
    const maxL = levelsPerWorld();
    for (let L = 1; L <= maxL; L++) if (!isLevelCleared(worldId, L)) return false;
    return true;
  }

  function countClearedLevels() {
    const maxL = levelsPerWorld();
    let n = 0;
    WORLDS.forEach((w) => {
      for (let L = 1; L <= maxL; L++) if (isLevelCleared(w.id, L)) n++;
    });
    return n;
  }

  function getAchievements() { return parse(GAME_CONFIG.storageAchievements, {}); }

  function unlockAchievement(id) {
    const a = getAchievements();
    if (a[id]) return false;
    a[id] = Date.now();
    save(GAME_CONFIG.storageAchievements, a);
    return true;
  }

  function getBossWins() { return parse(GAME_CONFIG.storageBoss, {}); }

  function markBossWin(id) {
    const b = getBossWins();
    b[id] = true;
    save(GAME_CONFIG.storageBoss, b);
  }

  function allBossesBeaten() {
    const wins = getBossWins();
    return WORLDS.filter((w) => w.boss && w.boss.length).every((w) => wins[w.id]);
  }

  function getCompleted() { return parse("techQuestCompletedWorlds", {}); }

  function markWorldCompleted(id) {
    const c = getCompleted();
    c[id] = true;
    save("techQuestCompletedWorlds", c);
  }

  function allWorldsCompleted() { return WORLDS.every((w) => getCompleted()[w.id] || allLevelsCleared(w.id)); }

  // ——— Días (fecha local "AAAA-MM-DD"): repaso espaciado, reto del día y racha ———
  function dayKey(d) {
    d = d || new Date();
    const p = (n) => String(n).padStart(2, "0");
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }
  function today() { return dayKey(); }
  /** El día n días después de "AAAA-MM-DD" (n puede ser negativo). */
  function addDays(day, n) {
    const [y, m, d] = String(day).split("-").map(Number);
    return dayKey(new Date(y, m - 1, d + n));
  }

  // Preguntas falladas pendientes de repaso: { idPregunta: { miss, hits, last, due } }
  //   miss = cuándo se falló; hits = aciertos en días distintos desde entonces; last = día del último acierto
  //   que contó; due = día desde el que toca repasarla ("" = ya). Antes se guardaba solo el timestamp del fallo.
  const MISTAKES_KEY = "techQuestMistakes";
  // Aciertos, en días distintos, para que una pregunta salga de la lista (uno solo puede ser suerte)
  const REVIEW_HITS = 2;

  function normMistake(v) {
    if (isObj(v)) {
      return {
        miss: Number(v.miss) || 0,
        hits: Math.max(0, Math.floor(Number(v.hits) || 0)),
        last: typeof v.last === "string" ? v.last : "",
        due: typeof v.due === "string" ? v.due : ""
      };
    }
    return { miss: Number(v) || 0, hits: 0, last: "", due: "" };
  }

  function getMistakes() {
    const raw = parse(MISTAKES_KEY, {});
    const out = {};
    Object.keys(raw).forEach((id) => { out[id] = normMistake(raw[id]); });
    return out;
  }

  /** Un fallo (re)inicia el repaso de esa pregunta: vuelve a necesitar REVIEW_HITS aciertos. */
  function addMistake(id) {
    if (!id) return;
    const m = getMistakes();
    m[id] = { miss: Date.now(), hits: 0, last: "", due: "" };
    save(MISTAKES_KEY, m);
  }

  /**
   * Acierto en una pregunta pendiente. Devuelve null si no estaba en la lista, "same-day" si ya contó un
   * acierto hoy, "later" si cuenta y vuelve a salir otro día, o "done" si sale de la lista.
   */
  function recordReviewHit(id) {
    const m = getMistakes();
    // hasOwnProperty, igual que el repaso: cualquier entrada que se muestre también se puede quitar
    if (!Object.prototype.hasOwnProperty.call(m, id)) return null;
    const e = m[id];
    const day = today();
    if (e.last === day) return "same-day";
    e.hits++;
    e.last = day;
    let res = "later";
    if (e.hits >= REVIEW_HITS) {
      delete m[id];
      res = "done";
    } else e.due = addDays(day, 1);
    save(MISTAKES_KEY, m);
    return res;
  }

  function removeMistake(id) {
    const m = getMistakes();
    if (!Object.prototype.hasOwnProperty.call(m, id)) return false;
    delete m[id];
    save(MISTAKES_KEY, m);
    return true;
  }

  /** true si a esa pregunta pendiente ya le toca repaso hoy. */
  function isMistakeDue(entry, day) { return !entry.due || entry.due <= (day || today()); }

  // ——— Estrellas por nivel (Aventura): { mundo: { nivel: 1..3 } }, se guarda la mejor ———
  const STARS_KEY = "techQuestLevelStars";
  function getLevelStars(worldId, level) {
    const s = parse(STARS_KEY, {});
    const v = isObj(s[worldId]) ? Math.floor(Number(s[worldId][String(level)]) || 0) : 0;
    // Un nivel superado antes de que existieran las estrellas vale al menos una
    return Math.max(Math.min(3, Math.max(0, v)), isLevelCleared(worldId, level) ? 1 : 0);
  }
  /** Guarda las estrellas si mejoran la marca; devuelve la mejor. */
  function saveLevelStars(worldId, level, stars) {
    const s = parse(STARS_KEY, {});
    if (!isObj(s[worldId])) s[worldId] = {};
    const best = Math.max(getLevelStars(worldId, level), stars);
    s[worldId][String(level)] = best;
    save(STARS_KEY, s);
    return best;
  }
  function countStars(worldId) {
    let n = 0;
    for (let L = 1; L <= levelsPerWorld(); L++) n += getLevelStars(worldId, L);
    return n;
  }

  // ——— Reto del día y racha de días ———
  const DAILY_KEY = "techQuestDaily";
  const DAY_STREAK_KEY = "techQuestDayStreak";
  /** { day, ids, done, correct, total } del reto de hoy, o null si aún no se generó. */
  function getDaily() {
    const d = parse(DAILY_KEY, null);
    if (!d || d.day !== today() || !Array.isArray(d.ids)) return null;
    return { day: d.day, ids: d.ids.filter((x) => typeof x === "string"), done: !!d.done, correct: Number(d.correct) || 0, total: Number(d.total) || 0 };
  }
  function saveDaily(d) { save(DAILY_KEY, d); }
  /** Racha de días seguidos con el reto completado (0 si se rompió). */
  function getDayStreak() {
    const s = parse(DAY_STREAK_KEY, {});
    const day = today();
    const count = Math.max(0, Math.floor(Number(s.count) || 0));
    const alive = s.last === day || s.last === addDays(day, -1);
    return { count: alive ? count : 0, best: Math.max(count, Math.floor(Number(s.best) || 0)), doneToday: s.last === day };
  }
  /** Marca el reto de hoy como hecho; devuelve la racha actual. */
  function recordDailyDone() {
    const s = parse(DAY_STREAK_KEY, {});
    const day = today();
    if (s.last === day) return getDayStreak().count;
    const count = s.last === addDays(day, -1) ? (Math.floor(Number(s.count) || 0) + 1) : 1;
    save(DAY_STREAK_KEY, { last: day, count, best: Math.max(count, Math.floor(Number(s.best) || 0)) });
    return count;
  }

  // ——— Tickets: mejor resultado por caso { idCaso: aciertos } ———
  const TICKETS_KEY = "techQuestTickets";
  function getTicketBest(id) { return Math.max(0, Math.floor(Number(parse(TICKETS_KEY, {})[id]) || 0)); }
  function saveTicketResult(id, correct) {
    const t = parse(TICKETS_KEY, {});
    t[id] = Math.max(getTicketBest(id), correct);
    save(TICKETS_KEY, t);
  }

  // Cambia en cada reinicio: una partida empezada antes (p. ej. en otra pestaña) no escribe en el progreso nuevo
  const SAVE_ID_KEY = "techQuestSaveId";
  function saveId() { return readRaw(SAVE_ID_KEY) || ""; }

  /** Claves de progreso guardadas (no incluye el sonido ni el id de guardado). */
  function progressKeys() {
    let keys = Object.keys(mem);
    try { keys = keys.concat(Object.keys(localStorage)); } catch (_) {}
    return Array.from(new Set(keys)).filter((k) => k.startsWith("techQuest") && k !== GAME_CONFIG.storageMuted && k !== SAVE_ID_KEY);
  }

  function newSaveId() {
    writeRaw(SAVE_ID_KEY, Date.now().toString(36) + "-" + Math.random().toString(36).slice(2));
  }

  /** Borra progreso, logros, estadísticas y récord; conserva la preferencia de sonido. */
  function resetAll() {
    progressKeys().forEach(removeRaw);
    newSaveId();
  }

  const BACKUP_APP = "Tech Quest";
  /** Respaldo de todo el progreso (lo que borra «Reiniciar progreso»), listo para guardar como .json. */
  function exportBackup() {
    const datos = {};
    progressKeys().forEach((k) => {
      const v = readRaw(k);
      if (v != null) datos[k] = v;
    });
    return { app: BACKUP_APP, formato: 1, fecha: new Date().toISOString(), datos };
  }

  /** Revisa un respaldo ya leído (JSON); devuelve sus datos o null si no es un respaldo de Tech Quest. */
  function checkBackup(obj) {
    if (!isObj(obj) || obj.app !== BACKUP_APP || !isObj(obj.datos)) return null;
    const datos = {};
    for (const k of Object.keys(obj.datos)) {
      const v = obj.datos[k];
      if (!k.startsWith("techQuest") || k === GAME_CONFIG.storageMuted || k === SAVE_ID_KEY || typeof v !== "string") continue;
      datos[k] = v;
    }
    return datos;
  }

  /** Sustituye todo el progreso por el del respaldo (conserva el sonido). Devuelve cuántos datos cargó. */
  function importBackup(obj) {
    const datos = checkBackup(obj);
    if (!datos) return -1;
    progressKeys().forEach(removeRaw);
    Object.keys(datos).forEach((k) => writeRaw(k, datos[k]));
    // Como al reiniciar: una partida empezada antes (p. ej. en otra pestaña) ya no escribe encima
    newSaveId();
    return Object.keys(datos).length;
  }

  function defaultStats() {
    return {
      gamesPlayed: 0, gamesWon: 0, correct: 0, wrong: 0, bestStreak: 0,
      hintsUsed: 0, marathonWins: 0, timerWins: 0, bossWins: 0, levelsCleared: 0, practiceRuns: 0
    };
  }

  function getStats() { return Object.assign(defaultStats(), parse(GAME_CONFIG.storageStats, {})); }

  function patchStats(fn) {
    const s = getStats();
    fn(s);
    save(GAME_CONFIG.storageStats, s);
  }

  function recordAnswer(ok) { patchStats((s) => { if (ok) s.correct++; else s.wrong++; }); }
  function recordStreak(n) { patchStats((s) => { if (n > s.bestStreak) s.bestStreak = n; }); }
  function recordHint() { patchStats((s) => { s.hintsUsed++; }); }
  function recordGameStart() { patchStats((s) => { s.gamesPlayed++; }); }
  /** Práctica y Repaso no tienen vidas: se cuentan aparte para no inflar ni rebajar las partidas ganadas. */
  function recordPracticeRun() { patchStats((s) => { s.practiceRuns = (s.practiceRuns || 0) + 1; }); }
  function recordGameEnd(meta) {
    patchStats((s) => {
      if (meta.victory) s.gamesWon++;
      if (meta.mode === "marathon" && meta.victory) s.marathonWins++;
      if (meta.mode === "timer" && meta.victory) s.timerWins++;
      if (meta.mode === "boss" && meta.victory) s.bossWins++;
      if (meta.levelCleared) s.levelsCleared = (s.levelsCleared || 0) + 1;
    });
  }

  return {
    getUnlocks, isUnlocked, unlockWorld, unlockNextAfter,
    getLevelClears, isLevelCleared, markLevelCleared, isLevelUnlocked,
    levelsPerWorld, worldProgressPct, allLevelsCleared, countClearedLevels,
    getAchievements, unlockAchievement,
    getBossWins, markBossWin, allBossesBeaten,
    getCompleted, markWorldCompleted, allWorldsCompleted,
    getStats, recordAnswer, recordStreak, recordHint, recordGameStart, recordPracticeRun, recordGameEnd,
    getMistakes, addMistake, removeMistake, recordReviewHit, isMistakeDue, resetAll, saveId,
    getLevelStars, saveLevelStars, countStars,
    getDaily, saveDaily, getDayStreak, recordDailyDone, today, addDays,
    getTicketBest, saveTicketResult,
    exportBackup, checkBackup, importBackup,
    readRaw, writeRaw
  };
})();
