import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from '@app/app.component';
import { createAppConfig } from '@app/app.config';
import { AppConfig } from '@core/config/app-config.model';
import { loadRuntimeAppConfig } from '@core/config/runtime-app-config';

interface BootstrapDependencies {
  readonly bootstrapApplication: (config: ReturnType<typeof createAppConfig>) => Promise<unknown>;
  readonly document: Document;
  readonly loadRuntimeAppConfig: () => Promise<AppConfig>;
  readonly logError: (message?: unknown, ...optionalParams: unknown[]) => void;
}

const defaultDependencies: BootstrapDependencies = {
  bootstrapApplication: (config) => bootstrapApplication(AppComponent, config),
  document,
  loadRuntimeAppConfig,
  logError: console.error,
};

export async function bootstrapRuntimeApp(
  dependencies: BootstrapDependencies = defaultDependencies,
): Promise<void> {
  try {
    const runtimeConfig = await dependencies.loadRuntimeAppConfig();
    await dependencies.bootstrapApplication(createAppConfig(runtimeConfig));
  } catch (error) {
    renderBootstrapError(dependencies.document, dependencies.logError, error);
  }
}

export function renderBootstrapError(
  doc: Document,
  logError: BootstrapDependencies['logError'],
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
