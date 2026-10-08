// Partida: Aventura, estrellas, siguiente nivel, tu respuesta, pistas, teclado, reloj y salir.
const { test, expect, abrir, clic, tecla, pantalla, preguntaActual, responder, jugarHastaElFinal, forzarPreguntas, idDeTipo, esperarGuardia, leer, aventura } = require("./ayudantes");

test("menú nuevo: Continuar aventura lleva a Linux nivel 1", async ({ page }) => {
  await abrir(page);
  await expect(page.locator("#btn-continue")).toBeVisible();
  await expect(page.locator("#continue-label")).toHaveText("🐧 Linux básico · Nivel 1");
  await expect(page.locator("#btn-resume")).toBeHidden();
  await expect(page.locator("#btn-review")).toBeDisabled();
  await expect(page.locator("#menu-streak-pill")).toBeHidden();
  await clic(page, "#btn-continue");
  await expect(page.locator("#hud-world")).toHaveText("🐧 Linux básico · Nv.1");
});

test("ganar sin fallos: 3 estrellas, desbloqueo y «Siguiente nivel» juega el nivel 2", async ({ page }) => {
  await abrir(page);
  await aventura(page);
  await jugarHastaElFinal(page, () => true);
  await expect(page.locator("#end-summary")).toContainText("Estrellas: ★★★");
  await expect(page.locator("#end-unlock")).toHaveText("Desbloqueado: Nivel 2 de Linux básico");
  await expect(page.locator("#btn-next-level")).toHaveText("Siguiente nivel ▶ (Nivel 2)");
  await expect(page.locator("#btn-pick-again")).not.toHaveClass(/btn-primary/);
  await clic(page, "#btn-next-level");
  await expect(page.locator("#hud-world")).toHaveText("🐧 Linux básico · Nv.2");
  // El menú ya propone el nivel 2 y la tarjeta del nivel 1 muestra sus estrellas
  await clic(page, '[data-action="quit"]');
  await expect(page.locator("#continue-label")).toHaveText("🐧 Linux básico · Nivel 2");
  await clic(page, '#screen-menu [data-action="play"]');
  await clic(page, '[data-world="linux"]');
  await expect(page.locator('[data-level="1"] .stars')).toHaveAttribute("aria-label", "3 de 3 estrellas");
});

test("estrellas según aciertos: 1 fallo de 10 da ★★, 2 fallos dan ★ y se guarda la mejor", async ({ page }) => {
  await abrir(page);
  await aventura(page);
  await jugarHastaElFinal(page, (n) => n !== 0);
  await expect(page.locator("#end-summary")).toContainText("Estrellas: ★★☆");
  await clic(page, "#btn-retry");
  await jugarHastaElFinal(page, (n) => n > 1);
  await expect(page.locator("#end-summary")).toContainText("Estrellas: ★☆☆ · tu mejor: ★★☆");
  expect(await page.evaluate(() => Progress.getLevelStars("linux", 1))).toBe(2);
});

test("nivel 5 ganado: «Siguiente mundo» abre el nivel 1 del mundo siguiente", async ({ page }) => {
  const claro = { 1: 1, 2: 1, 3: 1, 4: 1 };
  await abrir(page, "index.html", { techQuestLevelClears: { linux: claro } });
  await aventura(page, "linux", 5);
  await jugarHastaElFinal(page, () => true);
  await expect(page.locator("#end-unlock")).toHaveText("Mundo desbloqueado: 🪟 Windows intermedio");
  await expect(page.locator("#btn-next-level")).toHaveText("Siguiente mundo ▶ 🪟 Windows intermedio");
  await clic(page, "#btn-next-level");
  await expect(page.locator("#hud-world")).toHaveText("🪟 Windows intermedio · Nv.1");
});

test("al fallar se ve tu respuesta junto a la correcta, y la lista final trae la explicación", async ({ page }) => {
  await abrir(page);
  const ids = [await idDeTipo(page, "mc"), await idDeTipo(page, "fill"), await idDeTipo(page, "tf")];
  await forzarPreguntas(page, ids);
  await clic(page, '#screen-menu [data-action="practice"]');
  await clic(page, '[data-world="linux"]');
  await clic(page, '[data-level="1"]');
  for (let i = 0; i < 3; i++) {
    const q = await responder(page, false);
    await expect(page.locator("#feedback-detail")).toContainText("Respuesta correcta: ");
    await expect(page.locator("#feedback-yours")).toBeVisible();
    const tuya = await leer(page, "#feedback-yours");
    if (q.type === "fill") expect(tuya).toBe("Tu respuesta: respuesta equivocada");
    if (q.type === "tf") expect(tuya).toBe("Tu respuesta: " + (q.answer ? "Falso" : "Verdadero"));
    if (q.type === "mc") expect(q.options).toContain(tuya.replace("Tu respuesta: ", ""));
    await tecla(page, "Enter");
  }
  await page.click("#end-mistakes summary");
  await expect(page.locator("#end-mistakes li")).toHaveCount(3);
  await expect(page.locator("#end-mistakes .mistake-yours").first()).toContainText("✘ Tu respuesta: ");
  await expect(page.locator("#end-mistakes .mistake-explain")).toHaveCount(3);
});

