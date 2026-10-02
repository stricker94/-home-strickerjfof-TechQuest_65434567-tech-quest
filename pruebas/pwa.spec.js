// Instalable y sin internet: manifiesto, íconos, service worker (sw.js) y abrir index.html como archivo.
const path = require("path");
const { test, expect, abrir, aventura, jugarHastaElFinal, recargar } = require("./ayudantes");

/** Espera a que sw.js esté activo y controle la página (la primera visita lo instala; la recarga lo usa). */
async function conServiceWorker(page) {
  await page.evaluate(() => navigator.serviceWorker.ready);
  await recargar(page);
  expect(await page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
}

test("se puede instalar: manifiesto con íconos que existen", async ({ page }) => {
  await abrir(page);
  const href = await page.locator('link[rel="manifest"]').getAttribute("href");
  expect(href).toBe("manifest.webmanifest");
  const res = await page.request.get(href);
  expect(res.ok()).toBe(true);
  const man = await res.json();
  expect(man).toMatchObject({ short_name: "Tech Quest", start_url: "./index.html", display: "standalone" });
  const tamaños = man.icons.map((i) => i.sizes);
  expect(tamaños).toEqual(expect.arrayContaining(["192x192", "512x512"]));
  expect(man.icons.some((i) => /maskable/.test(i.purpose || ""))).toBe(true);
  for (const i of man.icons) {
    const r = await page.request.get(i.src);
    expect(r.ok(), i.src).toBe(true);
    expect(r.headers()["content-type"]).toContain(i.type || "image/");
  }
  for (const sel of ['link[rel="icon"]', 'link[rel="apple-touch-icon"]']) {
    const r = await page.request.get(await page.locator(sel).getAttribute("href"));
    expect(r.ok(), sel).toBe(true);
  }
});

test("el service worker guarda todos los archivos que carga el juego", async ({ page }) => {
  await abrir(page);
  await conServiceWorker(page);
  const guardados = await page.evaluate(async () => {
    const c = await caches.open("tech-quest");
    return (await c.keys()).map((r) => new URL(r.url).pathname.replace(/^\//, ""));
  });
  const usados = await page.evaluate(() =>
    Array.from(document.querySelectorAll("script[src], link[rel='stylesheet'], link[rel='manifest'], link[rel='icon'], link[rel='apple-touch-icon']"))
      .map((e) => e.getAttribute("src") || e.getAttribute("href")));
  for (const f of usados.concat(["index.html", ""])) expect(guardados, f).toContain(f);
});

test("sin internet: recarga, juega un nivel y abre el modo de prueba", async ({ page, context }) => {
  await abrir(page);
  await conServiceWorker(page);
  await context.setOffline(true);
  await recargar(page);
  await expect(page.locator(".load-error")).toHaveCount(0);
  expect(await page.evaluate(() => WORLDS.length)).toBeGreaterThanOrEqual(10);
  await aventura(page);
  await jugarHastaElFinal(page);
  await expect(page.locator("#end-unlock")).toHaveText("Desbloqueado: Nivel 2 de Linux básico");
  // La dirección con ?pregunta= también sale de lo guardado
  await page.goto("index.html?pregunta=lx01");
  await page.waitForFunction(() => window.techQuestReady === true);
  await expect(page.locator("#hud-world")).toHaveText("🧪 Modo de prueba");
});

test("abierto como archivo (doble clic en index.html): funciona, sin manifiesto ni errores en la consola", async ({ page }) => {
  const consola = [];
  page.on("console", (m) => { if (m.type() === "error") consola.push(m.text()); });
  await page.goto("file://" + path.resolve(__dirname, "..", "index.html"));
  await page.waitForFunction(() => window.techQuestReady === true);
  await expect(page.locator('link[rel="manifest"]')).toHaveCount(0);
  await expect(page.locator(".load-error")).toHaveCount(0);
  await aventura(page);
  await expect(page.locator("#screen-play")).toHaveClass(/active/);
  expect(consola).toEqual([]);
});
