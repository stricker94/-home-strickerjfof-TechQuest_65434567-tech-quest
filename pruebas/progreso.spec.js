// Progreso: repaso espaciado, reto del día y racha, respaldo, reanudar tras recargar y almacenamiento raro.
const fs = require("fs");
const { test, expect, abrir, clic, tecla, preguntaActual, responder, jugarHastaElFinal, forzarPreguntas, idDeTipo, aventura, alMenu, recargar } = require("./ayudantes");

// Las fechas se fijan para probar «otro día» sin esperar (el reloj del navegador sigue corriendo)
const DIA = (d) => new Date(`2026-10-${String(d).padStart(2, "0")}T10:00:00`);

/** Falla una pregunta de opción múltiple en una partida de una sola pregunta y vuelve al menú. */
async function fallarUna(page) {
  const id = await idDeTipo(page, "mc", "q.options.length === 4");
  await forzarPreguntas(page, [id]);
  await aventura(page);
  await responder(page, false);
  await tecla(page, "Enter");
  await alMenu(page);
  return id;
}

async function repasarUna(page) {
  await clic(page, "#btn-review");
  await expect(page.locator("#hud-world")).toHaveText("🔁 Repaso de errores");
  await responder(page, true);
  const nota = await page.locator("#feedback-review").innerText();
  await tecla(page, "Enter");
  await alMenu(page);
  return nota;
}

test("repaso espaciado: hay que acertar en dos días distintos para que salga de tus errores", async ({ page }) => {
  await page.clock.setFixedTime(DIA(5));
  await abrir(page);
  await fallarUna(page);
  await expect(page.locator("#menu-review-count")).toHaveText("1");
  await expect(page.locator("#btn-review")).toBeEnabled();

  // Hoy: el acierto cuenta y la pregunta espera a mañana
  expect(await repasarUna(page)).toContain("Vuelve a salir otro día");
  await expect(page.locator("#menu-review-count")).toHaveText("0");
  await expect(page.locator("#menu-review-wait")).toHaveText(/1 en espera/);
  await expect(page.locator("#btn-review")).toBeEnabled();
  // Adelantarla el mismo día no cuenta dos veces
  expect(await repasarUna(page)).toContain("hoy ya la acertaste");
  await expect(page.locator("#menu-review-wait")).toHaveText(/1 en espera/);

  // Mañana: toca, y el segundo acierto la saca de la lista
  await page.clock.setFixedTime(DIA(6));
  await recargar(page);
  await expect(page.locator("#menu-review-count")).toHaveText("1");
  await expect(page.locator("#menu-review-wait")).toHaveText("");
  expect(await repasarUna(page)).toContain("la acertaste en dos días distintos");
  await expect(page.locator("#btn-review")).toBeDisabled();
});

test("fallar en el repaso reinicia la cuenta: vuelve a necesitar dos días", async ({ page }) => {
  await page.clock.setFixedTime(DIA(5));
  await abrir(page);
  await fallarUna(page);
  expect(await repasarUna(page)).toContain("Vuelve a salir otro día");
  await page.clock.setFixedTime(DIA(6));
  await recargar(page);
  await clic(page, "#btn-review");
  await responder(page, false);
  await expect(page.locator("#feedback-review")).toBeHidden();
  await tecla(page, "Enter");
  await alMenu(page);
  // Sigue pendiente y toca hoy otra vez
  await expect(page.locator("#menu-review-count")).toHaveText("1");
  expect(await repasarUna(page)).toContain("Vuelve a salir otro día");
});

test("el repaso trae como mucho 20 preguntas, primero las que tocan hoy", async ({ page }) => {
  await page.clock.setFixedTime(DIA(5));
  await abrir(page);
  // 25 fallos que tocan hoy y 5 que esperan a mañana
  await page.evaluate(() => {
    const ids = [];
    WORLDS.forEach((w) => w.questions.forEach((q) => ids.push(q.id)));
    const m = {};
    ids.slice(0, 25).forEach((id) => { m[id] = { miss: 1, hits: 0, last: "", due: "" }; });
    ids.slice(25, 30).forEach((id) => { m[id] = { miss: 1, hits: 1, last: "2026-10-05", due: "2026-10-06" }; });
    localStorage.setItem("techQuestMistakes", JSON.stringify(m));
  });
  await recargar(page);
  await expect(page.locator("#menu-review-count")).toHaveText("25");
  await expect(page.locator("#menu-review-wait")).toHaveText(/5 en espera/);
  await clic(page, "#btn-review");
  await expect(page.locator("#hud-progress")).toHaveText("1 / 20");
  const enEspera = await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem("techQuestMistakes"))).slice(25));
  const salen = await page.evaluate(() => {
    // Las ids de la partida (el orden de las preguntas no importa)
    const run = JSON.parse(sessionStorage.getItem("techQuestRun"));
    return run.ids;
  });
  expect(salen).toHaveLength(20);
  expect(salen.filter((id) => enEspera.includes(id))).toEqual([]);
});

