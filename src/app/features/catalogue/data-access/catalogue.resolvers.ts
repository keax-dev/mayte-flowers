import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { CatalogueRepository } from '@features/catalogue/data-access/catalogue.repository';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  CatalogueCategoryCard,
  CatalogueCategory,
  CatalogueProduct,
} from '@features/catalogue/models/catalogue.models';

export const catalogueCardsResolver: ResolveFn<readonly CatalogueCategoryCard[]> = () =>
  inject(CatalogueRepository).getCategoryCards$();

export const catalogueCategoryResolver: ResolveFn<CatalogueCategory | RedirectCommand> = (
  route,
) => {
  const repository = inject(CatalogueRepository);
  const router = inject(Router);

  return repository
    .getCategoryBySlug$(route.paramMap.get('category') ?? '')
    .pipe(map((category) => category ?? new RedirectCommand(router.parseUrl('/not-found'))));
};

export const catalogueProductResolver: ResolveFn<CatalogueProduct | RedirectCommand> = (route) => {
  const repository = inject(CatalogueRepository);
  const router = inject(Router);

  return repository
    .getProductBySlug$(route.paramMap.get('category') ?? '', route.paramMap.get('product') ?? '')
    .pipe(map((product) => product ?? new RedirectCommand(router.parseUrl('/not-found'))));
};

export const catalogueCategoryTitleResolver: ResolveFn<string> = (route) =>
  inject(CatalogueRepository).getCategoryTitle$(route.paramMap.get('category') ?? '');

export const catalogueProductTitleResolver: ResolveFn<string> = (route) =>
  inject(CatalogueRepository).getProductTitle$(
    route.paramMap.get('category') ?? '',
    route.paramMap.get('product') ?? '',
  );

export const catalogueCategoryDescriptionResolver: ResolveFn<string> = (route) =>
  inject(CatalogueRepository).getCategoryDescription$(route.paramMap.get('category') ?? '');

export const catalogueProductDescriptionResolver: ResolveFn<string> = (route) =>
  inject(CatalogueRepository).getProductDescription$(
    route.paramMap.get('category') ?? '',
    route.paramMap.get('product') ?? '',
  );
