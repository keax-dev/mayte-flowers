import {
  CatalogueCategory,
  CatalogueCategoryCard,
  CatalogueProduct,
} from '@features/catalogue/models/catalogue.models';
import { toRouteSlug } from '@features/catalogue/models/catalogue-slug.utils';

export function normalizeCatalogue(
  categories: readonly CatalogueCategory[],
): readonly CatalogueCategory[] {
  return categories.map<CatalogueCategory>((category) => ({
    ...category,
    routeSlug: toRouteSlug(category.slug),
    products: category.products.map<CatalogueProduct>((product) => ({
      ...product,
      routeSlug: toRouteSlug(product.slug),
    })),
  }));
}

export function toCategoryCards(
  categories: readonly CatalogueCategory[],
): readonly CatalogueCategoryCard[] {
  return categories.map<CatalogueCategoryCard>((category) => ({
    slug: category.slug,
    name: category.name,
    image: category.image,
    summary: category.buyerNote,
    route: category.directProductSlug
      ? [
          '/gallery',
          category.routeSlug ?? toRouteSlug(category.slug),
          toRouteSlug(category.directProductSlug),
        ]
      : ['/gallery', category.routeSlug ?? toRouteSlug(category.slug)],
  }));
}
