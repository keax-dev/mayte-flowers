export interface ProductHeadOption {
  description: string;
  label: string;
}

export interface CatalogueProduct {
  aliases?: string[];
  color?: string;
  description: string;
  head?: string;
  headOptions?: readonly ProductHeadOption[];
  image: string;
  length?: string;
  life?: string;
  name: string;
  routeSlug?: string;
  slug: string;
}

export interface CatalogueCategory {
  aliases?: string[];
  directProductSlug?: string;
  image: string;
  name: string;
  products: readonly CatalogueProduct[];
  routeSlug?: string;
  slug: string;
}

export interface CatalogueCategoryCard {
  image: string;
  name: string;
  route: readonly string[];
  slug: string;
}
