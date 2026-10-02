// Pruebas del juego en un navegador de verdad (Chromium). Ejecuta: npx playwright test
// En GitHub corren solas en cada cambio (.github/workflows/pruebas.yml).
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "pruebas",
  testMatch: "*.spec.js",
  timeout: 120000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: "http://127.0.0.1:8765/",
    actionTimeout: 8000,
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node pruebas/servidor.js 8765",
    url: "http://127.0.0.1:8765/index.html",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Para usar un Chromium ya instalado: PW_CHROMIUM=/ruta/al/chrome npx playwright test
        launchOptions: process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {},
      },
    },
  ],
});
