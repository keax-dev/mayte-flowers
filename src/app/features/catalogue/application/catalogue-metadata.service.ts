import { CatalogueReader } from '@features/catalogue/application/catalogue-reader';
import { Injectable, inject } from '@angular/core';
import { BRAND_CONFIG } from '@core/config/app-config.token';
import { map, Observable } from 'rxjs';

@Injectable()
export class CatalogueMetadataService {
  private readonly catalogue = inject(CatalogueReader);
  private readonly config = inject(BRAND_CONFIG);

  getCategoryTitle$(categorySlug: string): Observable<string> {
    return this.catalogue.getCategoryBySlug$(categorySlug).pipe(
      map((category) =>
        category
          ? `${category.name} | ${this.config.name}`
          : `Product Not Found | ${this.config.name}`,
      ),
    );
  }

  getProductTitle$(categorySlug: string, productSlug: string): Observable<string> {
    return this.catalogue.getProductBySlug$(categorySlug, productSlug).pipe(
      map((product) =>
        product
          ? `${product.name} | ${this.config.name}`
          : `Product Not Found | ${this.config.name}`,
      ),
    );
  }

  getCategoryDescription$(categorySlug: string): Observable<string> {
    return this.catalogue.getCategoryBySlug$(categorySlug).pipe(
      map((category) =>
        category
          ? `Explore our ${category.name.toLowerCase()} selection from ALX Garden, with detailed specs and product highlights.`
          : 'Browse the ALX Garden flower catalogue.',
      ),
    );
  }

  getProductDescription$(categorySlug: string, productSlug: string): Observable<string> {
    return this.catalogue.getProductBySlug$(categorySlug, productSlug).pipe(
      map(
        (product) =>
          product?.description ??
          'Discover premium flower varieties from ALX Garden with detailed product information.',
      ),
    );
  }
}