test("reto del día: mismas preguntas todo el día, racha de días y se pierde si faltas un día", async ({ page }) => {
  await page.clock.setFixedTime(DIA(5));
  await abrir(page);
  await expect(page.locator("#daily-label")).toHaveText("");
  await expect(page.locator("#menu-streak-pill")).toBeHidden();
  await clic(page, "#btn-daily");
  await expect(page.locator("#hud-world")).toHaveText("📅 Reto del día");
  await expect(page.locator("#hud-progress")).toHaveText("1 / 10");
  await expect(page.locator("#hud-hints-wrap")).toBeHidden();
  const ids = await page.evaluate(() => Progress.getDaily().ids);
  expect(ids).toHaveLength(10);
  // Salir y volver a entrar el mismo día: el mismo reto
  await clic(page, '#screen-play [data-action="quit"]');
  await clic(page, "#btn-daily");
  expect(await page.evaluate(() => Progress.getDaily().ids)).toEqual(ids);
  expect(ids).toContain((await preguntaActual(page)).id);
  await jugarHastaElFinal(page, (n) => n !== 0);
  await expect(page.locator("#end-title")).toHaveText("¡Reto del día terminado!");
  await expect(page.locator("#end-unlock")).toHaveText("Reto de hoy completado · 🔥 1 día seguido. Vuelve mañana por otro.");
  await alMenu(page);
  await expect(page.locator("#daily-label")).toHaveText("✔ hecho");
  await expect(page.locator("#menu-streak-pill")).toBeVisible();
  await expect(page.locator("#menu-streak")).toHaveText("1");
  await expect(page.locator("#menu-streak-unit")).toHaveText("día seguido");
  // Repetirlo hoy es práctica: no suma
  await clic(page, "#btn-daily");
  await jugarHastaElFinal(page);
  await expect(page.locator("#end-unlock")).toHaveText("Ya habías completado el reto de hoy: esta vez fue práctica. Vuelve mañana por otro.");
  await alMenu(page);
  await expect(page.locator("#menu-streak")).toHaveText("1");

  // Mañana: reto nuevo y la racha sube a 2
  await page.clock.setFixedTime(DIA(6));
  await recargar(page);
  await expect(page.locator("#daily-label")).toHaveText("");
  await expect(page.locator("#menu-streak")).toHaveText("1");
  await clic(page, "#btn-daily");
  expect(await page.evaluate(() => Progress.getDaily().ids)).not.toEqual(ids);
  await jugarHastaElFinal(page);
  await alMenu(page);
  await expect(page.locator("#menu-streak")).toHaveText("2");
  await expect(page.locator("#menu-streak-unit")).toHaveText("días seguidos");

  // Falta un día entero: la racha vuelve a cero
  await page.clock.setFixedTime(DIA(8));
  await recargar(page);
  await expect(page.locator("#menu-streak-pill")).toBeHidden();
});

test("racha de 7 días da el logro «Constancia»", async ({ page }) => {
  await page.clock.setFixedTime(DIA(5));
  await abrir(page, "index.html", { techQuestDayStreak: { last: "2026-10-04", count: 6, best: 6 } });
  await expect(page.locator("#menu-streak")).toHaveText("6");
  await clic(page, "#btn-daily");
  await jugarHastaElFinal(page);
  await expect(page.locator("#end-unlock")).toContainText("🔥 7 días seguidos");
  expect(await page.evaluate(() => !!Progress.getAchievements().daily7)).toBe(true);
});

test("el reto del día incluye hasta 3 de tus errores pendientes", async ({ page }) => {
  await page.clock.setFixedTime(DIA(5));
  await abrir(page);
  const fallos = await page.evaluate(() => {
    const ids = WORLDS[3].questions.slice(0, 5).map((q) => q.id);
    const m = {};
    ids.forEach((id) => { m[id] = { miss: 1, hits: 0, last: "", due: "" }; });
    localStorage.setItem("techQuestMistakes", JSON.stringify(m));
    return ids;
  });
  await recargar(page);
  await clic(page, "#btn-daily");
  const ids = await page.evaluate(() => Progress.getDaily().ids);
  expect(ids.filter((id) => fallos.includes(id))).toHaveLength(3);
});

