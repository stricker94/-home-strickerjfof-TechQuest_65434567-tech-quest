/**
 * Ayudantes de las pruebas del navegador: abrir el juego, responder bien o mal, jugar hasta el final…
 *
 * El juego ignora los clics y Enter que llegan menos de 350 ms después de cambiar de pantalla o de pregunta
 * (evita que un doble clic responda dos veces). clic() y tecla() esperan ese tiempo, como haría una persona.
 */
const base = require("@playwright/test");

const { expect } = base;

// Marca la hora de cada cambio de pantalla o de pregunta (para esperar la guardia anti doble clic)
const MARCAR_CAMBIOS = `(() => {
  window.__tqCambio = performance.now();
  const marcar = () => { window.__tqCambio = performance.now(); };
  const empezar = () => {
    marcar();
    new MutationObserver((cambios) => {
      for (const m of cambios) {
        const t = m.target;
        if (m.type === "attributes") {
          if (t.classList && t.classList.contains("screen") && t.classList.contains("active")) marcar();
        } else if (t.id === "question-text" || (t.parentNode && t.parentNode.id === "question-text")) marcar();
      }
    }).observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ["class"], childList: true, characterData: true });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", empezar); else empezar();
})();`;

/**
 * test con una página preparada: marca los cambios de pantalla, acepta los confirm() (salvo que la prueba
 * ponga page.respuesta = "cancelar") y falla si la página tuvo algún error de JavaScript.
 */
const test = base.test.extend({
  page: async ({ page }, use) => {
    const errores = [];
    page.on("pageerror", (e) => errores.push(e.message));
    page.respuesta = "aceptar";
    page.dialogos = [];
    page.on("dialog", (d) => {
      page.dialogos.push(d.type() + ": " + d.message());
      (page.respuesta === "aceptar" ? d.accept() : d.dismiss()).catch(() => {});
    });
    await page.addInitScript(MARCAR_CAMBIOS);
    await use(page);
    expect(errores, "errores de JavaScript en la página").toEqual([]);
  },
});

/** Abre el juego (con localStorage vacío, o con los valores dados antes de cargar). */
async function abrir(page, ruta = "index.html", guardado) {
  if (guardado) {
    await page.addInitScript((g) => {
      if (sessionStorage.getItem("__tqPreparado")) return;
      sessionStorage.setItem("__tqPreparado", "1");
      for (const k of Object.keys(g)) localStorage.setItem(k, typeof g[k] === "string" ? g[k] : JSON.stringify(g[k]));
    }, guardado);
  }
  await page.goto(ruta);
  await page.waitForFunction(() => window.techQuestReady === true);
}

async function esperarGuardia(page) {
  const falta = await page.evaluate(() => Math.max(0, 380 - (performance.now() - (window.__tqCambio || 0)))).catch(() => 0);
  if (falta > 0) await page.waitForTimeout(falta);
}

/** Clic como una persona (espera la guardia anti doble clic). */
async function clic(page, selector, opciones) {
  await esperarGuardia(page);
  await page.click(selector, opciones);
}

/** Pulsa una tecla como una persona (espera la guardia anti doble clic). */
async function tecla(page, key) {
  await esperarGuardia(page);
  await page.keyboard.press(key);
}

const pantalla = (page) => page.evaluate(() => document.querySelector(".screen.active").id);

/** La pregunta que se muestra, tal como está en los datos (con su respuesta). */
function preguntaActual(page) {
  return page.evaluate(() => {
    const texto = document.querySelector("#question-text").textContent;
    // En un ticket, el paso N del caso en pantalla (varios casos comparten enunciados como «¿cuál es la causa?»)
    if (!document.querySelector("#ticket-box").hidden) {
      const titulo = document.querySelector("#ticket-head").textContent.replace(/^🎫 Ticket: /, "");
      const paso = /Paso (\d+) de/.exec(document.querySelector("#question-type").textContent);
      const t = TICKETS.find((x) => x.title === titulo);
      return t && paso ? t.steps[paso[1] - 1] : null;
    }
    const todas = [];
    WORLDS.forEach((w) => w.questions.concat(w.boss || []).forEach((q) => todas.push(q)));
    return todas.find((q) => q.q === texto) || null;
  });
}

