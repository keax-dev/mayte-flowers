import { bootstrapRuntimeApp, renderBootstrapError } from './bootstrap-app';
import { TEST_APP_CONFIG } from '@app/testing/test-app-config';
import { APP_CONFIG } from '@core/config/app-config.token';

describe('bootstrapRuntimeApp', () => {
  it('loads the runtime config and passes it into the application providers', async () => {
    const bootstrapApplication = jasmine.createSpy('bootstrapApplication').and.resolveTo();

    await bootstrapRuntimeApp({
      bootstrapApplication,
      loadRuntimeAppConfig: async () => TEST_APP_CONFIG,
    });

    expect(bootstrapApplication).toHaveBeenCalled();

    const configArgument = bootstrapApplication.calls.mostRecent().args[0];
    const appConfigProvider = (configArgument.providers ?? []).find(
      (provider: unknown): provider is { provide: unknown; useValue: unknown } =>
        !!provider &&
        typeof provider === 'object' &&
        'provide' in provider &&
        'useValue' in provider &&
        provider.provide === APP_CONFIG,
    );

    expect(appConfigProvider?.useValue).toEqual(TEST_APP_CONFIG);
  });

  it('renders a fallback error message when runtime config loading fails', async () => {
    const testDocument = document.implementation.createHTMLDocument('bootstrap failure');
    const logError = jasmine.createSpy('logError');
    const handleError = (error: unknown) => renderBootstrapError(testDocument, logError, error);

    await bootstrapRuntimeApp({
      bootstrapApplication: jasmine.createSpy('bootstrapApplication'),
      handleError,
      loadRuntimeAppConfig: async () => {
        throw new Error('missing config');
      },
    });

    expect(logError).toHaveBeenCalled();
    expect(testDocument.body.textContent).toContain(
      'Unable to load the application configuration.',
    );
  });

  it('rethrows bootstrap failures when no error handler is provided', async () => {
    await expectAsync(
      bootstrapRuntimeApp({
        bootstrapApplication: jasmine.createSpy('bootstrapApplication'),
        loadRuntimeAppConfig: async () => {
          throw new Error('missing config');
        },
      }),
    ).toBeRejectedWithError('missing config');
  });
});

describe('renderBootstrapError', () => {
  it('replaces the document body with a readable bootstrap failure message', () => {
    const testDocument = document.implementation.createHTMLDocument('render error');
    const logError = jasmine.createSpy('logError');

    renderBootstrapError(testDocument, logError, new Error('broken'));

    expect(logError).toHaveBeenCalled();
    expect(testDocument.body.querySelector('main')?.textContent).toContain(
      'Please verify assets/config/app-config.json.',
    );
  });
});