test("emparejar y ordenar mal: cada pareja y cada paso con ✔/✘ y dónde va", async ({ page }) => {
  await abrir(page);
  const match = await idDeTipo(page, "match", "q.pairs.length === 4");
  const order = await idDeTipo(page, "order", "q.items.length === 4");
  await forzarPreguntas(page, [match, order]);
  await clic(page, '#screen-menu [data-action="practice"]');
  await clic(page, '[data-world="linux"]');
  await clic(page, '[data-level="1"]');
  for (let i = 0; i < 2; i++) {
    const q = await responder(page, false);
    const filas = page.locator("#feedback-rows li");
    if (q.type === "match") {
      // Se emparejó cada concepto con la pareja del siguiente: las 4 mal, con su correcta
      await expect(filas).toHaveCount(4);
      await expect(page.locator("#feedback-rows .row-bad")).toHaveCount(4);
      await expect(filas.first()).toContainText(q.pairs[0].left + " → " + q.pairs[1].right);
      await expect(filas.first()).toContainText("(correcta: " + q.pairs[0].right + ")");
      await expect(page.locator("#feedback-detail")).not.toContainText("Respuesta correcta");
    } else {
      await expect(filas).toHaveCount(q.items.length);
      await expect(page.locator("#feedback-rows .row-bad").first()).toContainText("va en el paso");
      await expect(page.locator("#feedback-detail")).toContainText("Respuesta correcta: " + q.items.join(" → "));
    }
    await expect(page.locator("#feedback-yours")).toBeHidden();
    await tecla(page, "Enter");
  }
});

test("pistas: cuestan 30 al resolver, no hay en V/F y H no escribe en «completar»", async ({ page }) => {
  await abrir(page);
  const [mc, tf, fill] = [await idDeTipo(page, "mc", "q.options.length === 4"), await idDeTipo(page, "tf"), await idDeTipo(page, "fill", "q.answer.length > 4")];
  // La partida baraja sus preguntas: cada tipo se prueba en una partida de una sola pregunta
  // Opción múltiple: H elimina una incorrecta y se cobra al acertar
  await forzarPreguntas(page, [mc]);
  await aventura(page);
  await tecla(page, "h");
  await expect(page.locator("#hint-box")).toContainText("Pista: elimina «");
  await expect(page.locator("#options .option-btn.eliminated")).toHaveCount(1);
  await responder(page, true);
  await expect(page.locator("#feedback-detail")).toHaveText("+70 pts (pista −30)");
  await tecla(page, "Enter");
  await clic(page, '#screen-end [data-action="menu"]');
  // V/F: sin pista
  await forzarPreguntas(page, [tf]);
  await aventura(page);
  await expect(page.locator("#btn-hint")).toBeDisabled();
  await tecla(page, "h");
  await expect(page.locator("#hint-box")).toBeHidden();
  await expect(page.locator("#hud-hints")).toHaveText("2");
  await responder(page, true);
  await tecla(page, "Enter");
  await clic(page, '#screen-end [data-action="menu"]');
  // Completar: la H dentro del campo es una letra, no una pista
  await forzarPreguntas(page, [fill]);
  await aventura(page);
  await page.click("#fill-input");
  await page.keyboard.type("hhm");
  await expect(page.locator("#fill-input")).toHaveValue("hhm");
  await expect(page.locator("#hint-box")).toBeHidden();
  await clic(page, "#btn-hint");
  await expect(page.locator("#hint-box")).toContainText("Pista: empieza con «");
  await expect(page.locator("#fill-input")).toBeFocused();
});

test("teclado: 1–4 responde, Enter continúa y mantener Enter no salta el resultado", async ({ page }) => {
  await abrir(page);
  const mc = await idDeTipo(page, "mc");
  await forzarPreguntas(page, [mc, mc]);
  await aventura(page);
  await responder(page, true);
  // Enter mantenido (repetición) en el resultado no avanza
  await page.keyboard.down("Enter");
  await page.waitForTimeout(150);
  await page.keyboard.up("Enter");
  expect(await pantalla(page)).toBe("screen-feedback");
  await tecla(page, "Enter");
  expect(await pantalla(page)).toBe("screen-play");
  await expect(page.locator("#hud-progress")).toHaveText("2 / 2");
});

test("doble clic en una opción no se salta el resultado", async ({ page }) => {
  await abrir(page);
  const mc = await idDeTipo(page, "mc");
  await forzarPreguntas(page, [mc, mc, mc]);
  await aventura(page);
  await page.waitForTimeout(400);
  await page.dblclick("#options .option-btn >> nth=0");
  await page.waitForTimeout(100);
  expect(await pantalla(page)).toBe("screen-feedback");
  // Doble clic en Continuar: la pregunta nueva no se responde sola
  await page.waitForTimeout(400);
  await page.dblclick("#btn-next-feedback");
  await page.waitForTimeout(100);
  expect(await pantalla(page)).toBe("screen-play");
  await expect(page.locator("#options .option-btn.correct, #options .option-btn.wrong")).toHaveCount(0);
});

