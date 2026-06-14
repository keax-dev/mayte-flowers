import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import {
  CatalogueCategory,
  CatalogueCategoryCard,
  CatalogueProduct
} from '@features/catalogue/data/catalogue.models';
import { CatalogueRepository } from '@features/catalogue/data/catalogue.repository';

export const catalogueCardsResolver: ResolveFn<readonly CatalogueCategoryCard[]> = () =>
  inject(CatalogueRepository).getCategoryCards$();

export const catalogueCategoryResolver: ResolveFn<CatalogueCategory | undefined> = (route) =>
  inject(CatalogueRepository).getCategoryBySlug$(route.paramMap.get('category') ?? '');

export const catalogueProductResolver: ResolveFn<CatalogueProduct | undefined> = (route) =>
  inject(CatalogueRepository).getProductBySlug$(
    route.paramMap.get('category') ?? '',
    route.paramMap.get('product') ?? ''
  );

export const catalogueCategoryTitleResolver: ResolveFn<string> = (route) =>
  inject(CatalogueRepository).getCategoryTitle$(route.paramMap.get('category') ?? '');

export const catalogueProductTitleResolver: ResolveFn<string> = (route) =>
  inject(CatalogueRepository).getProductTitle$(
    route.paramMap.get('category') ?? '',
    route.paramMap.get('product') ?? ''
  );

export const catalogueCategoryDescriptionResolver: ResolveFn<string> = (route) =>
  inject(CatalogueRepository).getCategoryDescription$(route.paramMap.get('category') ?? '');

export const catalogueProductDescriptionResolver: ResolveFn<string> = (route) =>
  inject(CatalogueRepository).getProductDescription$(
    route.paramMap.get('category') ?? '',
    route.paramMap.get('product') ?? ''
  );
