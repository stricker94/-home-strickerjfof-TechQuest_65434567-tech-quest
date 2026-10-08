#!/usr/bin/env node
/**
 * Tech Quest — Validador del juego
 *
 * Lee index.html, revisa que todos sus archivos de js/ estén bien escritos, carga los mundos (js/mundos/) y los
 * casos del Simulador de tickets (js/tickets.js) igual que el navegador y revisa que cada pregunta y cada paso
 * tengan un formato que el juego pueda calificar.
 * No modifica nada.
 *
 * Uso (desde la carpeta del juego):  node herramientas/validar-preguntas.js
 * Sale con código 1 si hay ERRORES; los AVISOS no bloquean.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const RAIZ = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, "..");
const TIPOS = ["mc", "identify", "scenario", "tf", "fill", "match", "order"];
// Campos que el juego lee en cada tipo; cualquier otro lo ignora sin aviso (p. ej. "acepta" en vez de "accept")
const CAMPOS_BASE = ["id", "level", "type", "q", "explain", "try"];
const CAMPOS = {
  mc: ["options", "answer"], identify: ["options", "answer"], scenario: ["options", "answer"],
  tf: ["answer"], fill: ["answer", "accept"], match: ["pairs"], order: ["items", "answer"],
};
const CAMPOS_MUNDO = ["id", "name", "icon", "color", "description", "questions", "boss"];
const CAMPOS_TICKET = ["id", "title", "icon", "level", "world", "ticket", "steps"];
const TICKETS_JS = "js/tickets.js";

const errores = [];
const avisos = [];

/** Termina mostrando un único error que impide seguir revisando. */
function fallo(msg) {
  console.log(`\nERRORES (1):\n  ${msg}`);
  process.exit(1);
}
const leer = (rel) => fs.readFileSync(path.join(RAIZ, rel), "utf8");
const lineaDe = (src, pos) => src.slice(0, pos).split("\n").length;
const escRe = (t) => t.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");

// ——— 1. Los archivos que carga index.html, en su orden ———
let html;
try {
  html = leer("index.html");
} catch (e) {
  fallo("no encuentro index.html. Ejecuta el validador dentro de la carpeta del juego (la que tiene index.html).");
}
const scripts = [];
for (const m of html.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi)) scripts.push(m[1]);
const esDatos = (rel) => rel === "js/data.js" || rel.startsWith("js/mundos/") || rel === TICKETS_JS;
const ARCHIVOS = scripts.filter(esDatos);
if (ARCHIVOS[0] !== "js/data.js") fallo('index.html debe cargar primero js/data.js y después los mundos (js/mundos/...).');
const fuentes = {};
for (const rel of scripts) {
  try {
    fuentes[rel] = leer(rel);
  } catch (e) {
    errores.push(`index.html carga ${rel}, pero ese archivo no existe (¿nombre mal escrito o archivo borrado?)`);
  }
}
// Un mundo nuevo en js/mundos/ que no está en index.html no llega al juego
let enCarpeta = [];
try { enCarpeta = fs.readdirSync(path.join(RAIZ, "js/mundos")).filter((f) => f.endsWith(".js")); } catch (e) {}
for (const f of enCarpeta) {
  if (!scripts.includes("js/mundos/" + f)) {
    errores.push(`js/mundos/${f} no está en index.html, así que el juego no lo carga: añade <script src="js/mundos/${f}"></script> junto a los demás mundos`);
  }
}
if (!scripts.includes(TICKETS_JS) && fs.existsSync(path.join(RAIZ, TICKETS_JS))) {
  errores.push(`${TICKETS_JS} no está en index.html, así que el juego no tiene tickets: añade <script src="${TICKETS_JS}"></script> después de los mundos`);
}
// Lo que no son datos (audio, progreso, pantallas, lógica) solo se revisa que esté bien escrito
for (const rel of scripts.filter((r) => !esDatos(r) && fuentes[r] != null)) {
  try {
    new vm.Script(fuentes[rel], { filename: rel });
  } catch (e) {
    const m = new RegExp(escRe(rel) + ":(\\d+)").exec(String(e.stack));
    errores.push(`${rel}${m ? ", línea " + m[1] : ""}: error de escritura (${e.message}); el navegador ignora todo el archivo y el juego no arranca`);
  }
}

