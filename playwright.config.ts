import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Carpeta donde viven las pruebas E2E.
  testDir: './e2e',
  // Permite ejecutar los specs en paralelo para reducir tiempo local/CI.
  fullyParallel: true,
  // En CI evita que se suba accidentalmente un test con .only.
  forbidOnly: !!process.env.CI,
  // En CI damos algunos reintentos por si aparece flakiness puntual.
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  outputDir: 'test-results',
  use: {
    // URL base para que en los specs baste con usar page.goto('/').
    baseURL: 'http://127.0.0.1:4200',
    // Evidencias útiles cuando algo falla.
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    // Antes de correr E2E, Playwright levanta automáticamente la app Angular.
    command: 'npm run ng -- serve --host 127.0.0.1 --port 4200',
    // En local reutiliza un server ya abierto; en CI suele levantarse desde cero.
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: 'http://127.0.0.1:4200',
  },
  projects: [
    {
      // Proyecto/navegador con el que correrán las pruebas.
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
