import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from '@app/app.routes';
import { APP_CONFIG } from '@core/config/app-config.token';
import { AppConfig } from '@core/config/app-config.model';
import {
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
  provideRouter,
} from '@angular/router';

export function createAppConfig(runtimeConfig: AppConfig): ApplicationConfig {
  return {
    providers: [
      { provide: APP_CONFIG, useValue: runtimeConfig },
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideClientHydration(withEventReplay()),
      provideRouter(
        appRoutes,
        withComponentInputBinding(),
        withInMemoryScrolling({
          anchorScrolling: 'enabled',
          scrollPositionRestoration: 'enabled',
        }),
        withViewTransitions({ skipInitialTransition: true }),
      ),
      provideHttpClient(),
    ],
  };
}