/** Responde la pregunta actual bien o mal, con el teclado o el ratón según el tipo. Devuelve la pregunta. */
async function responder(page, bien) {
  const q = await preguntaActual(page);
  if (!q) throw new Error("no encuentro la pregunta en pantalla");
  await esperarGuardia(page);
  if (["mc", "identify", "scenario"].includes(q.type)) {
    const textos = await page.$$eval("#options .option-btn .opt-text", (x) => x.map((e) => e.textContent));
    let i = textos.indexOf(String(q.options[q.answer]));
    if (!bien) i = (i + 1) % textos.length;
    await page.keyboard.press(String(i + 1));
  } else if (q.type === "tf") {
    await page.keyboard.press(q.answer === bien ? "v" : "f");
  } else if (q.type === "fill") {
    await page.fill("#fill-input", bien ? q.answer : "respuesta equivocada");
    await page.keyboard.press("Enter");
  } else if (q.type === "match") {
    const n = q.pairs.length;
    for (let i = 0; i < n; i++) {
      await clic(page, `[data-side="left"][data-i="${i}"]`);
      await clic(page, `[data-side="right"][data-i="${bien ? i : (i + 1) % n}"]`);
    }
    await page.keyboard.press("Enter");
  } else if (q.type === "order") {
    if (bien) {
      for (let destino = 0; destino < q.items.length; destino++) {
        for (let k = 0; k < q.items.length; k++) {
          const textos = await page.$$eval("#order-list .order-text", (x) => x.map((e) => e.textContent));
          const ahora = textos.indexOf(q.items[q.answer[destino]]);
          if (ahora === destino) break;
          await clic(page, `#order-list [data-dir="-1"][data-idx="${ahora}"]`);
        }
      }
    }
    // Sin mover nada, el orden nunca se muestra ya resuelto: queda mal
    await page.keyboard.press("Enter");
  }
  await expect(page.locator("#screen-feedback")).toHaveClass(/active/);
  return q;
}

/** Juega hasta la pantalla final; bien(n) dice si la pregunta n (desde 0) se responde bien. */
async function jugarHastaElFinal(page, bien = () => true) {
  for (let n = 0, vueltas = 0; vueltas < 200; vueltas++) {
    const s = await pantalla(page);
    if (s === "screen-end") return;
    if (s === "screen-feedback") await tecla(page, "Enter");
    else if (s === "screen-play") await responder(page, bien(n++));
    else throw new Error("pantalla inesperada: " + s);
  }
  throw new Error("la partida no terminó");
}

/** Sustituye las preguntas de un nivel por las de esos ids (para probar tipos concretos). */
async function forzarPreguntas(page, ids) {
  await page.evaluate((ids) => {
    const todas = {};
    WORLDS.forEach((w) => w.questions.concat(w.boss || []).forEach((q) => { todas[q.id] = q; }));
    window.getQuestionsForLevel = () => ids.map((id) => todas[id]);
  }, ids);
}

/** Primera pregunta del juego de ese tipo (y, opcionalmente, que cumpla una condición). */
function idDeTipo(page, tipo, condicion) {
  return page.evaluate(([tipo, cond]) => {
    const f = cond ? new Function("q", "return " + cond) : () => true;
    for (const w of WORLDS) for (const q of w.questions) if (q.type === tipo && f(q)) return q.id;
    return null;
  }, [tipo, condicion || null]);
}

const leer = (page, selector) => page.locator(selector).innerText();

/** Cuántas preguntas tiene un nivel (las pruebas no dan por hecho un número: se pueden añadir preguntas). */
const preguntasDelNivel = (page, mundo = "linux", nivel = 1) =>
  page.evaluate(([w, l]) => getQuestionsForLevel(w, l).length, [mundo, nivel]);

/** Desde el menú: Aventura → mundo → nivel. */
async function aventura(page, mundo = "linux", nivel = 1) {
  await clic(page, '#screen-menu [data-action="play"]');
  await clic(page, `[data-action="pick-world"][data-world="${mundo}"]`);
  await clic(page, `[data-action="pick-level"][data-level="${nivel}"]`);
}

/** Desde la pantalla final, vuelve al menú. */
const alMenu = (page) => clic(page, '#screen-end [data-action="menu"]');

/** Recarga la página y espera a que el juego arranque. */
async function recargar(page) {
  await page.reload();
  await page.waitForFunction(() => window.techQuestReady === true);
}

module.exports = { test, expect, abrir, clic, tecla, pantalla, preguntaActual, responder, jugarHastaElFinal, forzarPreguntas, idDeTipo, esperarGuardia, leer, preguntasDelNivel, aventura, alMenu, recargar };
