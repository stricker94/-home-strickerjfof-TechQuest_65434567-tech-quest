// Instalable y sin internet: manifiesto, íconos, service worker (sw.js) y abrir index.html como archivo.
const path = require("path");
const cp = require("child_process");
const { test, expect, abrir, aventura, jugarHastaElFinal, recargar } = require("./ayudantes");

/**
 * Espera a que sw.js esté instalado y controle la página, sin recargar: así su caché tiene solo lo que guarda
 * al instalarse (la lista ARCHIVOS), no lo que una recarga con red habría guardado de paso.
 */
async function conServiceWorker(page) {
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
}

/** Un servidor solo para una prueba, que se puede apagar a mitad (sin red de verdad). */
async function servidorPropio(page) {
  const puerto = 18000 + test.info().parallelIndex;
  const proceso = cp.spawn(process.execPath, [path.join(__dirname, "servidor.js"), String(puerto)], { stdio: "ignore" });
  const url = `http://127.0.0.1:${puerto}/`;
  await expect.poll(() => page.request.get(url + "index.html").then((r) => r.ok()).catch(() => false), { timeout: 10000 }).toBe(true);
  const apagar = () => new Promise((listo) => {
    if (proceso.exitCode !== null || proceso.signalCode !== null) return listo();
    proceso.once("exit", () => listo());
    proceso.kill();
  });
  return { url, apagar };
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

test("sin internet: recarga, juega un nivel y abre el modo de prueba", async ({ page }) => {
  // Con el servidor apagado de verdad (context.setOffline no frena las descargas del propio service worker)
  const srv = await servidorPropio(page);
  try {
    await page.goto(srv.url + "index.html");
    await page.waitForFunction(() => window.techQuestReady === true);
    await conServiceWorker(page);
    await srv.apagar();
    // Sin servidor ni service worker, esto ni siquiera cargaría la página
    expect(await page.evaluate((u) => fetch(u + "README.md").then(() => "red", () => "sin red"), srv.url)).toBe("sin red");
    await recargar(page);
    await expect(page.locator(".load-error")).toHaveCount(0);
    expect(await page.evaluate(() => WORLDS.length)).toBeGreaterThanOrEqual(10);
    await aventura(page);
    await jugarHastaElFinal(page);
    await expect(page.locator("#end-unlock")).toHaveText("Desbloqueado: Nivel 2 de Linux básico");
    // La dirección con ?pregunta= también sale de lo guardado
    await page.goto(srv.url + "index.html?pregunta=lx01");
    await page.waitForFunction(() => window.techQuestReady === true);
    await expect(page.locator("#hud-world")).toHaveText("🧪 Modo de prueba");
  } finally {
    await srv.apagar();
  }
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
