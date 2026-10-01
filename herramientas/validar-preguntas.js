#!/usr/bin/env node
/**
 * Tech Quest — Validador de preguntas
 *
 * Carga los archivos de datos igual que el navegador y revisa que cada pregunta
 * tenga un formato que el juego pueda calificar. No modifica nada.
 *
 * Uso (desde la carpeta del juego):  node herramientas/validar-preguntas.js
 * Sale con código 1 si hay ERRORES; los AVISOS no bloquean.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const RAIZ = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, "..");
const ARCHIVOS = ["js/data.js", "js/content-expand.js", "js/levels-expand.js", "js/levels5-expand.js"];
const TIPOS = ["mc", "identify", "scenario", "tf", "fill", "match", "order"];

const errores = [];
const avisos = [];

/** Termina mostrando un único error que impide seguir revisando. */
function fallo(msg) {
  console.log(`\nERRORES (1):\n  ${msg}`);
  process.exit(1);
}

// ——— 1. Cargar los archivos como lo hace el navegador ———
const fuentes = {};
const ctx = { console };
ctx.window = ctx;
vm.createContext(ctx);
for (const rel of ARCHIVOS) {
  try {
    fuentes[rel] = fs.readFileSync(path.join(RAIZ, rel), "utf8");
  } catch (e) {
    fallo(`no encuentro ${rel}. Ejecuta el validador dentro de la carpeta del juego (la que tiene index.html).`);
  }
  try {
    vm.runInContext(fuentes[rel], ctx, { filename: rel });
  } catch (e) {
    // SyntaxError trae "archivo:línea" en la primera línea; los errores al ejecutar, en la pila
    const m = new RegExp(rel.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + ":(\\d+)").exec(String(e.stack));
    const escritura = e instanceof SyntaxError || e.name === "SyntaxError" || e.name === "ReferenceError";
    fallo(
      escritura
        ? `${rel}${m ? ", línea " + m[1] : ""}: error de escritura (${e.message}).\n` +
          `  Revisa esa línea y el final de la anterior. Casi siempre es una coma que falta entre preguntas ("}," ),\n` +
          `  una coma de más, una comilla o un corchete sin cerrar, comillas tipográficas “ ” o True/False con mayúscula.\n` +
          `  Mientras exista este error, el navegador ignora TODO ${rel} (faltan mundos o niveles en el juego).`
        : `${rel}: el archivo se leyó, pero sus datos rompen el juego al cargarlos (${e.message}).\n` +
          `  Suele ser un null o un elemento vacío en una lista de preguntas. Mientras exista, el navegador ignora el resto de ${rel}.`
    );
  }
}
vm.runInContext("this.WORLDS = WORLDS; this.GAME_CONFIG = GAME_CONFIG;", ctx);
const WORLDS = ctx.WORLDS;
const maxNivel = ctx.GAME_CONFIG.levelsPerWorld || 5;
const idsMundos = WORLDS.map((w) => w.id);

