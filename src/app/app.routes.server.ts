import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { CatalogueCategory } from '@features/catalogue/models/catalogue.models';
import { toRouteSlug } from '@features/catalogue/models/catalogue-slug.utils';
import catalogueData from '../assets/data/catalogue.json';

const catalogueCategories = catalogueData as readonly CatalogueCategory[];

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'about-us',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'gallery',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'gallery/:category',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    async getPrerenderParams() {
      return catalogueCategories.map((category) => ({
        category: category.routeSlug ?? toRouteSlug(category.slug),
      }));
    },
  },
  {
    path: 'gallery/:category/:product',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    async getPrerenderParams() {
      return catalogueCategories.flatMap((category) =>
        category.products.map((product) => ({
          category: category.routeSlug ?? toRouteSlug(category.slug),
          product: product.routeSlug ?? toRouteSlug(product.slug),
        })),
      );
    },
  },
  {
    path: 'not-found',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
