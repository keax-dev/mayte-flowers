import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from '@app/app.component';
import { createAppConfig } from '@app/app.config';
import { loadRuntimeAppConfig } from '@core/config/runtime-app-config';

void bootstrap();

async function bootstrap(): Promise<void> {
  try {
    const runtimeConfig = await loadRuntimeAppConfig();
    await bootstrapApplication(AppComponent, createAppConfig(runtimeConfig));
  } catch (error) {
    renderBootstrapError(error);
  }
}

function renderBootstrapError(error: unknown): void {
  console.error('Failed to bootstrap application configuration.', error);

  const message = document.createElement('main');
  message.style.maxWidth = '48rem';
  message.style.margin = '4rem auto';
  message.style.padding = '1.5rem';
  message.style.fontFamily = 'system-ui, sans-serif';
  message.style.lineHeight = '1.5';
  message.textContent =
    'Unable to load the application configuration. Please verify assets/config/app-config.json.';

  document.body.replaceChildren(message);
}