test("Cronómetro: al acabarse el tiempo dice que no respondiste y quita una vida", async ({ page }) => {
  await abrir(page);
  await page.evaluate(() => { GAME_CONFIG.timerSeconds = 2; });
  await clic(page, '#screen-menu [data-action="timer"]');
  await clic(page, '[data-world="linux"]');
  await clic(page, '[data-level="1"]');
  await expect(page.locator("#feedback-title")).toHaveText("¡Tiempo agotado!", { timeout: 6000 });
  // Las teclas justo después del tiempo agotado se ignoran (el jugador quizá seguía escribiendo).
  // Se pulsa enseguida, antes de las demás comprobaciones: el margen es de 1 segundo
  await page.keyboard.press("Enter");
  expect(await pantalla(page)).toBe("screen-feedback");
  await expect(page.locator("#feedback-detail")).toContainText("Vidas: 2");
  const tipo = await page.evaluate(() => document.querySelector("#question-type").textContent);
  if (!/Emparejar|Ordenar/.test(tipo)) await expect(page.locator("#feedback-yours")).toHaveText("Tu respuesta: no respondiste a tiempo");
});

test("Esc y Atrás piden confirmar; Cancelar sigue jugando y Aceptar vuelve al menú", async ({ page }) => {
  await abrir(page);
  await aventura(page);
  page.respuesta = "cancelar";
  await tecla(page, "Escape");
  expect(await pantalla(page)).toBe("screen-play");
  await page.evaluate(() => history.back());
  await page.waitForTimeout(300);
  expect(await pantalla(page)).toBe("screen-play");
  expect(page.dialogos.length).toBe(2);
  page.respuesta = "aceptar";
  await page.evaluate(() => history.back());
  await page.waitForTimeout(300);
  expect(await pantalla(page)).toBe("screen-menu");
});

test("mundos y niveles bloqueados dicen cómo se abren y se pueden enfocar", async ({ page }) => {
  await abrir(page);
  await clic(page, '#screen-menu [data-action="play"]');
  const windows = page.locator(".world-card.locked").first();
  await expect(windows).toContainText("Se abre al completar el Nivel 5 de Linux básico");
  await expect(windows).toHaveAttribute("aria-disabled", "true");
  await expect(windows).not.toHaveAttribute("disabled", /.*/);
  await esperarGuardia(page);
  await windows.click({ force: true });
  await expect(page.locator("#tq-toast")).toContainText("Se abre al completar el Nivel 5 de Linux básico");
  await clic(page, '[data-world="linux"]');
  await expect(page.locator('#level-grid [data-why]').first()).toContainText("Se abre al completar el Nivel 1");
});

test("M silencia y lo anuncia; el botón dice su estado", async ({ page }) => {
  await abrir(page);
  await page.keyboard.press("m");
  await expect(page.locator("#btn-mute")).toHaveAttribute("aria-pressed", "false");
  await page.keyboard.press("m");
  await expect(page.locator("#btn-mute")).toHaveAttribute("aria-pressed", "true");
});

test("el Boss exige el mundo desbloqueado", async ({ page }) => {
  await abrir(page);
  await clic(page, '#screen-menu [data-action="boss"]');
  await expect(page.locator('#world-grid [data-world="linux"]')).toBeVisible();
  await expect(page.locator("#world-grid .world-card.locked").first()).toContainText("Se abre al completar");
});

test("pantalla de 320 px: sin desbordes horizontales en partida y resultado", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await abrir(page);
  const order = await idDeTipo(page, "order");
  await forzarPreguntas(page, [order]);
  await aventura(page);
  const ancho = () => page.evaluate(() => document.documentElement.scrollWidth);
  expect(await ancho()).toBeLessThanOrEqual(320);
  await responder(page, false);
  expect(await ancho()).toBeLessThanOrEqual(320);
});

test("«Pruébalo tú» sale tras responder, con el comando como código", async ({ page }) => {
  await abrir(page);
  const id = await idDeTipo(page, "mc", "q.try && q.try.includes('`')");
  expect(id, "alguna pregunta de opción múltiple con «Pruébalo tú»").toBeTruthy();
  await forzarPreguntas(page, [id]);
  await aventura(page);
  await expect(page.locator("#feedback-try")).toBeHidden();
  await responder(page, false);
  await expect(page.locator("#feedback-try")).toBeVisible();
  await expect(page.locator("#feedback-try")).toContainText("Pruébalo tú");
  await expect(page.locator("#feedback-try code").first()).not.toBeEmpty();
  await expect(page.locator("#feedback-try")).not.toContainText("`");
});
