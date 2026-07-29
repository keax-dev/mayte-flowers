export interface AppConfig {
  readonly contactEmail: string;
  readonly defaultDescription: string;
  readonly defaultOgImage: string;
  readonly gaMeasurementId: string;
  readonly logo: string;
  readonly mapUrl: string;
  readonly name: string;
  readonly openingHours: string;
  readonly phoneDisplay: string;
  readonly phoneHref: string;
  readonly quoteResponsePromise: string;
  readonly salesFocus: string;
  readonly siteUrl: string;
  readonly tagline: string;
  readonly whatsappUrl: string;
}

export type AnalyticsConfig = Pick<AppConfig, 'gaMeasurementId' | 'siteUrl'>;

export type BrandConfig = Pick<
  AppConfig,
  'logo' | 'name' | 'openingHours' | 'salesFocus' | 'tagline'
>;

export type ContactConfig = Pick<
  AppConfig,
  'contactEmail' | 'mapUrl' | 'phoneDisplay' | 'phoneHref' | 'quoteResponsePromise' | 'whatsappUrl'
>;

export type SeoConfig = Pick<
  AppConfig,
  | 'contactEmail'
  | 'defaultDescription'
  | 'defaultOgImage'
  | 'logo'
  | 'mapUrl'
  | 'name'
  | 'phoneDisplay'
  | 'phoneHref'
  | 'siteUrl'
  | 'whatsappUrl'
>;
