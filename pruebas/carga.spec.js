// Archivos que no cargan (error de escritura, archivo que falta): el juego lo dice en pantalla con el nombre del archivo.
// Aquí los errores de JavaScript son a propósito, así que se usa el test de Playwright sin el control de errores.
const { test, expect } = require("@playwright/test");

/** Abre el juego sirviendo esos archivos rotos (ruta → contenido, o null para que no exista). */
async function abrirCon(page, rotos) {
  for (const [ruta, contenido] of Object.entries(rotos)) {
    await page.route("**/" + ruta, (route) =>
      contenido === null ? route.fulfill({ status: 404, body: "" }) : route.fulfill({ contentType: "text/javascript", body: contenido }));
  }
  await page.goto("index.html");
  await page.waitForLoadState("load");
}

const aviso = (page) => page.locator("#screen-menu .load-error");
const ROTO = "addWorld({ id: 'x', questions: [ { id: 'a' }, ,, }"; // error de escritura

test("todo bien: sin aviso", async ({ page }) => {
  await abrirCon(page, {});
  await page.waitForFunction(() => window.techQuestReady === true);
  await expect(aviso(page)).toHaveCount(0);
});

test("un mundo con un error de escritura: lo nombra y el resto del juego funciona", async ({ page }) => {
  await abrirCon(page, { "js/mundos/printers.js": ROTO });
  await expect(aviso(page)).toHaveText(/^No se pudo cargar js\/mundos\/printers\.js: faltan sus preguntas en el juego\./);
  await expect(aviso(page)).toHaveAttribute("role", "alert");
  expect(await page.evaluate(() => window.techQuestReady)).toBe(true);
  expect(await page.evaluate(() => WORLDS.map((w) => w.id))).not.toContain("printers");
  await page.click('#screen-menu [data-action="play"]');
  await expect(page.locator('[data-world="linux"]')).toBeVisible();
});

test("dos mundos rotos: nombra los dos", async ({ page }) => {
  await abrirCon(page, { "js/mundos/printers.js": ROTO, "js/mundos/cloud.js": ROTO });
  await expect(aviso(page)).toHaveText(/^No se pudieron cargar js\/mundos\/printers\.js, js\/mundos\/cloud\.js:/);
});

test("un mundo que no existe en la carpeta: lo nombra", async ({ page }) => {
  await abrirCon(page, { "js/mundos/database.js": null });
  await expect(aviso(page)).toHaveText(/^No se pudo cargar js\/mundos\/database\.js:/);
});

test("data.js roto: solo nombra data.js (no los mundos que fallan por su culpa)", async ({ page }) => {
  await abrirCon(page, { "js/data.js": "const GAME_CONFIG = {" });
  await expect(aviso(page)).toHaveText(/^El juego no pudo arrancar \(No se pudo cargar js\/data\.js\)\. Si editaste archivos de js\//);
});

test("ui.js roto: el juego no arranca y nombra ui.js", async ({ page }) => {
  await abrirCon(page, { "js/ui.js": "const UI = (() => {" });
  await expect(aviso(page)).toHaveText(/^El juego no pudo arrancar \(No se pudo cargar js\/ui\.js\)\./);
});

test("game.js roto: el juego no arranca y nombra game.js", async ({ page }) => {
  await abrirCon(page, { "js/game.js": "(function () {" });
  await expect(aviso(page)).toHaveText(/^El juego no pudo arrancar \(No se pudo cargar js\/game\.js\)\./);
});

test("tickets.js roto: lo nombra y el juego funciona sin tickets", async ({ page }) => {
  const hayTickets = await page.goto("js/tickets.js").then((r) => r.ok());
  test.skip(!hayTickets, "este juego aún no tiene js/tickets.js");
  await abrirCon(page, { "js/tickets.js": "addTicket({ id: 'x', steps: [ }" });
  await expect(aviso(page)).toHaveText(/^No se pudo cargar js\/tickets\.js:/);
  expect(await page.evaluate(() => window.techQuestReady)).toBe(true);
  await expect(page.locator("#btn-tickets")).toBeHidden();
});
