import {
  CatalogueCategory,
  CatalogueCategoryCard,
  CatalogueProduct,
} from '@features/catalogue/models/catalogue.models';
import { Observable } from 'rxjs';

export abstract class CatalogueReader {
  abstract getCategories$(): Observable<readonly CatalogueCategory[]>;
  abstract getCategoryCards$(): Observable<readonly CatalogueCategoryCard[]>;
  abstract getCategoryBySlug$(categorySlug: string): Observable<CatalogueCategory | undefined>;
  abstract getProductBySlug$(
    categorySlug: string,
    productSlug: string,
  ): Observable<CatalogueProduct | undefined>;
  abstract hasLoadError(): boolean;
}
