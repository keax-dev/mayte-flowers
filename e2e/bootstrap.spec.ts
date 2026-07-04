import { expect, test } from '@playwright/test';

test.describe('runtime bootstrap', () => {
  test('shows a readable fallback when runtime config cannot be loaded', async ({ page }) => {
    // Bloqueamos la carga del archivo de configuración local para simular
    // un despliegue roto o un archivo faltante.
    await page.route('**/assets/config/app-config.local.json', async (route) => {
      await route.fulfill({
        body: 'missing config',
        contentType: 'text/plain',
        status: 500,
      });
    });

    // Al entrar a la app, el bootstrap debe fallar de forma controlada.
    await page.goto('/');

    // Lo importante aquí no es solo que falle, sino que muestre
    // un mensaje legible para diagnóstico.
    await expect(
      page.getByText('Unable to load the application configuration.', { exact: false }),
    ).toBeVisible();
  });
});
