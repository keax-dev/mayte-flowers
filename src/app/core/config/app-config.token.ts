import { InjectionToken, inject } from '@angular/core';
import {
  AnalyticsConfig,
  AppConfig,
  BrandConfig,
  ContactConfig,
  SeoConfig,
} from '@core/config/app-config.model';

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
export const ANALYTICS_CONFIG = new InjectionToken<AnalyticsConfig>('ANALYTICS_CONFIG', {
  providedIn: 'root',
  factory: () => inject(APP_CONFIG),
});
export const BRAND_CONFIG = new InjectionToken<BrandConfig>('BRAND_CONFIG', {
  providedIn: 'root',
  factory: () => inject(APP_CONFIG),
});
export const CONTACT_CONFIG = new InjectionToken<ContactConfig>('CONTACT_CONFIG', {
  providedIn: 'root',
  factory: () => inject(APP_CONFIG),
});
export const SEO_CONFIG = new InjectionToken<SeoConfig>('SEO_CONFIG', {
  providedIn: 'root',
  factory: () => inject(APP_CONFIG),
});
