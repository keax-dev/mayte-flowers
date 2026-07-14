import { provideServerRendering, withRoutes } from '@angular/ssr';
import { ApplicationConfig } from '@angular/core';

import { serverRoutes } from './app.routes.server';

export const serverAppConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};
