import { Routes } from '@angular/router';
import {
  catalogueCategoryDescriptionResolver,
  catalogueProductDescriptionResolver,
  catalogueCategoryTitleResolver,
  catalogueProductTitleResolver,
  catalogueCategoryResolver,
  catalogueProductResolver,
  cataloguePageResolver,
} from '@features/catalogue/data-access/catalogue.resolvers';
import { CATALOGUE_PROVIDERS } from '@features/catalogue/data-access/catalogue.providers';

export const CATALOGUE_ROUTES: Routes = [
  {
    path: '',
    providers: CATALOGUE_PROVIDERS,
    data: {
      description:
        'Browse our premium flower catalogue with roses, gypsophila, hypericum and sunflowers from ALX Garden.',
      image: '/assets/catalogue/roses.jpg',
    },
    resolve: {
      pageData: cataloguePageResolver,
    },
    loadComponent: () =>
      import('@features/catalogue/pages/catalogue-page/catalogue-page.component').then(
        (m) => m.CataloguePageComponent,
      ),
  },
  {
    path: ':category/:product',
    providers: CATALOGUE_PROVIDERS,
    title: catalogueProductTitleResolver,
    resolve: {
      categoryData: catalogueCategoryResolver,
      description: catalogueProductDescriptionResolver,
      productData: catalogueProductResolver,
    },
    loadComponent: () =>
      import('@features/catalogue/pages/catalogue-product-page/catalogue-product-page.component').then(
        (m) => m.CatalogueProductPageComponent,
      ),
  },
  {
    path: ':category',
    providers: CATALOGUE_PROVIDERS,
    title: catalogueCategoryTitleResolver,
    resolve: {
      categoryData: catalogueCategoryResolver,
      description: catalogueCategoryDescriptionResolver,
    },
    loadComponent: () =>
      import('@features/catalogue/pages/catalogue-category-page/catalogue-category-page.component').then(
        (m) => m.CatalogueCategoryPageComponent,
      ),
  },
];