// ——— La versión instalable (sw.js) guarda para jugar sin conexión todo lo que carga el juego ———
const existe = (rel) => fs.existsSync(path.join(RAIZ, rel));
if (existe("sw.js")) {
  const sw = leer("sw.js");
  let lista = null;
  try {
    const c = { self: { addEventListener() {}, location: { origin: "" } }, caches: {}, fetch() {}, Request: function () {}, Response: {} };
    vm.createContext(c);
    vm.runInContext(sw + "\n;this.__archivos = ARCHIVOS;", c, { filename: "sw.js" });
    lista = c.__archivos;
  } catch (e) {
    const m = /sw\.js:(\d+)/.exec(String(e.stack));
    errores.push(`sw.js${m ? ", línea " + m[1] : ""}: error de escritura (${e.message}); el juego instalado no funcionaría sin conexión`);
  }
  if (Array.isArray(lista)) {
    const necesarios = ["index.html"].concat(scripts);
    for (const m of html.matchAll(/<link\b[^>]*\bhref\s*=\s*["']([^"':]+)["'][^>]*>/gi)) necesarios.push(m[1]);
    if (existe("manifest.webmanifest")) {
      necesarios.push("manifest.webmanifest");
      try {
        const man = JSON.parse(leer("manifest.webmanifest"));
        (man.icons || []).forEach((i) => i && i.src && necesarios.push(i.src));
      } catch (e) {
        errores.push(`manifest.webmanifest: no es JSON válido (${e.message}); el juego no se podría instalar`);
      }
    }
    for (const f of new Set(necesarios)) {
      if (!lista.includes(f)) errores.push(`sw.js: falta "${f}" en ARCHIVOS; el juego instalado no lo tendría sin conexión`);
    }
    for (const f of lista) {
      if (f !== "./" && !existe(f)) errores.push(`sw.js: ARCHIVOS incluye "${f}", que no existe; la instalación sin conexión fallaría entera`);
    }
  }
}

