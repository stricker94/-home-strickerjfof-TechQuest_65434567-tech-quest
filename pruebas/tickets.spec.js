// Simulador de tickets: cada caso se resuelve en orden, lo que descubres se va anotando y se guarda el mejor resultado.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { test, expect, abrir, clic, tecla, preguntaActual, responder, jugarHastaElFinal, alMenu, recargar } = require("./ayudantes");

// Los casos, leídos del archivo sin abrir el juego (para crear una prueba por caso)
const CASOS = [];
{
  const ctx = { addTicket: (t) => CASOS.push(t) };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "js", "tickets.js"), "utf8"), ctx);
}

async function abrirTicket(page, id) {
  await clic(page, '#screen-menu [data-action="tickets"]');
  await clic(page, `[data-action="pick-ticket"][data-ticket="${id}"]`);
}

for (const caso of CASOS) {
  test(`${caso.id} «${caso.title}»: los pasos salen en orden y se resuelve sin fallos`, async ({ page }) => {
    await abrir(page);
    await abrirTicket(page, caso.id);
    await expect(page.locator("#ticket-head")).toHaveText("🎫 Ticket: " + caso.title);
    await expect(page.locator("#ticket-text")).toHaveText(caso.ticket);
    await expect(page.locator("#hud-lives-wrap")).toBeHidden();
    for (let i = 0; i < caso.steps.length; i++) {
      const paso = caso.steps[i];
      await expect(page.locator("#question-type")).toContainText(`Paso ${i + 1} de ${caso.steps.length} · `);
      await expect(page.locator("#question-text")).toHaveText(paso.q);
      // Lo descubierto en los pasos anteriores sigue a la vista
      await expect(page.locator("#ticket-notes li")).toHaveCount(caso.steps.slice(0, i).filter((s) => s.reveal).length);
      await responder(page, true);
      if (paso.reveal) await expect(page.locator("#feedback-reveal")).toHaveText("📝 " + paso.reveal);
      else await expect(page.locator("#feedback-reveal")).toBeHidden();
      await tecla(page, "Enter");
    }
    await expect(page.locator("#end-title")).toHaveText("Ticket cerrado");
    await expect(page.locator("#end-unlock")).toHaveText(`Pasos bien: ${caso.steps.length} de ${caso.steps.length} · ¡caso resuelto sin fallos!`);
    await expect(page.locator("#btn-pick-again")).toHaveText("Elegir ticket");
    await clic(page, "#btn-pick-again");
    await expect(page.locator(`[data-ticket="${caso.id}"] .level-state`)).toHaveText("✔ Resuelto sin fallos");
  });
}

test("fallar un paso: se ve lo que descubriste igual, no va al repaso y se guarda el mejor intento", async ({ page }) => {
  const caso = CASOS[0];
  const n = caso.steps.length;
  await abrir(page);
  await abrirTicket(page, caso.id);
  await expect(page.locator(`#hud-hints-wrap`)).toBeHidden();
  await responder(page, false);
  await expect(page.locator("#feedback-title")).toHaveText("Incorrecto");
  if (caso.steps[0].reveal) await expect(page.locator("#feedback-reveal")).toHaveText("📝 " + caso.steps[0].reveal);
  await tecla(page, "Enter");
  await jugarHastaElFinal(page, () => true);
  await expect(page.locator("#end-unlock")).toHaveText(`Pasos bien: ${n - 1} de ${n}`);
  await expect(page.locator("#end-mistakes")).toBeVisible();
  await alMenu(page);
  await expect(page.locator("#btn-review")).toBeDisabled();
  await abrirTicket(page, caso.id);
  await jugarHastaElFinal(page, (k) => k > 1);
  await expect(page.locator("#end-unlock")).toHaveText(`Pasos bien: ${n - 2} de ${n} · tu mejor: ${n - 1} de ${n}`);
  await clic(page, "#btn-pick-again");
  await expect(page.locator(`[data-ticket="${caso.id}"] .level-state`)).toHaveText(`Mejor: ${n - 1}/${n} pasos bien`);
});

