import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { CatalogueReader } from '@features/catalogue/application/catalogue-reader';
import { CatalogueMetadataService } from '@features/catalogue/application/catalogue-metadata.service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  CataloguePageData,
  CatalogueCategory,
  CatalogueProduct,
} from '@features/catalogue/models/catalogue.models';

export const cataloguePageResolver: ResolveFn<CataloguePageData> = () => {
  const catalogue = inject(CatalogueReader);

  return catalogue.getCategoryCards$().pipe(
    map((cards) => ({
      cards,
      loadError: catalogue.hasLoadError(),
    })),
  );
};

export const catalogueCategoryResolver: ResolveFn<CatalogueCategory | RedirectCommand> = (
  route,
) => {
  const repository = inject(CatalogueReader);
  const router = inject(Router);

  return repository
    .getCategoryBySlug$(route.paramMap.get('category') ?? '')
    .pipe(map((category) => category ?? new RedirectCommand(router.parseUrl('/not-found'))));
};

export const catalogueProductResolver: ResolveFn<CatalogueProduct | RedirectCommand> = (route) => {
  const repository = inject(CatalogueReader);
  const router = inject(Router);

  return repository
    .getProductBySlug$(route.paramMap.get('category') ?? '', route.paramMap.get('product') ?? '')
    .pipe(map((product) => product ?? new RedirectCommand(router.parseUrl('/not-found'))));
};

export const catalogueCategoryTitleResolver: ResolveFn<string> = (route) =>
  inject(CatalogueMetadataService).getCategoryTitle$(route.paramMap.get('category') ?? '');

export const catalogueProductTitleResolver: ResolveFn<string> = (route) =>
  inject(CatalogueMetadataService).getProductTitle$(
    route.paramMap.get('category') ?? '',
    route.paramMap.get('product') ?? '',
  );

export const catalogueCategoryDescriptionResolver: ResolveFn<string> = (route) =>
  inject(CatalogueMetadataService).getCategoryDescription$(route.paramMap.get('category') ?? '');

export const catalogueProductDescriptionResolver: ResolveFn<string> = (route) =>
  inject(CatalogueMetadataService).getProductDescription$(
    route.paramMap.get('category') ?? '',
    route.paramMap.get('product') ?? '',
  );