// ——— 2. Cargar los datos como lo hace el navegador ———
const ctx = { console };
ctx.window = ctx;
vm.createContext(ctx);
// De qué archivo viene cada mundo (para señalar el archivo correcto ante un hueco o un null)
const archivoDe = Object.create(null);
// Listas tal como están escritas (addWorld descarta huecos y null para que el juego no se rompa; aquí se señalan)
const crudas = Object.create(null);
let llamadas = [];
// Casos de ticket tal como se escribieron (addTicket descarta los pasos vacíos y los casos sin pasos)
const casos = [];
let llamadasTicket = [];
// El archivo que se está ejecutando (addTicket se prepara al leer js/data.js, pero se llama desde js/tickets.js)
let archivoActual = null;
for (const rel of ARCHIVOS) {
  if (fuentes[rel] == null) continue;
  archivoActual = rel;
  ctx.document = { currentScript: { getAttribute: () => rel } };
  llamadas = [];
  llamadasTicket = [];
  try {
    vm.runInContext(fuentes[rel], ctx, { filename: rel });
  } catch (e) {
    // SyntaxError trae "archivo:línea" en la primera línea; los errores al ejecutar, en la pila
    const m = new RegExp(escRe(rel) + ":(\\d+)").exec(String(e.stack));
    const escritura = e instanceof SyntaxError || e.name === "SyntaxError" || e.name === "ReferenceError";
    fallo(
      escritura
        ? `${rel}${m ? ", línea " + m[1] : ""}: error de escritura (${e.message}).\n` +
          `  Revisa esa línea y el final de la anterior. Casi siempre es una coma que falta entre preguntas ("}," ),\n` +
          `  una coma de más, una comilla o un corchete sin cerrar, comillas tipográficas “ ” o True/False con mayúscula.\n` +
          `  Mientras exista este error, el navegador ignora TODO ${rel} (ese mundo no sale en el juego).`
        : `${rel}: el archivo se leyó, pero sus datos rompen el juego al cargarlos (${e.message}).`
    );
  }
  if (rel === "js/data.js") {
    if (typeof ctx.addWorld !== "function") fallo("js/data.js no define addWorld(); no se puede cargar ningún mundo.");
    // Se anota qué archivo registra cada mundo
    const registrar = ctx.addWorld;
    ctx.addWorld = function (w) {
      llamadas.push(w);
      if (w && typeof w === "object" && typeof w.id === "string" && !crudas[w.id]) crudas[w.id] = { questions: w.questions, boss: w.boss };
      return registrar(w);
    };
    if (typeof ctx.addTicket === "function") {
      const registrarTicket = ctx.addTicket;
      ctx.addTicket = function (t) {
        llamadasTicket.push(t);
        casos.push({ t, rel: archivoActual, pasos: t && typeof t === "object" ? t.steps : undefined });
        return registrarTicket(t);
      };
    } else if (ARCHIVOS.includes(TICKETS_JS)) fallo("js/data.js no define addTicket(); no se pueden cargar los tickets.");
    continue;
  }
  if (rel === TICKETS_JS) {
    if (!llamadasTicket.length) errores.push(`${rel}: no registra ningún caso; cada caso es addTicket({ id: "...", title: "...", steps: [ ... ] });`);
    if (llamadas.length) errores.push(`${rel}: aquí solo van casos de ticket (addTicket); los mundos van en js/mundos/`);
    continue;
  }
  if (llamadasTicket.length) errores.push(`${rel}: los casos de ticket (addTicket) van en ${TICKETS_JS}, no en un mundo`);
  if (!llamadas.length) {
    errores.push(`${rel}: no registra ningún mundo; el archivo debe ser addWorld({ id: "...", name: "...", questions: [ ... ] });`);
  }
  for (const w of llamadas) {
    const id = w && typeof w === "object" ? w.id : undefined;
    if (!id || typeof id !== "string") {
      errores.push(`${rel}: addWorld({...}) sin id (texto entre comillas); ese mundo no llega al juego`);
    } else if (archivoDe[id]) {
      errores.push(`${rel}: el mundo "${id}" ya lo registró ${archivoDe[id]}; el juego ignora este segundo. Cambia el id o junta las preguntas en un solo archivo`);
    } else {
      archivoDe[id] = rel;
      const extra = Object.keys(w).filter((k) => !CAMPOS_MUNDO.includes(k));
      if (extra.length) errores.push(`${rel}: campo que el juego no usa en el mundo: ${extra.join(", ")} (los válidos son ${CAMPOS_MUNDO.join(", ")}); lo que haya ahí no llega al juego`);
      if (!Array.isArray(crudas[id].questions)) errores.push(`${rel}: el mundo "${id}" necesita questions: [ ... ] con sus preguntas`);
      if (crudas[id].boss != null && !Array.isArray(crudas[id].boss)) errores.push(`${rel}: boss debe ser una lista [ ... ] de preguntas`);
      for (const k of ["name", "icon", "color", "description"]) {
        if (typeof w[k] !== "string" || !w[k].trim()) errores.push(`${rel}: al mundo "${id}" le falta ${k} (texto entre comillas)`);
      }
    }
  }
}
vm.runInContext("this.WORLDS = WORLDS; this.GAME_CONFIG = GAME_CONFIG; this.TICKETS = typeof TICKETS === 'undefined' ? [] : TICKETS;", ctx);
const WORLDS = ctx.WORLDS;
const TICKETS = ctx.TICKETS;
const maxNivel = ctx.GAME_CONFIG.levelsPerWorld || 5;

