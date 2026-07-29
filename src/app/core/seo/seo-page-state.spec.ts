import { ActivatedRouteSnapshot } from '@angular/router';
import { buildSeoPageState, findActiveRoute } from '@core/seo/seo-page-state';
import { TEST_APP_CONFIG } from '@app/testing/test-app-config';

describe('seo page state', () => {
  it('builds metadata and structured data without touching the document', () => {
    const activeRoute = {
      data: {
        description: 'Premium Ecuadorian flowers.',
        image: '/assets/catalogue/roses.jpg',
      },
      firstChild: null,
      routeConfig: { path: 'gallery' },
      title: 'Products | ALX Garden',
      url: [{ path: 'gallery' }],
    } as unknown as ActivatedRouteSnapshot;
    const root = {
      data: {},
      firstChild: activeRoute,
      routeConfig: null,
      url: [],
    } as unknown as ActivatedRouteSnapshot;

    const state = buildSeoPageState(
      findActiveRoute(root),
      root,
      TEST_APP_CONFIG,
      'Products | ALX Garden',
      '/gallery',
    );

    expect(state.description).toBe('Premium Ecuadorian flowers.');
    expect(state.image).toBe('https://alxgarden.com/assets/catalogue/roses.jpg');
    expect(state.pageUrl).toBe('https://alxgarden.com/gallery');
    expect(state.robots).toBe('index, follow');
    expect(state.graph.map((item) => item['@type'])).toEqual([
      'Organization',
      'BreadcrumbList',
      'WebSite',
      'WebPage',
    ]);
  });
});