test("un ticket jugado con 0 pasos bien ya no dice «Sin intentar»", async ({ page }) => {
  const caso = CASOS[0];
  await abrir(page);
  await abrirTicket(page, caso.id);
  await jugarHastaElFinal(page, () => false);
  await expect(page.locator("#end-unlock")).toHaveText(`Pasos bien: 0 de ${caso.steps.length}`);
  await clic(page, "#btn-pick-again");
  await expect(page.locator(`[data-ticket="${caso.id}"] .level-state`)).toHaveText(`Mejor: 0/${caso.steps.length} pasos bien`);
  await expect(page.locator(`[data-ticket="${CASOS[1].id}"] .level-state`)).toHaveText("Sin intentar");
});

test("móvil 320×640: en cada paso la pregunta y la primera respuesta se ven sin desplazar, y el lector oye el caso", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  // El caso con más notas: el que más empuja la pregunta hacia abajo
  const caso = CASOS.slice().sort((a, b) => b.steps.map((s) => s.reveal || "").join("").length - a.steps.map((s) => s.reveal || "").join("").length)[0];
  await abrir(page);
  await abrirTicket(page, caso.id);
  for (let i = 0; i < caso.steps.length; i++) {
    await expect(page.locator("#question-text")).toHaveText(caso.steps[i].q);
    // El caso se lee con la pregunta al empezar; después, cada nota nueva se anuncia en el resultado
    if (i === 0) await expect(page.locator("#question-text")).toHaveAttribute("aria-describedby", "ticket-head ticket-text ticket-notes");
    else await expect(page.locator("#question-text")).not.toHaveAttribute("aria-describedby", /.+/);
    const r = await page.evaluate(() => ({
      pregunta: document.querySelector("#question-text").getBoundingClientRect().top,
      respuesta: document.querySelector("#challenge-area button, #challenge-area input").getBoundingClientRect().top,
      alto: window.innerHeight,
    }));
    expect(r.pregunta, `paso ${i + 1}`).toBeGreaterThanOrEqual(0);
    // En el paso 1 se empieza por leer el caso; desde el 2, lo anotado no debe tapar las respuestas
    if (i > 0) expect(r.respuesta, `paso ${i + 1}`).toBeLessThan(r.alto - 40);
    else expect(r.pregunta, "paso 1").toBeLessThan(r.alto);
    await responder(page, true);
    await tecla(page, "Enter");
  }
  // Fuera de los tickets la pregunta no lleva esa descripción
  await alMenu(page);
  await clic(page, '#screen-menu [data-action="play"]');
  await clic(page, '[data-action="pick-world"][data-world="linux"]');
  await clic(page, '[data-action="pick-level"][data-level="1"]');
  await expect(page.locator("#question-text")).not.toHaveAttribute("aria-describedby", /.+/);
});

test("recargar a mitad de un ticket: «Reanudar» sigue en el mismo paso con lo descubierto", async ({ page }) => {
  const caso = CASOS.find((c) => c.steps[0].reveal && c.steps[1].reveal);
  await abrir(page);
  await abrirTicket(page, caso.id);
  await responder(page, true);
  await tecla(page, "Enter");
  await responder(page, true);
  await tecla(page, "Enter");
  await recargar(page);
  await expect(page.locator("#resume-label")).toHaveText(`🎫 Ticket · ${caso.title} · pregunta 3 de ${caso.steps.length}`);
  await clic(page, "#btn-resume");
  await expect(page.locator("#question-type")).toContainText(`Paso 3 de ${caso.steps.length}`);
  expect((await preguntaActual(page)).id).toBe(caso.steps[2].id);
  await expect(page.locator("#ticket-notes li")).toHaveCount(2);
  await expect(page.locator("#ticket-notes li").first()).toHaveText("📝 " + caso.steps[0].reveal);
  // Al reanudar, el lector de pantalla vuelve a oír el caso con la pregunta
  await expect(page.locator("#question-text")).toHaveAttribute("aria-describedby", "ticket-head ticket-text ticket-notes");
});

test("5 tickets resueltos sin fallos dan el logro «Mesa de ayuda»", async ({ page }) => {
  const resueltos = Object.fromEntries(CASOS.slice(0, 4).map((c) => [c.id, c.steps.length]));
  await abrir(page, "index.html", { techQuestTickets: resueltos });
  await abrirTicket(page, CASOS[4].id);
  await jugarHastaElFinal(page, () => true);
  expect(await page.evaluate(() => !!Progress.getAchievements().tickets5)).toBe(true);
});
