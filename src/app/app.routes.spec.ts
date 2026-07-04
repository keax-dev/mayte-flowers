import { appRoutes } from '@app/app.routes';

describe('appRoutes', () => {
  it('defines the expected top-level pages and fallback route', () => {
    // Aquí validamos la "tabla de rutas" principal de la aplicación:
    // páginas esperadas, títulos SEO y la ruta comodín de fallback.
    expect(appRoutes.find((route) => route.path === 'home')?.title).toBe('Home | ALX Garden');
    expect(appRoutes.find((route) => route.path === 'about-us')?.title).toBe(
      'About Us | ALX Garden',
    );
    expect(appRoutes.find((route) => route.path === 'gallery')?.title).toBe(
      'Products | ALX Garden',
    );
    expect(appRoutes.find((route) => route.path === 'not-found')?.title).toBe(
      'Page Not Found | ALX Garden',
    );
    expect(appRoutes.find((route) => route.path === '**')?.redirectTo).toBe('not-found');
  });

  it('lazy-loads standalone components for the main pages', async () => {
    // Buscamos dos rutas reales para comprobar que usan carga diferida
    // y que sus componentes pueden resolverse correctamente.
    const homeRoute = appRoutes.find((route) => route.path === 'home');
    const aboutRoute = appRoutes.find((route) => route.path === 'about-us');

    const homeComponent = await homeRoute?.loadComponent?.();
    const aboutComponent = await aboutRoute?.loadComponent?.();

    // Si esto pasa, la definición de lazy loading quedó bien conectada.
    expect(homeComponent).toBeDefined();
    expect(aboutComponent).toBeDefined();
  });
});
