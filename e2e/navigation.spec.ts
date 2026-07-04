import { expect, test } from '@playwright/test';

test.describe('catalogue navigation', () => {
  test('navigates from home to a category and product detail page', async ({ page }) => {
    // Entramos a la raíz para comprobar también la redirección inicial.
    await page.goto('/');

    // La app debe redirigir a /home y mostrar el héroe principal.
    await expect(page).toHaveURL(/\/home$/);
    await expect(page.getByRole('heading', { name: 'GYPSOPHILA' })).toBeVisible();

    // Desde home navegamos al catálogo general.
    await page.getByRole('link', { name: 'Browse catalogue' }).click();

    await expect(page).toHaveURL(/\/gallery$/);
    await expect(page.getByRole('heading', { name: 'Product catalogue' })).toBeVisible();

    // Abrimos una categoría concreta.
    await page.getByRole('link', { name: 'Show products' }).first().click();

    await expect(page).toHaveURL(/\/gallery\/roses$/);
    await expect(page.getByRole('heading', { name: 'ROSES' })).toBeVisible();

    // Luego entramos al detalle de uno de los productos de esa categoría.
    await page.getByRole('link', { name: 'View details' }).first().click();

    // Aquí validamos que el flujo completo de navegación crítica funciona.
    await expect(page).toHaveURL(/\/gallery\/roses\/explorer-rose$/);
    await expect(page.locator('#product-title')).toHaveText('EXPLORER ROSE');
    await expect(page.getByRole('button', { name: 'Request quote' })).toBeVisible();
  });
});