test("respaldo: descargar, reiniciar y cargar devuelve el progreso; cancelar o un archivo ajeno no cambian nada", async ({ page }, info) => {
  await abrir(page);
  await aventura(page);
  await jugarHastaElFinal(page);
  await alMenu(page);
  const record = await page.locator("#menu-highscore").innerText();
  expect(Number(record)).toBeGreaterThan(0);
  await clic(page, '#screen-menu [data-action="stats"]');

  const [descarga] = await Promise.all([page.waitForEvent("download"), clic(page, '[data-action="backup-download"]')]);
  expect(descarga.suggestedFilename()).toMatch(/^tech-quest-respaldo-\d{4}-\d{2}-\d{2}\.json$/);
  const archivo = info.outputPath("respaldo.json");
  await descarga.saveAs(archivo);
  const datos = JSON.parse(fs.readFileSync(archivo, "utf8"));
  expect(datos.app).toBe("Tech Quest");
  expect(Object.keys(datos.datos)).toEqual(expect.arrayContaining(["techQuestHighScore", "techQuestLevelClears", "techQuestLevelStars"]));
  expect(Object.keys(datos.datos)).not.toContain("techQuestMuted");

  await clic(page, '[data-action="reset-progress"]');
  await clic(page, '#screen-stats [data-action="menu"]');
  await expect(page.locator("#menu-highscore")).toHaveText("0");
  await expect(page.locator("#continue-label")).toHaveText("🐧 Linux básico · Nivel 1");

  // Un archivo que no es un respaldo se rechaza sin preguntar
  await clic(page, '#screen-menu [data-action="stats"]');
  page.dialogos.length = 0;
  await page.setInputFiles("#backup-file", { name: "otro.json", mimeType: "application/json", buffer: Buffer.from('{"hola": 1}') });
  await expect(page.locator("#tq-toast")).toHaveText("Ese archivo no es un respaldo de Tech Quest.");
  expect(page.dialogos).toEqual([]);
  // Cancelar la confirmación no carga nada
  page.respuesta = "cancelar";
  await page.setInputFiles("#backup-file", archivo);
  await expect.poll(() => page.dialogos.length).toBe(1);
  expect(page.dialogos[0]).toMatch(/^confirm: ¿Cargar el respaldo del .*\? Reemplaza todo el progreso de este navegador\.$/);
  // El mismo archivo otra vez (el campo se vacía tras cada carga para poder repetirla)
  page.respuesta = "aceptar";
  await page.setInputFiles("#backup-file", archivo);
  await expect(page.locator("#tq-toast")).toHaveText("Respaldo cargado.");
  await clic(page, '#screen-stats [data-action="menu"]');
  await expect(page.locator("#menu-highscore")).toHaveText(record);
  await expect(page.locator("#continue-label")).toHaveText("🐧 Linux básico · Nivel 2");
});

test("recargar a media partida: «Reanudar» sigue en la misma pregunta, con puntos y vidas", async ({ page }) => {
  await abrir(page);
  await aventura(page);
  await responder(page, true);
  await tecla(page, "Enter");
  await responder(page, false);
  await tecla(page, "Enter");
  const puntos = await page.locator("#hud-score").innerText();
  await expect(page.locator("#hud-progress")).toHaveText("3 / 10");
  await recargar(page);
  await expect(page.locator("#screen-menu")).toHaveClass(/active/);
  await expect(page.locator("#btn-resume")).toBeVisible();
  await expect(page.locator("#resume-label")).toHaveText("🐧 Linux básico · Nv.1 · pregunta 3 de 10");
  await expect(page.locator("#btn-continue")).not.toHaveClass(/btn-primary/);
  await clic(page, "#btn-resume");
  await expect(page.locator("#hud-progress")).toHaveText("3 / 10");
  await expect(page.locator("#hud-score")).toHaveText(puntos);
  await expect(page.locator("#hud-lives")).toHaveText("❤️❤️");

  // Recargar en el resultado: sigue con la pregunta siguiente
  await responder(page, true);
  await recargar(page);
  await expect(page.locator("#resume-label")).toHaveText(/pregunta 4 de 10$/);
  await clic(page, "#btn-resume");
  await expect(page.locator("#hud-progress")).toHaveText("4 / 10");
  await jugarHastaElFinal(page, () => true);
  await expect(page.locator("#end-summary")).toContainText("Aciertos: 9/10");
  await alMenu(page);
  await expect(page.locator("#btn-resume")).toBeHidden();
});

