import { appRoutes } from '@app/app.routes';

describe('appRoutes', () => {
  it('defines the expected top-level pages and fallback route', () => {
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
    const homeRoute = appRoutes.find((route) => route.path === 'home');
    const aboutRoute = appRoutes.find((route) => route.path === 'about-us');

    const homeComponent = await homeRoute?.loadComponent?.();
    const aboutComponent = await aboutRoute?.loadComponent?.();

    expect(homeComponent).toBeDefined();
    expect(aboutComponent).toBeDefined();
  });
});
