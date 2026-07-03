import { InjectionToken } from '@angular/core';
import { AppConfig } from '@core/config/app-config.model';

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
