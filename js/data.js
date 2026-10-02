/**
 * Tech Quest — Configuración, niveles, logros y registro de mundos (es-MX)
 *
 * Las preguntas están en js/mundos/, un archivo por mundo; cada uno llama a addWorld({ ... }).
 * El orden de los mundos (y en el que se desbloquean) es el orden de sus <script> en index.html.
 */

const GAME_CONFIG = {
  maxLives: 3,
  hintsPerWorld: 2,
  pointsCorrect: 100,
  pointsStreakBonus: 25,
  pointsHintPenalty: 30,
  storageKey: "techQuestHighScore",
  storageMuted: "techQuestMuted",
  storageUnlocks: "techQuestUnlocks",
  storageAchievements: "techQuestAchievements",
  storageStats: "techQuestStats",
  storageBoss: "techQuestBossWins",
  storageLevels: "techQuestLevelClears",
  levelsPerWorld: 5,
  marathonCount: 20,
  // Repasar errores juega como mucho esta cantidad por partida (al azar entre los pendientes)
  reviewMaxQuestions: 20,
  timerSeconds: 25,
  timerMaxQuestions: 12,
  bossTimerSeconds: 20,
  unlockScoreThreshold: 600
};

const LEVEL_LABELS = {
  1: { name: "Básico", icon: "1️⃣" },
  2: { name: "Intermedio", icon: "2️⃣" },
  3: { name: "Avanzado", icon: "3️⃣" },
  4: { name: "Experto", icon: "4️⃣" },
  5: { name: "Maestro", icon: "5️⃣" }
};

const WORLDS = [];

// Archivo (src del <script>) de cada mundo cargado: index.html avisa de los de js/mundos/ que no llegaron a cargarse
window.techQuestLoaded = {};

/** Registra un mundo (lo llama cada archivo de js/mundos/). Un id repetido se ignora: el validador lo señala. */
function addWorld(world) {
  const script = typeof document !== "undefined" && document.currentScript;
  const src = script ? script.getAttribute("src") : null;
  if (src) window.techQuestLoaded[src] = true;
  if (!world || typeof world !== "object" || !world.id || getWorldById(world.id)) return;
  // Un hueco o un null en una lista (",," en el archivo) no debe romper el juego: se descarta
  const solo = (list) => (Array.isArray(list) ? list.filter((q) => q && typeof q === "object") : []);
  world.questions = solo(world.questions);
  if (world.boss != null) world.boss = solo(world.boss);
  WORLDS.push(world);
}

function getWorldById(id) {
  return WORLDS.find((w) => w.id === id);
}

/** Preguntas de un nivel (sin las del Boss). */
function getQuestionsForLevel(worldId, level) {
  const w = getWorldById(worldId);
  return w ? w.questions.filter((q) => q && q.level === level) : [];
}

/** Cuántas preguntas tiene cada nivel de un mundo: { 1: n, 2: n, … }. */
function countLevelsForWorld(worldId) {
  const c = {};
  for (let L = 1; L <= GAME_CONFIG.levelsPerWorld; L++) c[L] = 0;
  const w = getWorldById(worldId);
  if (w) w.questions.forEach((q) => { if (q && q.level in c) c[q.level]++; });
  return c;
}

const ACHIEVEMENTS = [
  { id: "first_win", icon: "🏁", name: "Primera victoria", desc: "Completa tu primer nivel en Aventura." },
  { id: "streak5", icon: "🔥", name: "Racha x5", desc: "Consigue una racha de 5 aciertos." },
  { id: "streak10", icon: "⚡", name: "Racha x10", desc: "Consigue una racha de 10 aciertos." },
  { id: "no_hints", icon: "🧠", name: "Sin pistas", desc: "Completa un nivel de Aventura sin usar pistas." },
  { id: "all_worlds", icon: "🌍", name: "Trotamundos", desc: "Completa el nivel 1 de todos los mundos." },
  { id: "marathon", icon: "🏃", name: "Maratonista", desc: "Termina el modo Maratón." },
  { id: "boss_slayer", icon: "👹", name: "Cazador de jefes", desc: "Derrota un Desafío Boss." },
  { id: "all_bosses", icon: "👑", name: "Rey de jefes", desc: "Derrota el boss de cada mundo." },
  { id: "timer_ace", icon: "⏱️", name: "Contrarreloj", desc: "Gana una partida en modo Cronómetro." },
  { id: "support_hero", icon: "🎫", name: "Héroe de soporte", desc: "Completa el nivel 5 de Soporte IT." },
  { id: "level_master", icon: "⭐", name: "Maestro de niveles", desc: "Completa 25 niveles en total." },
  { id: "security_hero", icon: "🛡️", name: "Escudo digital", desc: "Completa el nivel 5 de Ciberseguridad." },
  { id: "hardware_hero", icon: "🔧", name: "Manitas de hardware", desc: "Completa el nivel 5 de Hardware." },
  { id: "cloud_hero", icon: "☁️", name: "Nómada cloud", desc: "Completa el nivel 5 de Cloud / servicios." },
  { id: "database_hero", icon: "🗄️", name: "DBA aprendiz", desc: "Completa el nivel 5 de Base de datos." },
  { id: "world_maestro", icon: "🏅", name: "Maestro de un mundo", desc: "Completa los 5 niveles de un mismo mundo." },
  { id: "all_levels", icon: "🌌", name: "Completista", desc: "Completa los 5 niveles de todos los mundos." }
];