// ——— 2. Preguntas escritas en los archivos que no llegan al juego ———
const lineaDe = (src, pos) => src.slice(0, pos).split("\n").length;
for (const rel of ARCHIVOS) {
  const src = fuentes[rel];
  // add("mundo", [...]) o setBoss("mundo", [...]) con un mundo que no existe: sus preguntas se pierden sin aviso
  for (const m of src.matchAll(/\b(add|setBoss)\(\s*["']([^"']*)["']/g)) {
    if (!idsMundos.includes(m[2])) {
      errores.push(`${rel}, línea ${lineaDe(src, m.index)}: no existe el mundo ${JSON.stringify(m[2])} en ${m[1]}(...); sus preguntas no llegan al juego. Mundos válidos: ${idsMundos.join(", ")}`);
    }
  }
}
const enJuego = new Set();
WORLDS.forEach((w) => (w.questions || []).concat(w.boss || []).forEach((q) => q && q.id && enJuego.add(q.id)));
for (const rel of ARCHIVOS) {
  const perdidas = [];
  for (const m of fuentes[rel].matchAll(/["']?\bid["']?\s*:\s*["']([^"']+)["']\s*,\s*["']?(?:level|type)\b/g)) {
    if (!enJuego.has(m[1])) perdidas.push(m[1]);
  }
  if (perdidas.length) {
    errores.push(`${rel}: ${perdidas.length} pregunta(s) no llegan al juego (${perdidas.slice(0, 8).join(", ")}${perdidas.length > 8 ? ", …" : ""}). Revisa el nombre del mundo en add("…") / setBoss("…") o el id de pushWorld`);
  }
}

// ——— 3. Revisar cada pregunta ———
// Igual que el juego (game.js): sin espacios de más y en minúsculas; los acentos cuentan
const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, " ");
const txt = (v) => JSON.stringify(v);
/** Posición (desde 1) del primer elemento vacío de una lista (",," o null), o 0 si no hay. */
function hueco(lista) {
  for (let i = 0; i < lista.length; i++) {
    if (!(i in lista) || lista[i] == null || (typeof lista[i] === "string" && !lista[i].trim())) return i + 1;
  }
  return 0;
}
const idsVistos = Object.create(null);
let total = 0;

for (const w of WORLDS) {
  const porNivel = {};
  const textos = Object.create(null);
  const vf = { true: 0, false: 0 };
  let opcion = 0;
  let correctaMasLarga = 0;

  for (const [lista, dondeEsta] of [[w.questions || [], "nivel"], [w.boss || [], "boss"]]) {
    for (let i = 0; i < lista.length; i++) {
      const q = lista[i];
      const nombreLista = dondeEsta === "boss" ? "del Boss" : "de preguntas";
      if (!q || typeof q !== "object") {
        const previa = i > 0 && lista[i - 1] && lista[i - 1].id ? "después de " + lista[i - 1].id : "cerca del inicio";
        errores.push(`${w.id}: hay un hueco en la lista ${nombreLista}, ${previa} (¿dos comas seguidas ",,"?). Borra la coma sobrante`);
        continue;
      }
      total++;
      const donde = `${w.id} ${q.id ? q.id : "(sin id; enunciado " + txt(String(q.q || "").slice(0, 60)) + ")"}`;
      const err = (m) => errores.push(`${donde}: ${m}`);
      const aviso = (m) => avisos.push(`${donde}: ${m}`);

      if (!q.id) err("falta id");
      else if (typeof q.id !== "string") err(`el id debe ir entre comillas; vale ${txt(q.id)}`);
      else if (idsVistos[q.id]) err(`id repetido: otra pregunta de ${idsVistos[q.id]} ya usa ese id; cada id debe ser único`);
      else idsVistos[q.id] = w.id;
      if (!q.q || !String(q.q).trim()) err("falta el enunciado (q)");
      if (!q.explain) aviso("sin explicación (explain)");
      else if (/^\s*(\.{3}|…)\s*$/.test(q.explain)) aviso('explicación de relleno ("..."): escribe una o dos frases');
      if (!(Number.isInteger(q.level) && q.level >= 1 && q.level <= maxNivel)) {
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
          const h = hueco(q.options);
          if (h) {
            err(`la opción ${h} está vacía (¿dos comas seguidas ",," o un null?)`);
            break;
          }
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
            else if (hueco(acepta)) err(`accept: el elemento ${hueco(acepta)} está vacío (¿dos comas seguidas ",,"?)`);
            else if (!acepta.map(norm).includes(norm(q.answer))) err("accept no incluye la respuesta (answer)");
          }
          break;
        }
        case "match":
          if (!Array.isArray(q.pairs) || q.pairs.length < 2) {
            err("pairs debe tener al menos 2 parejas { left, right }");
            break;
          }
          if (hueco(q.pairs) || q.pairs.some((p) => typeof p !== "object")) {
            err(`la pareja ${hueco(q.pairs) || 1 + q.pairs.findIndex((p) => typeof p !== "object")} está vacía o mal escrita (¿dos comas seguidas ",,"?)`);
          } else if (q.pairs.some((p) => !p.left || !p.right)) err("cada pareja necesita left y right");
          else {
            if (new Set(q.pairs.map((p) => norm(p.left))).size !== q.pairs.length) err("hay textos repetidos a la izquierda");
            if (new Set(q.pairs.map((p) => norm(p.right))).size !== q.pairs.length) err("hay textos repetidos a la derecha");
          }
          if (/^empareja:?$/i.test(String(q.q).trim())) aviso("enunciado genérico; di qué se empareja");
          break;
        case "order":
          if (!Array.isArray(q.items) || q.items.length < 2) err("items debe tener al menos 2 pasos");
          else if (hueco(q.items)) err(`el paso ${hueco(q.items)} está vacío (¿dos comas seguidas ",,"?)`);
          else if (!Array.isArray(q.answer) || q.answer.length !== q.items.length || hueco(q.answer) ||
            !q.answer.every(Number.isInteger) || [...q.answer].sort((a, b) => a - b).some((v, k) => v !== k)) {
            err(`answer debe listar cada posición de items una vez, sin comillas y en el orden correcto (p. ej. [0, 1, 2, 3]); vale ${txt(q.answer)}`);
          } else if (new Set(q.items.map(norm)).size !== q.items.length) err("hay pasos repetidos");
          break;
        default:
          err(`tipo desconocido: ${txt(q.type)} (usa ${TIPOS.join(", ")}, sin espacios)`);
      }
    }
  }

  for (let L = 1; L <= maxNivel; L++) {
    if (!porNivel[L]) errores.push(`${w.id}: el nivel ${L} no tiene preguntas`);
    else if (porNivel[L] < 5) avisos.push(`${w.id}: el nivel ${L} solo tiene ${porNivel[L]} preguntas`);
  }
  if (!(w.boss || []).length) {
    errores.push(`${w.id}: sin preguntas de Boss (el mundo no aparece en el modo Boss y el logro "Rey de jefes" sería imposible)`);
  }
  const nVF = vf.true + vf.false;
  if (nVF >= 4 && (vf.true / nVF > 0.75 || vf.false / nVF > 0.75)) {
    avisos.push(`${w.id}: V/F desbalanceadas (${vf.true} verdaderas, ${vf.false} falsas); pulsar siempre la misma tecla acertaría casi todas`);
  }
  if (opcion >= 8 && correctaMasLarga / opcion > 0.4) {
    avisos.push(`${w.id}: la opción correcta es la más larga en ${correctaMasLarga} de ${opcion} preguntas; elegir la más larga acertaría demasiado`);
  }
  const nBoss = (w.boss || []).filter((q) => q && typeof q === "object").length;
  console.log(`${w.icon || ""} ${String(w.name).padEnd(22)} niveles ${JSON.stringify(porNivel)} · boss ${nBoss}`);
}

console.log(`\n${total} preguntas en ${WORLDS.length} mundos.`);
if (avisos.length) console.log(`\nAVISOS (${avisos.length}):\n  ` + avisos.join("\n  "));
if (errores.length) {
  console.log(`\nERRORES (${errores.length}):\n  ` + errores.join("\n  "));
  process.exit(1);
}
console.log("\nSin errores: el juego puede calificar todas las preguntas.");
