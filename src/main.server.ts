import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { loadServerRuntimeAppConfig } from '@core/config/runtime-app-config.server';
import { mergeApplicationConfig } from '@angular/core';
import { bootstrapRuntimeApp } from '@app/bootstrap-app';
import { serverAppConfig } from '@app/app.config.server';
import { AppComponent } from '@app/app.component';

const bootstrap = (context: BootstrapContext) =>
  bootstrapRuntimeApp(
    {
      bootstrapApplication: (appConfig, bootstrapContext) =>
        bootstrapApplication(
          AppComponent,
          mergeApplicationConfig(appConfig, serverAppConfig),
          bootstrapContext,
        ),
      loadRuntimeAppConfig: loadServerRuntimeAppConfig,
    },
    context,
  );

export default bootstrap;
