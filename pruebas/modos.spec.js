// Modos: Maratón (Mi nivel / Todo), Práctica, modo de prueba (?pregunta=) y Simulador de tickets.
const { test, expect, abrir, clic, tecla, preguntaActual, responder, jugarHastaElFinal, aventura, alMenu, recargar } = require("./ayudantes");

const idsDeLaPartida = (page) => page.evaluate(() => JSON.parse(sessionStorage.getItem("techQuestRun")).ids);

test("Maratón «Mi nivel» solo trae preguntas de los niveles que ya abriste", async ({ page }) => {
  await abrir(page);
  await clic(page, '#screen-menu [data-action="marathon"]');
  await expect(page.locator("#marathon-mine-count")).toHaveText("10 de 10 preguntas");
  await expect(page.locator("#marathon-all-count")).toHaveText(/^20 de \d+ preguntas$/);
  await clic(page, '[data-action="marathon-mine"]');
  await expect(page.locator("#hud-world")).toHaveText("🏃 Maratón · Mi nivel");
  await expect(page.locator("#hud-progress")).toHaveText("1 / 10");
  const ids = await idsDeLaPartida(page);
  const permitidas = await page.evaluate(() => getWorldById("linux").questions.filter((q) => q.level === 1).map((q) => q.id));
  expect(ids.every((id) => permitidas.includes(id))).toBe(true);
  await jugarHastaElFinal(page);
  await expect(page.locator("#end-title")).toHaveText("¡Maratón terminada!");
  await expect(page.locator("#end-summary")).toContainText("Maratón mixta · Mi nivel");
});

test("Maratón «Todo» mezcla 20 preguntas de cualquier mundo, sin las del Boss", async ({ page }) => {
  await abrir(page);
  await clic(page, '#screen-menu [data-action="marathon"]');
  await clic(page, '[data-action="marathon-all"]');
  await expect(page.locator("#hud-world")).toHaveText("🏃 Maratón · Todo");
  await expect(page.locator("#hud-progress")).toHaveText("1 / 20");
  await expect(page.locator("#hud-lives")).toHaveText("❤️❤️❤️");
  const ids = await idsDeLaPartida(page);
  const boss = await page.evaluate(() => WORLDS.flatMap((w) => (w.boss || []).map((q) => q.id)));
  expect(ids).toHaveLength(20);
  expect(ids.filter((id) => boss.includes(id))).toEqual([]);
});

test("Práctica: sin vidas ni pistas y cualquier mundo; no desbloquea niveles", async ({ page }) => {
  await abrir(page);
  await clic(page, '#screen-menu [data-action="practice"]');
  await clic(page, '[data-action="pick-world"][data-world="cloud"]');
  await clic(page, '[data-action="pick-level"][data-level="3"]');
  await expect(page.locator("#hud-world")).toHaveText("📚 Práctica · Cloud / servicios");
  await expect(page.locator("#hud-lives-wrap")).toBeHidden();
  await expect(page.locator("#hud-hints-wrap")).toBeHidden();
  await expect(page.locator("#btn-hint")).toBeHidden();
  await jugarHastaElFinal(page, () => false);
  await expect(page.locator("#end-title")).toHaveText("¡Completado!");
  expect(await page.evaluate(() => Progress.isLevelCleared("cloud", 3))).toBe(false);
  // Los fallos de Práctica sí van al repaso
  await alMenu(page);
  await expect(page.locator("#btn-review")).toBeEnabled();
});

test("modo de prueba: ?pregunta=id abre esa pregunta con su id, con pista y sin guardar nada", async ({ page }) => {
  await abrir(page, "index.html?pregunta=lx01");
  await expect(page.locator("#screen-play")).toHaveClass(/active/);
  await expect(page.locator("#hud-world")).toHaveText("🧪 Modo de prueba");
  await expect(page.locator("#question-type")).toContainText("lx01");
  await expect(page.locator("#hud-lives-wrap")).toBeHidden();
  await expect(page.locator("#btn-hint")).toBeVisible();
  const antes = await page.evaluate(() => Object.keys(localStorage).filter((k) => k !== "techQuestSaveId").sort());
  await responder(page, false);
  await tecla(page, "Enter");
  await expect(page.locator("#end-title")).toHaveText("Prueba terminada");
  await expect(page.locator("#end-unlock")).toHaveText(/^Modo de prueba: no se guardó nada/);
  await expect(page.locator("#end-summary")).not.toContainText("Puntuación");
  const despues = await page.evaluate(() => Object.keys(localStorage).filter((k) => k !== "techQuestSaveId").sort());
  expect(despues).toEqual(antes);
  expect(await page.evaluate(() => Object.keys(Progress.getMistakes()))).toEqual([]);
});

test("modo de prueba en la misma pestaña que una partida a medias: no la borra y recargar no pregunta nada", async ({ page }) => {
  await abrir(page);
  await aventura(page);
  await responder(page, true);
  await tecla(page, "Enter");
  await page.goto("index.html?pregunta=lx01");
  await page.waitForFunction(() => window.techQuestReady === true);
  await expect(page.locator("#hud-world")).toHaveText("🧪 Modo de prueba");
  page.dialogos.length = 0;
  await recargar(page);
  expect(page.dialogos).toEqual([]);
  await responder(page, true);
  await tecla(page, "Enter");
  await clic(page, '#screen-end [data-action="menu"]');
  await expect(page.locator("#btn-resume")).toBeVisible();
  await expect(page.locator("#resume-label")).toHaveText("🐧 Linux básico · Nv.1 · pregunta 2 de 10");
});

test("modo de prueba: varias ids, un prefijo con * y aviso de las que no existen", async ({ page }) => {
  await abrir(page, "index.html?preguntas=lx01,noexiste,lxB*");
  await expect(page.locator("#tq-toast")).toHaveText("Modo de prueba: no encontré noexiste");
  const n = await page.evaluate(() => 1 + getWorldById("linux").boss.length);
  await expect(page.locator("#hud-progress")).toHaveText("1 / " + n);
  // Se juegan en el orden pedido
  await expect(page.locator("#question-type")).toContainText("lx01");
  await jugarHastaElFinal(page);
  await expect(page.locator("#end-title")).toHaveText("Prueba terminada");
});

test("modo de prueba sin ninguna id válida: avisa y deja el menú", async ({ page }) => {
  await abrir(page, "index.html?pregunta=nada");
  await expect(page.locator("#tq-toast")).toHaveText("Modo de prueba: no encontré nada");
  await expect(page.locator("#screen-menu")).toHaveClass(/active/);
});
