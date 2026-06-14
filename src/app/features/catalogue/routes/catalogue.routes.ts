import { Routes } from '@angular/router';
import {
  catalogueCategoryDescriptionResolver,
  catalogueProductDescriptionResolver,
  catalogueCategoryTitleResolver,
  catalogueProductTitleResolver,
  catalogueCategoryResolver,
  catalogueProductResolver,
  catalogueCardsResolver,
} from '@features/catalogue/data/catalogue.resolvers';

export const CATALOGUE_ROUTES: Routes = [
  {
    path: '',
    data: {
      description:
        'Browse our premium flower catalogue with roses, gypsophila, hypericum and sunflowers from ALX Garden.'
    },
    resolve: {
      cards: catalogueCardsResolver
    },
    loadComponent: () =>
      import('@features/catalogue/pages/catalogue-page/catalogue-page.component').then(
        (m) => m.CataloguePageComponent
      )
  },
  {
    path: ':category/:product',
    title: catalogueProductTitleResolver,
    resolve: {
      description: catalogueProductDescriptionResolver,
      productData: catalogueProductResolver
    },
    loadComponent: () =>
      import('@features/catalogue/pages/catalogue-product-page/catalogue-product-page.component').then(
        (m) => m.CatalogueProductPageComponent
      )
  },
  {
    path: ':category',
    title: catalogueCategoryTitleResolver,
    resolve: {
      categoryData: catalogueCategoryResolver,
      description: catalogueCategoryDescriptionResolver
    },
    loadComponent: () =>
      import('@features/catalogue/pages/catalogue-category-page/catalogue-category-page.component').then(
        (m) => m.CatalogueCategoryPageComponent
      )
  }
];