test("recargar en el resultado de la última pregunta: «Reanudar» muestra el final y guarda el nivel", async ({ page }) => {
  await abrir(page);
  await aventura(page);
  // Responde las 10 y se queda en el resultado de la última
  for (let n = 0; n < 10; n++) {
    await responder(page, true);
    if (n < 9) await tecla(page, "Enter");
  }
  await recargar(page);
  await expect(page.locator("#resume-label")).toHaveText(/pregunta 10 de 10$/);
  await clic(page, "#btn-resume");
  await expect(page.locator("#screen-end")).toHaveClass(/active/);
  await expect(page.locator("#end-summary")).toContainText("Aciertos: 10/10");
  expect(await page.evaluate(() => Progress.isLevelCleared("linux", 1))).toBe(true);
  expect(await page.evaluate(() => Progress.getLevelStars("linux", 1))).toBe(3);
});

test("salir al menú con «Salir» borra la partida guardada: no se ofrece reanudar", async ({ page }) => {
  await abrir(page);
  await aventura(page);
  await responder(page, true);
  await tecla(page, "Enter");
  await clic(page, '#screen-play [data-action="quit"]');
  await expect(page.locator("#btn-resume")).toBeHidden();
  await recargar(page);
  await expect(page.locator("#btn-resume")).toBeHidden();
});

test("reiniciar el progreso en otra pestaña: la partida empezada antes ya no guarda nada", async ({ page, context }) => {
  await abrir(page);
  await aventura(page);
  const otra = await context.newPage();
  otra.on("dialog", (d) => d.accept());
  await otra.goto("index.html");
  await otra.waitForFunction(() => window.techQuestReady === true);
  await otra.click('#screen-menu [data-action="stats"]');
  await otra.waitForTimeout(400);
  await otra.click('[data-action="reset-progress"]');
  await otra.close();
  await jugarHastaElFinal(page, () => true);
  await expect(page.locator("#end-unlock")).toHaveText("El progreso se reinició (o se cargó un respaldo) durante esta partida: este resultado no se guardó.");
  expect(await page.evaluate(() => Progress.isLevelCleared("linux", 1))).toBe(false);
});

test("datos guardados dañados: el juego arranca y se puede jugar", async ({ page }) => {
  await abrir(page, "index.html", {
    techQuestUnlocks: "{roto",
    techQuestMistakes: "[1,2,3]",
    techQuestStats: "null",
    techQuestLevelStars: '"texto"',
    techQuestDaily: "42",
    techQuestDayStreak: '{"count":"x","last":5}',
    techQuestTickets: "[]",
    techQuestLevelClears: '{"linux":5}',
    techQuestAchievements: '{"no_existe":1}',
    techQuestHighScore: "-50",
  });
  await expect(page.locator("#continue-label")).toHaveText("🐧 Linux básico · Nivel 1");
  await expect(page.locator("#menu-highscore")).toHaveText("0");
  await expect(page.locator("#menu-streak-pill")).toBeHidden();
  await expect(page.locator("#btn-review")).toBeDisabled();
  await clic(page, "#btn-daily");
  await jugarHastaElFinal(page);
  await alMenu(page);
  await clic(page, '#screen-menu [data-action="stats"]');
  await expect(page.locator("#screen-stats")).toHaveClass(/active/);
  await clic(page, '#screen-stats [data-action="menu"]');
  await aventura(page);
  await jugarHastaElFinal(page);
  await expect(page.locator("#end-unlock")).toHaveText("Desbloqueado: Nivel 2 de Linux básico");
});

test("sin almacenamiento (bloqueado por el navegador): se juega igual durante la visita", async ({ page }) => {
  await page.addInitScript(() => {
    for (const n of ["localStorage", "sessionStorage"]) {
      Object.defineProperty(window, n, { configurable: true, get() { throw new DOMException("bloqueado", "SecurityError"); } });
    }
  });
  await abrir(page);
  await aventura(page);
  await jugarHastaElFinal(page);
  await expect(page.locator("#end-unlock")).toHaveText("Desbloqueado: Nivel 2 de Linux básico");
  await alMenu(page);
  await expect(page.locator("#continue-label")).toHaveText("🐧 Linux básico · Nivel 2");
  await clic(page, "#btn-daily");
  await jugarHastaElFinal(page);
  await alMenu(page);
  await expect(page.locator("#daily-label")).toHaveText("✔ hecho");
});