// ——— Casos del Simulador de tickets: sus datos; los pasos se revisan como preguntas (sección 3) ———
const txt = (v) => JSON.stringify(v);
// Todos los pasos de todos los casos, como si fueran un mundo más (con el caso de cada uno para los mensajes)
const grupoTickets = { id: "tickets", name: "Simulador de tickets", icon: "🎫", esTicket: true, archivo: TICKETS_JS, pasos: [], casoDe: [] };
const idsCaso = Object.create(null);
for (const { t, rel, pasos } of casos) {
  if (!t || typeof t !== "object") {
    errores.push(`${rel}: addTicket(...) necesita un caso entre llaves: { id: "...", title: "...", steps: [ ... ] }`);
    continue;
  }
  const nombre = typeof t.id === "string" && t.id ? t.id : "(sin id" + (typeof t.title === "string" ? ": " + txt(t.title) : "") + ")";
  const err = (m) => errores.push(`${rel}: caso ${nombre}: ${m}`);
  const aviso = (m) => avisos.push(`${rel}: caso ${nombre}: ${m}`);
  if (!t.id || typeof t.id !== "string") err("falta id (texto entre comillas); el caso no llega al juego");
  else if (idsCaso[t.id]) err("id repetido: otro caso ya lo usa y el juego ignora este");
  else idsCaso[t.id] = true;
  const extra = Object.keys(t).filter((k) => !CAMPOS_TICKET.includes(k));
  if (extra.length) aviso(`campo que el juego no usa: ${extra.join(", ")} (¿mal escrito? los válidos son ${CAMPOS_TICKET.join(", ")})`);
  for (const k of ["title", "ticket"]) {
    if (typeof t[k] !== "string" || !t[k].trim()) err(`falta ${k} (texto entre comillas)`);
  }
  if (t.icon != null && (typeof t.icon !== "string" || !t.icon.trim())) aviso("icon debe ser un emoji entre comillas");
  if (![1, 2, 3].includes(t.level)) aviso(`level debe ser 1 (fácil), 2 (medio) o 3 (difícil), sin comillas; vale ${txt(t.level)}`);
  if (t.world != null && !WORLDS.some((w) => w.id === t.world)) aviso(`world ${txt(t.world)} no es el id de ningún mundo (se usa para el color y el nombre del mundo)`);
  if (!Array.isArray(pasos) || !pasos.length) {
    err("necesita steps: [ ... ] con al menos un paso; sin pasos no sale en el juego");
    continue;
  }
  if (pasos.length < 3) aviso(`solo tiene ${pasos.length} paso(s); un caso se resuelve mejor en 4 o 5`);
  for (let i = 0; i < pasos.length; i++) {
    const k = grupoTickets.pasos.length++;
    if (i in pasos) grupoTickets.pasos[k] = pasos[i];
    grupoTickets.casoDe[k] = nombre;
  }
}

// ——— Preguntas escritas en los archivos que no llegan al juego ———
/**
 * Copia del código con los comentarios cambiados por espacios (respeta textos entre comillas y saltos de línea).
 * Si se pasa `dentro`, marca con 1 cada posición que está DENTRO de un texto entre comillas (no su comilla de apertura).
 */
