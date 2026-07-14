import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { loadRuntimeAppConfig } from '@core/config/runtime-app-config';
import { ApplicationConfig } from '@angular/core';
import { createAppConfig } from '@app/app.config';
import { AppComponent } from '@app/app.component';
import { AppConfig } from '@core/config/app-config.model';

interface BootstrapDependencies {
  readonly bootstrapApplication: (
    config: ApplicationConfig,
    context?: BootstrapContext,
  ) => Promise<unknown>;
  readonly handleError?: (error: unknown) => void;
  readonly loadRuntimeAppConfig: () => Promise<AppConfig>;
}

const defaultDependencies: BootstrapDependencies = {
  bootstrapApplication: (config, context) => bootstrapApplication(AppComponent, config, context),
  handleError: renderBrowserBootstrapError,
  loadRuntimeAppConfig,
};

export async function bootstrapRuntimeApp(
  dependencies: BootstrapDependencies = defaultDependencies,
  context?: BootstrapContext,
): Promise<unknown> {
  try {
    const runtimeConfig = await dependencies.loadRuntimeAppConfig();
    return await dependencies.bootstrapApplication(createAppConfig(runtimeConfig), context);
  } catch (error) {
    if (!dependencies.handleError) {
      throw error;
    }

    dependencies.handleError(error);
    return undefined;
  }
}

function renderBrowserBootstrapError(error: unknown): void {
  const document = globalThis.document;

  if (!document) {
    throw error;
  }

  renderBootstrapError(document, console.error, error);
}

export function renderBootstrapError(
  doc: Document,
  logError: (message?: unknown, ...optionalParams: unknown[]) => void,
  error: unknown,
): void {
  logError('Failed to bootstrap application configuration.', error);

  const message = doc.createElement('main');
  message.style.maxWidth = '48rem';
  message.style.margin = '4rem auto';
  message.style.padding = '1.5rem';
  message.style.fontFamily = 'system-ui, sans-serif';
  message.style.lineHeight = '1.5';
  message.textContent =
    'Unable to load the application configuration. Please verify assets/config/app-config.json.';

  doc.body.replaceChildren(message);
}
