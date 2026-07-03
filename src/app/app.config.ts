import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from '@app/app.routes';
import {
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
  provideRouter,
} from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
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
