import { expect, test } from '@playwright/test';

test.describe('contact dialog', () => {
  test('submits successfully when the request is accepted', async ({ page }) => {
    // Interceptamos la llamada externa para no depender de FormSubmit real
    // y poder controlar la respuesta del servidor.
    await page.route('https://formsubmit.co/ajax/**', async (route) => {
      await route.fulfill({
        body: JSON.stringify({ success: 'true' }),
        contentType: 'application/json',
        status: 200,
      });
    });

    await page.goto('/');
    await page.getByRole('button', { name: 'Contact' }).click();

    await expect(page.getByRole('heading', { name: 'CONTACT US' })).toBeVisible();

    // Llenamos solo los campos mínimos necesarios para que el formulario sea válido.
    await page.getByLabel('Full name').fill('Jane Buyer');
    await page.getByLabel('Email address').fill('jane@example.com');
    await page
      .getByLabel('Project or order details')
      .fill('Hello ALX Garden, I would like to receive more information.');

    await page.getByRole('button', { name: 'Send' }).click();

    // Si el backend responde bien, la UI debe mostrar feedback positivo.
    await expect(page.getByText('Thanks for your request.', { exact: false })).toBeVisible();
  });

  test('shows error feedback when the request fails', async ({ page }) => {
    // Mismo flujo, pero esta vez forzamos una respuesta de error
    // para validar el manejo visual del fallo.
    await page.route('https://formsubmit.co/ajax/**', async (route) => {
      await route.fulfill({
        body: JSON.stringify({ error: 'server error' }),
        contentType: 'application/json',
        status: 500,
      });
    });

    await page.goto('/');
    await page.getByRole('button', { name: 'Contact' }).click();

    await page.getByLabel('Full name').fill('Jane Buyer');
    await page.getByLabel('Email address').fill('jane@example.com');
    await page
      .getByLabel('Project or order details')
      .fill('Hello ALX Garden, this request should fail.');

    await page.getByRole('button', { name: 'Send' }).click();

    // La app no debe quedarse "muda": debe informar el problema al usuario.
    await expect(
      page.getByText('We could not send your message right now.', { exact: false }),
    ).toBeVisible();
  });
});
