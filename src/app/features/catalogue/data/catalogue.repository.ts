import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';

import {
  CatalogueCategory,
  CatalogueCategoryCard,
  CatalogueProduct
} from '@features/catalogue/data/catalogue.models';
import { slugMatches, toRouteSlug } from '@features/catalogue/data/catalogue-slug.utils';

@Injectable({ providedIn: 'root' })
export class CatalogueRepository {
  private readonly http = inject(HttpClient);

  private readonly categories$ = this.http
    .get<CatalogueCategory[]>('assets/data/catalogue.json')
    .pipe(
      map((categories) =>
        categories.map<CatalogueCategory>((category) => ({
          ...category,
          routeSlug: toRouteSlug(category.slug),
          products: category.products.map<CatalogueProduct>((product) => ({
            ...product,
            routeSlug: toRouteSlug(product.slug)
          }))
        }))
      ),
      shareReplay({ bufferSize: 1, refCount: false })
    );

  getCategories$() {
    return this.categories$;
  }

  getCategoryCards$() {
    return this.categories$.pipe(
      map((categories) =>
        categories.map<CatalogueCategoryCard>((category) => ({
          slug: category.slug,
          name: category.name,
          image: category.image,
          summary: category.buyerNote,
          route: category.directProductSlug
            ? ['/gallery', category.routeSlug ?? toRouteSlug(category.slug), toRouteSlug(category.directProductSlug)]
            : ['/gallery', category.routeSlug ?? toRouteSlug(category.slug)]
        }))
      )
    );
  }

  getCategoryBySlug$(categorySlug: string) {
    return this.categories$.pipe(
      map((categories) =>
        categories.find((category) => slugMatches(category.slug, categorySlug, category.aliases))
      )
    );
  }

  getProductBySlug$(categorySlug: string, productSlug: string) {
    return this.getCategoryBySlug$(categorySlug).pipe(
      map((category) =>
        category?.products.find((product) => slugMatches(product.slug, productSlug, product.aliases))
      )
    );
  }

  getCategoryTitle$(categorySlug: string) {
    return this.getCategoryBySlug$(categorySlug).pipe(
      map((category) => (category ? `${category.name} | ALX Garden` : 'Product Not Found | ALX Garden'))
    );
  }

  getProductTitle$(categorySlug: string, productSlug: string) {
    return this.getProductBySlug$(categorySlug, productSlug).pipe(
      map((product) => (product ? `${product.name} | ALX Garden` : 'Product Not Found | ALX Garden'))
    );
  }

  getCategoryDescription$(categorySlug: string) {
    return this.getCategoryBySlug$(categorySlug).pipe(
      map(
        (category) =>
          category
            ? `Explore our ${category.name.toLowerCase()} selection from ALX Garden, with detailed specs and product highlights.`
            : 'Browse the ALX Garden flower catalogue.'
      )
    );
  }

  getProductDescription$(categorySlug: string, productSlug: string) {
    return this.getProductBySlug$(categorySlug, productSlug).pipe(
      map(
        (product) =>
          product?.description ??
          'Discover premium flower varieties from ALX Garden with detailed product information.'
      )
    );
  }
}