function sinComentarios(src, dentro) {
  let out = "";
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (c === '"' || c === "'" || c === "`") {
      let j = i + 1;
      while (j < src.length && src[j] !== c && src[j] !== "\n") j += src[j] === "\\" ? 2 : 1;
      if (dentro) dentro.fill(1, i + 1, Math.min(j + 1, src.length));
      out += src.slice(i, j + 1);
      i = j;
    } else if (c === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") { out += " "; i++; }
      if (i < src.length) out += "\n";
    } else if (c === "/" && src[i + 1] === "*") {
      const fin = src.indexOf("*/", i + 2);
      const trozo = src.slice(i, fin < 0 ? src.length : fin + 2);
      out += trozo.replace(/[^\n]/g, " ");
      i += trozo.length - 1;
    } else out += c;
  }
  return out;
}
// Archivo guardado con otra codificación (ANSI/Windows-1252): cada acento o "¿" se lee como «\uFFFD» en el navegador
for (const rel of Object.keys(fuentes).concat("index.html")) {
  const lineas = [];
  (rel === "index.html" ? html : fuentes[rel]).split("\n").forEach((l, k) => { if (l.includes("\uFFFD")) lineas.push(k + 1); });
  if (lineas.length) {
    errores.push(`${rel}, línea${lineas.length > 1 ? "s" : ""} ${lineas.slice(0, 8).join(", ")}${lineas.length > 8 ? ", …" : ""}: hay caracteres ilegibles (\uFFFD); el archivo no está guardado en UTF-8 y el juego mostraría "¿Qu\uFFFD…". Guárdalo con codificación UTF-8 y vuelve a escribir esos acentos`);
  }
}
const enJuego = new Set();
WORLDS.forEach((w) => (w.questions || []).concat(w.boss || []).forEach((q) => q && q.id && enJuego.add(q.id)));
// Los casos (id, level, world… en la misma línea) también se parecen a una pregunta
TICKETS.forEach((t) => { enJuego.add(t.id); (t.steps || []).forEach((q) => q && q.id && enJuego.add(q.id)); });
for (const rel of ARCHIVOS.filter((r) => fuentes[r] != null)) {
  const dentro = new Uint8Array(fuentes[rel].length + 1);
  const limpio = sinComentarios(fuentes[rel], dentro);
  const perdidas = [];
  for (const m of limpio.matchAll(/["']?\bid["']?\s*:\s*["']([^"']+)["']\s*,\s*["']?(?:level|type)\b/g)) {
    // Un { id: '…', type: … } escrito dentro del enunciado o la explicación no es una pregunta
    if (dentro[m.index]) continue;
    if (!enJuego.has(m[1])) perdidas.push(m[1]);
  }
  if (perdidas.length) {
    errores.push(rel === TICKETS_JS
      ? `${rel}: ${perdidas.length} paso(s) no llegan al juego (${perdidas.slice(0, 8).join(", ")}${perdidas.length > 8 ? ", …" : ""}). Deben ir dentro de steps: [ ... ] de un caso con id único`
      : `${rel}: ${perdidas.length} pregunta(s) no llegan al juego (${perdidas.slice(0, 8).join(", ")}${perdidas.length > 8 ? ", …" : ""}). Deben ir dentro de questions: [ ... ] o boss: [ ... ] de un mundo con id único`);
  }
}

// ——— 3. Revisar cada pregunta ———
// Igual que el juego (game.js): sin espacios de más y en minúsculas; los acentos cuentan (en forma NFC)
const norm = (s) => String(s).normalize("NFC").trim().toLowerCase().replace(/\s+/g, " ");
/** Posición (desde 1) del primer elemento vacío de una lista (",," o null), o 0 si no hay. */
function hueco(lista) {
  for (let i = 0; i < lista.length; i++) {
    if (!(i in lista) || lista[i] == null || (typeof lista[i] === "string" && !lista[i].trim())) return i + 1;
  }
  return 0;
}
/** true si el juego puede mostrarlo como texto: una cadena con algo escrito o un número (no objeto, lista ni true/false). */
const esTexto = (v) => (typeof v === "string" && v.trim() !== "") || (typeof v === "number" && Number.isFinite(v));
/** Posición (desde 1) del primer elemento que no es un texto, o 0 si todos lo son. */
function noTexto(lista) {
  for (let i = 0; i < lista.length; i++) if (!(i in lista) || !esTexto(lista[i])) return i + 1;
  return 0;
}
const idsVistos = Object.create(null);
let total = 0;
let totalPasos = 0;

// Los pasos de los tickets se revisan igual que las preguntas, como un grupo más tras los mundos
for (const w of WORLDS.concat(casos.length ? [grupoTickets] : [])) {
  const porNivel = {};
  const textos = Object.create(null);
  const vf = { true: 0, false: 0 };
  let opcion = 0;
  let correctaMasLarga = 0;

  const cruda = w.esTicket ? { questions: w.pasos, boss: [] } : crudas[w.id] || w;
  const comoLista = (v) => (Array.isArray(v) ? v : []);
  for (const [lista, dondeEsta] of [[comoLista(cruda.questions), w.esTicket ? "paso" : "nivel"], [comoLista(cruda.boss), "boss"]]) {
    for (let i = 0; i < lista.length; i++) {
      const q = lista[i];
      const nombreLista = dondeEsta === "boss" ? "del Boss" : dondeEsta === "paso" ? "de pasos" : "de preguntas";
      // En los tickets, el caso al que pertenece el paso; en los mundos, el mundo
      const grupo = w.esTicket ? "caso " + w.casoDe[i] : w.id;
      if (!q || typeof q !== "object") {
        const rel = w.archivo || archivoDe[w.id];
        const archivo = rel ? rel + ", " : "";
        const previa = i > 0 && lista[i - 1] && lista[i - 1].id && (!w.esTicket || w.casoDe[i - 1] === w.casoDe[i])
          ? "después de " + lista[i - 1].id : i === 0 || w.esTicket ? "al inicio de la lista" : "después de otro hueco";
        errores.push(`${archivo}${grupo}: hay un hueco en la lista ${nombreLista}, ${previa} (¿dos comas seguidas ",,", o un null?). Borra la coma sobrante`);
        continue;
      }
      if (w.esTicket) totalPasos++;
      else total++;
      const donde = `${grupo} ${q.id ? q.id : "(sin id; enunciado " + txt(String(q.q || "").slice(0, 60)) + ")"}`;
      const err = (m) => errores.push(`${donde}: ${m}`);
      const aviso = (m) => avisos.push(`${donde}: ${m}`);

      if (!q.id) err("falta id");
      else if (typeof q.id !== "string") err(`el id debe ir entre comillas; vale ${txt(q.id)}`);
      else if (idsVistos[q.id]) err(`id repetido: otra pregunta de ${idsVistos[q.id]} ya usa ese id; cada id debe ser único`);
      else idsVistos[q.id] = w.id;
      if (!q.q || !String(q.q).trim()) err("falta el enunciado (q)");
      if (!q.explain) aviso("sin explicación (explain)");
      else if (/^\s*(\.{3}|…)\s*$/.test(q.explain)) aviso('explicación de relleno ("..."): escribe una o dos frases');
      else if (String(q.explain).trim().length < 50) aviso(`explicación muy corta (${String(q.explain).trim().length} caracteres): di en una o dos frases por qué esa es la respuesta`);
      if (q.try != null) {
        if (!esTexto(q.try)) err(`try («Pruébalo tú») debe ser un texto entre comillas; vale ${txt(q.try)}`);
        else if ((String(q.try).match(/`/g) || []).length % 2) aviso("try («Pruébalo tú») tiene un acento grave ` sin cerrar: el comando va entre dos `");
      }
      if (w.esTicket && q.reveal != null && !esTexto(q.reveal)) err(`reveal (lo que se descubre tras el paso) debe ser un texto entre comillas; vale ${txt(q.reveal)}`);
      // En un ticket el nivel de cada paso es opcional (el caso tiene el suyo)
      if (q.level == null && w.esTicket) {
        // nada
      } else if (q.level == null) {
        err(`falta level (el nivel, un número de 1 a ${maxNivel}); sin él la pregunta no sale en ningún nivel`);
      } else if (!(Number.isInteger(q.level) && q.level >= 1 && q.level <= maxNivel)) {
        err(`nivel inválido: ${txt(q.level)} (usa un número de 1 a ${maxNivel}${typeof q.level === "string" ? ", sin comillas" : ""})`);
      }
      if (dondeEsta === "nivel") {
        porNivel[q.level] = (porNivel[q.level] || 0) + 1;
        const clave = q.level + "|" + norm(q.q);
        if (textos[clave]) aviso(`mismo enunciado que ${textos[clave]} en el mismo nivel`);
        else textos[clave] = q.id;
      }

      switch (q.type) {
        case "mc":
        case "identify":
        case "scenario": {
          if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 4) {
            err("options debe ser una lista de 2 a 4 textos (el juego usa las teclas 1–4)");
            break;
          }
          const h = noTexto(q.options);
          if (h) {
            err(`la opción ${h} está vacía o no es un texto entre comillas (¿dos comas seguidas ",,", un null, { } o [ ]?); vale ${txt(q.options[h - 1])}`);
            break;
          }
          if (q.options.length < 3) aviso("solo 2 opciones: es un 50/50 y el juego no ofrece pista; mejor 4");
          if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length)) {
            err(`answer debe ser la posición (desde 0, sin comillas) de la opción correcta; vale ${txt(q.answer)}`);
          }
          if (new Set(q.options.map(norm)).size !== q.options.length) err("hay opciones repetidas");
          if (Number.isInteger(q.answer) && q.options[q.answer] != null) {
            opcion++;
            const c = String(q.options[q.answer]).length;
            const resto = Math.max(...q.options.filter((_, k) => k !== q.answer).map((o) => String(o).length));
            if (c > resto) {
              correctaMasLarga++;
              if (c > resto * 1.3) aviso(`la opción correcta es mucho más larga que las demás (${(c / resto).toFixed(1)}x): delata la respuesta`);
            }
          }
          break;
        }
        case "tf":
          if (typeof q.answer !== "boolean") err(`en V/F, answer debe ser true o false (sin comillas); vale ${txt(q.answer)}`);
          else vf[q.answer]++;
          break;
        case "fill": {
          if (typeof q.answer !== "string" || !q.answer.trim()) {
            err(`en completar, answer debe ser un texto entre comillas; vale ${txt(q.answer)}`);
            break;
          }
          if (q.accept != null) {
            const acepta = typeof q.accept === "string" ? q.accept.split("|") : q.accept;
            if (!Array.isArray(acepta)) err("accept debe ser una lista de textos");
            else if (noTexto(acepta)) err(`accept: el elemento ${noTexto(acepta)} está vacío o no es un texto (¿dos comas seguidas ",," o una lista dentro de otra?); vale ${txt(acepta[noTexto(acepta) - 1])}`);
            else if (!acepta.map(norm).includes(norm(q.answer))) err("accept no incluye la respuesta (answer)");
          }
          break;
        }
        case "match":
          if (!Array.isArray(q.pairs) || q.pairs.length < 3) {
            err("pairs debe tener al menos 3 parejas { left, right } (con 2, el juego siempre las muestra cruzadas y se adivinan)");
            break;
          }
          if (hueco(q.pairs) || q.pairs.some((p) => typeof p !== "object")) {
            err(`la pareja ${hueco(q.pairs) || 1 + q.pairs.findIndex((p) => typeof p !== "object")} está vacía o mal escrita (¿dos comas seguidas ",,"?)`);
          } else if (q.pairs.some((p) => !esTexto(p.left) || !esTexto(p.right))) {
            const k = q.pairs.findIndex((p) => !esTexto(p.left) || !esTexto(p.right));
            err(`la pareja ${k + 1} necesita left y right, cada uno con un solo texto entre comillas (sin listas de alternativas); vale ${txt(q.pairs[k])}`);
          } else {
            if (new Set(q.pairs.map((p) => norm(p.left))).size !== q.pairs.length) err("hay textos repetidos a la izquierda");
            if (new Set(q.pairs.map((p) => norm(p.right))).size !== q.pairs.length) err("hay textos repetidos a la derecha");
          }
          if (/^empareja:?$/i.test(String(q.q).trim())) aviso("enunciado genérico; di qué se empareja");
          break;
        case "order":
          if (!Array.isArray(q.items) || q.items.length < 3) err("items debe tener al menos 3 pasos (con 2, el juego siempre los muestra al revés y se adivinan)");
          else if (noTexto(q.items)) err(`el paso ${noTexto(q.items)} está vacío o no es un texto entre comillas (¿dos comas seguidas ",,", un null, { } o [ ]?); vale ${txt(q.items[noTexto(q.items) - 1])}`);
          else if (!Array.isArray(q.answer) || q.answer.length !== q.items.length || hueco(q.answer) ||
            !q.answer.every(Number.isInteger) || [...q.answer].sort((a, b) => a - b).some((v, k) => v !== k)) {
            err(`answer debe listar cada posición de items una vez, sin comillas y en el orden correcto (p. ej. [0, 1, 2, 3]); vale ${txt(q.answer)}`);
          } else if (new Set(q.items.map(norm)).size !== q.items.length) err("hay pasos repetidos");
          break;
        default:
          err(`tipo desconocido: ${txt(q.type)} (usa ${TIPOS.join(", ")}, sin espacios)`);
      }
      if (TIPOS.includes(q.type)) { // con tipo desconocido ya hay error; no se listan todos sus campos
        const base = w.esTicket ? CAMPOS_BASE.concat("reveal") : CAMPOS_BASE;
        const extra = Object.keys(q).filter((k) => !base.includes(k) && !CAMPOS[q.type].includes(k));
        if (extra.length) {
          const msg = `campo que el juego no usa en "${q.type}": ${extra.join(", ")} (¿mal escrito? los válidos son ${base.concat(CAMPOS[q.type]).join(", ")})`;
          // En completar sin "accept", las respuestas alternativas mal escritas se calificarían como Incorrecto
          if (q.type === "fill" && q.accept == null) err(msg + '; las respuestas alternativas van en "accept"');
          else aviso(msg);
        }
      }
    }
  }

  if (!w.esTicket) {
    for (let L = 1; L <= maxNivel; L++) {
      if (!porNivel[L]) errores.push(`${w.id}: el nivel ${L} no tiene preguntas`);
      else if (porNivel[L] < 5) avisos.push(`${w.id}: el nivel ${L} solo tiene ${porNivel[L]} preguntas`);
    }
    if (!(w.boss || []).length) {
      avisos.push(`${w.id}: sin preguntas de Boss (el mundo no aparece en el modo Boss)`);
    }
  }
  const nVF = vf.true + vf.false;
  if (nVF >= 4 && (vf.true / nVF > 0.75 || vf.false / nVF > 0.75)) {
    avisos.push(`${w.id}: V/F desbalanceadas (${vf.true} verdaderas, ${vf.false} falsas); pulsar siempre la misma tecla acertaría casi todas`);
  }
  if (opcion >= 8 && correctaMasLarga / opcion > 0.4) {
    avisos.push(`${w.id}: la opción correcta es la más larga en ${correctaMasLarga} de ${opcion} preguntas; elegir la más larga acertaría demasiado`);
  }
  if (w.esTicket) {
    console.log(`${w.icon} ${w.name.padEnd(22)} ${TICKETS.length} casos · ${totalPasos} pasos`);
    continue;
  }
  const nBoss = (w.boss || []).filter((q) => q && typeof q === "object").length;
  console.log(`${w.icon || ""} ${String(w.name).padEnd(22)} niveles ${JSON.stringify(porNivel)} · boss ${nBoss}`);
}

console.log(`\n${total} preguntas en ${WORLDS.length} mundos` + (casos.length ? ` y ${TICKETS.length} tickets (${totalPasos} pasos).` : "."));
if (avisos.length) console.log(`\nAVISOS (${avisos.length}):\n  ` + avisos.join("\n  "));
if (errores.length) {
  console.log(`\nERRORES (${errores.length}):\n  ` + errores.join("\n  "));
  // Sin process.exit(): con la salida en una tubería (| more) se cortaría pasados ~64 KB
  process.exitCode = 1;
} else {
  console.log("\nSin errores: el juego puede calificar todas las preguntas.");
}
