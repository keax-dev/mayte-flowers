import { catchError, map, shareReplay } from 'rxjs/operators';
import { Injectable, inject, signal } from '@angular/core';
import { slugMatches } from '@features/catalogue/models/catalogue-slug.utils';
import { CatalogueReader } from '@features/catalogue/application/catalogue-reader';
import { CatalogueDataSource } from '@features/catalogue/data-access/catalogue.data-source';
import {
  normalizeCatalogue,
  toCategoryCards,
} from '@features/catalogue/data-access/catalogue.mapper';
import { of } from 'rxjs';

@Injectable()
export class CatalogueRepository implements CatalogueReader {
  private readonly dataSource = inject(CatalogueDataSource);

  private readonly loadErrorState = signal(false);
  readonly loadError = this.loadErrorState.asReadonly();

  private readonly categories$ = this.dataSource.load().pipe(
    map(normalizeCatalogue),
    catchError(() => {
      this.loadErrorState.set(true);
      return of([]);
    }),
    shareReplay({ bufferSize: 1, refCount: false }),
  );

  getCategories$() {
    return this.categories$;
  }

  getCategoryCards$() {
    return this.categories$.pipe(map(toCategoryCards));
  }

  getCategoryBySlug$(categorySlug: string) {
    return this.categories$.pipe(
      map((categories) =>
        categories.find((category) => slugMatches(category.slug, categorySlug, category.aliases)),
      ),
    );
  }

  getProductBySlug$(categorySlug: string, productSlug: string) {
    return this.getCategoryBySlug$(categorySlug).pipe(
      map((category) =>
        category?.products.find((product) =>
          slugMatches(product.slug, productSlug, product.aliases),
        ),
      ),
    );
  }

  hasLoadError(): boolean {
    return this.loadErrorState();
  }
}
