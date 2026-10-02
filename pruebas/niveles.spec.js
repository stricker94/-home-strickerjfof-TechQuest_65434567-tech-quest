// Cada nivel de cada mundo se puede jugar entero en Práctica, y cada Boss se puede ganar.
const fs = require("fs");
const path = require("path");
const { test, expect, abrir, clic, jugarHastaElFinal } = require("./ayudantes");

// Los mundos, en el orden de index.html (sin cargar el juego)
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const MUNDOS = [...html.matchAll(/src="js\/mundos\/([a-z0-9_-]+)\.js"/g)].map((m) => m[1]);

for (const mundo of MUNDOS) {
  test(`${mundo}: los 5 niveles se completan en Práctica respondiendo bien`, async ({ page }) => {
    await abrir(page);
    for (let nivel = 1; nivel <= 5; nivel++) {
      // Cada nivel empieza con las estadísticas en cero, para contar sus respuestas
      await page.evaluate(() => localStorage.clear());
      await clic(page, '#screen-menu [data-action="practice"]');
      await clic(page, `[data-action="pick-world"][data-world="${mundo}"]`);
      await clic(page, `[data-action="pick-level"][data-level="${nivel}"]`);
      const esperadas = await page.evaluate(([w, l]) => getQuestionsForLevel(w, l).length, [mundo, nivel]);
      expect(esperadas, `${mundo} nivel ${nivel} tiene preguntas`).toBeGreaterThan(0);
      await jugarHastaElFinal(page, () => true);
      const s = await page.evaluate(() => Progress.getStats());
      expect(`${s.correct}/${s.correct + s.wrong}`, `${mundo} nivel ${nivel}`).toBe(`${esperadas}/${esperadas}`);
      await clic(page, '#screen-end [data-action="menu"]');
    }
  });

  test(`${mundo}: el Boss se gana respondiendo bien`, async ({ page }) => {
    await abrir(page, "index.html", { techQuestUnlocks: { [mundo]: true } });
    const tiene = await page.evaluate((w) => (getWorldById(w).boss || []).length, mundo);
    test.skip(!tiene, "este mundo no tiene Boss");
    await clic(page, '#screen-menu [data-action="boss"]');
    await clic(page, `[data-action="pick-world"][data-world="${mundo}"]`);
    await jugarHastaElFinal(page, () => true);
    await expect(page.locator("#end-title")).toHaveText("¡Boss derrotado!");
    expect(await page.evaluate((w) => !!Progress.getBossWins()[w], mundo)).toBe(true);
  });
}
