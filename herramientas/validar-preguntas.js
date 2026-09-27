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

const RAIZ = path.join(__dirname, "..");
const ARCHIVOS = ["js/data.js", "js/content-expand.js", "js/levels-expand.js", "js/levels5-expand.js"];
const TIPOS_OPCION = ["mc", "identify", "scenario"];

const ctx = { console };
ctx.window = ctx;
vm.createContext(ctx);
for (const rel of ARCHIVOS) {
  const codigo = fs.readFileSync(path.join(RAIZ, rel), "utf8");
  vm.runInContext(codigo + "\n;this.WORLDS = WORLDS; this.GAME_CONFIG = GAME_CONFIG;", ctx, { filename: rel });
}

// Igual que el juego (game.js): sin espacios de más y en minúsculas; los acentos cuentan
const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, " ");
const errores = [];
const avisos = [];
const idsVistos = {};
const maxNivel = ctx.GAME_CONFIG.levelsPerWorld || 5;
let total = 0;

for (const w of ctx.WORLDS) {
  const preguntas = w.questions.map((q) => [q, "nivel"]).concat((w.boss || []).map((q) => [q, "boss"]));
  const porNivel = {};
  const textos = {};
  let vf = { true: 0, false: 0 };
  let opcion = 0;
  let correctaMasLarga = 0;

  for (const [q, dondeEsta] of preguntas) {
    total++;
    const donde = `${w.id} ${q.id || "(sin id)"}`;
    const err = (m) => errores.push(`${donde}: ${m}`);
    const aviso = (m) => avisos.push(`${donde}: ${m}`);

    if (!q.id) err("falta id");
    else if (idsVistos[q.id]) err(`id repetido (también en ${idsVistos[q.id]})`);
    else idsVistos[q.id] = w.id;
    if (!q.q || !String(q.q).trim()) err("falta el enunciado (q)");
    if (!q.explain) aviso("sin explicación (explain)");
    if (!(Number.isInteger(q.level) && q.level >= 1 && q.level <= maxNivel)) err(`nivel inválido: ${q.level} (usa 1 a ${maxNivel})`);
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
        if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length)) err(`answer debe ser el índice (desde 0) de la opción correcta; vale ${q.answer}`);
        if (new Set(q.options.map(norm)).size !== q.options.length) err("hay opciones repetidas");
        if (Number.isInteger(q.answer) && q.options[q.answer] != null) {
          opcion++;
          const c = q.options[q.answer].length;
          const resto = Math.max(...q.options.filter((_, i) => i !== q.answer).map((o) => o.length));
          if (c > resto) {
            correctaMasLarga++;
            if (c > resto * 1.3) aviso(`la opción correcta es mucho más larga que las demás (${(c / resto).toFixed(1)}x): delata la respuesta`);
          }
        }
        break;
      }
      case "tf":
        if (typeof q.answer !== "boolean") err("en V/F, answer debe ser true o false (sin comillas)");
        else vf[q.answer]++;
        break;
      case "fill": {
        if (typeof q.answer !== "string" || !q.answer.trim()) {
          err("en completar, answer debe ser un texto");
          break;
        }
        if (q.accept != null) {
          const lista = typeof q.accept === "string" ? q.accept.split("|") : q.accept;
          if (!Array.isArray(lista)) err("accept debe ser una lista de textos");
          else if (!lista.map(norm).includes(norm(q.answer))) err("accept no incluye la respuesta (answer)");
        }
        break;
      }
      case "match":
        if (!Array.isArray(q.pairs) || q.pairs.length < 2) {
          err("pairs debe tener al menos 2 parejas {left, right}");
          break;
        }
        if (q.pairs.some((p) => !p || !p.left || !p.right)) err("cada pareja necesita left y right");
        else {
          if (new Set(q.pairs.map((p) => norm(p.left))).size !== q.pairs.length) err("hay textos repetidos a la izquierda");
          if (new Set(q.pairs.map((p) => norm(p.right))).size !== q.pairs.length) err("hay textos repetidos a la derecha");
        }
        if (/^empareja:?$/i.test(String(q.q).trim())) aviso("enunciado genérico; di qué se empareja");
        break;
      case "order":
        if (!Array.isArray(q.items) || q.items.length < 2) err("items debe tener al menos 2 pasos");
        else if (!Array.isArray(q.answer) || q.answer.length !== q.items.length ||
          [...q.answer].sort((a, b) => a - b).some((v, i) => v !== i)) {
          err("answer debe listar cada índice de items una vez, en el orden correcto (p. ej. [0,1,2,3])");
        } else if (new Set(q.items.map(norm)).size !== q.items.length) err("hay pasos repetidos");
        break;
      default:
        err(`tipo desconocido: ${q.type} (usa mc, identify, scenario, tf, fill, match u order)`);
    }
  }

  for (let L = 1; L <= maxNivel; L++) {
    if (!porNivel[L]) errores.push(`${w.id}: el nivel ${L} no tiene preguntas`);
    else if (porNivel[L] < 5) avisos.push(`${w.id}: el nivel ${L} solo tiene ${porNivel[L]} preguntas`);
  }
  if (!(w.boss || []).length) avisos.push(`${w.id}: sin preguntas de Boss`);
  const nVF = vf.true + vf.false;
  if (nVF >= 4 && (vf.true / nVF > 0.75 || vf.false / nVF > 0.75)) {
    avisos.push(`${w.id}: V/F desbalanceadas (${vf.true} verdaderas, ${vf.false} falsas); pulsar siempre la misma tecla acertaría casi todas`);
  }
  if (opcion >= 8 && correctaMasLarga / opcion > 0.4) {
    avisos.push(`${w.id}: la opción correcta es la más larga en ${correctaMasLarga} de ${opcion} preguntas; elegir la más larga acertaría demasiado`);
  }
  console.log(`${w.icon || ""} ${w.name.padEnd(22)} niveles ${JSON.stringify(porNivel)} · boss ${(w.boss || []).length}`);
}

console.log(`\n${total} preguntas en ${ctx.WORLDS.length} mundos.`);
if (avisos.length) console.log(`\nAVISOS (${avisos.length}):\n  ` + avisos.join("\n  "));
if (errores.length) {
  console.log(`\nERRORES (${errores.length}):\n  ` + errores.join("\n  "));
  process.exit(1);
}
console.log("\nSin errores: el juego puede calificar todas las preguntas.");
