export type StructuredData = Record<string, unknown>;

interface SeoCommercialDetails {
  readonly availability?: string;
  readonly minimumOrder?: string;
  readonly packing?: string;
}

export interface SeoProduct extends SeoCommercialDetails {
  readonly color?: string;
  readonly description: string;
  readonly image: string;
  readonly length?: string;
  readonly life?: string;
  readonly name: string;
  readonly routeSlug?: string;
  readonly slug: string;
}

export interface SeoCategory extends SeoCommercialDetails {
  readonly image: string;
  readonly name: string;
  readonly products: readonly SeoProduct[];
  readonly routeSlug?: string;
  readonly slug: string;
}
