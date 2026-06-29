export interface ProductHeadOption {
  description: string;
  label: string;
}

export interface CommercialCatalogueDetails {
  availability?: string;
  idealFor?: readonly string[];
  minimumOrder?: string;
  packing?: string;
  seasonality?: string;
}

export interface CatalogueProduct extends CommercialCatalogueDetails {
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

export interface CatalogueCategory extends CommercialCatalogueDetails {
  aliases?: string[];
  buyerNote?: string;
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
  summary?: string;
  slug: string;
}
