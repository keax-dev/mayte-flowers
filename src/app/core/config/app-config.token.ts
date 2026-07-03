import { APP_CONFIG_VALUE } from '@core/config/app-config';
import { InjectionToken } from '@angular/core';
import { AppConfig } from '@core/config/app-config.model';

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG', {
  factory: () => APP_CONFIG_VALUE,
});
