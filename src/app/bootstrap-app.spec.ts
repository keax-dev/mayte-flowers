import { bootstrapRuntimeApp, renderBootstrapError } from './bootstrap-app';
import { TEST_APP_CONFIG } from '@app/testing/test-app-config';
import { APP_CONFIG } from '@core/config/app-config.token';

describe('bootstrapRuntimeApp', () => {
  it('loads the runtime config and passes it into the application providers', async () => {
    // No levantamos Angular real aquí.
    // En su lugar, espiamos la función que normalmente haría el bootstrap.
    const bootstrapApplication = jasmine.createSpy('bootstrapApplication').and.resolveTo();

    await bootstrapRuntimeApp({
      bootstrapApplication,
      document,
      loadRuntimeAppConfig: async () => TEST_APP_CONFIG,
      logError: jasmine.createSpy('logError'),
    });

    expect(bootstrapApplication).toHaveBeenCalled();

    // Tomamos el objeto de configuración con el que se intentó arrancar la app
    // y buscamos el provider que inyecta APP_CONFIG.
    const configArgument = bootstrapApplication.calls.mostRecent().args[0];
    const appConfigProvider = (configArgument.providers ?? []).find(
      (provider: unknown): provider is { provide: unknown; useValue: unknown } =>
        !!provider &&
        typeof provider === 'object' &&
        'provide' in provider &&
        'useValue' in provider &&
        provider.provide === APP_CONFIG,
    );

    // Si esto pasa, comprobamos que el runtime config sí se propagó al árbol DI.
    expect(appConfigProvider?.useValue).toEqual(TEST_APP_CONFIG);
  });

  it('renders a fallback error message when runtime config loading fails', async () => {
    // Creamos un document aislado para no tocar el DOM real de las pruebas.
    const testDocument = document.implementation.createHTMLDocument('bootstrap failure');
    const logError = jasmine.createSpy('logError');

    await bootstrapRuntimeApp({
      bootstrapApplication: jasmine.createSpy('bootstrapApplication'),
      document: testDocument,
      loadRuntimeAppConfig: async () => {
        // Forzamos el error que ocurriría si el JSON de config no existiera
        // o viniera corrupto.
        throw new Error('missing config');
      },
      logError,
    });

    // La app no debe quedar en blanco: debe registrar el error
    // y mostrar un mensaje entendible al usuario/equipo.
    expect(logError).toHaveBeenCalled();
    expect(testDocument.body.textContent).toContain(
      'Unable to load the application configuration.',
    );
  });
});

describe('renderBootstrapError', () => {
  it('replaces the document body with a readable bootstrap failure message', () => {
    const testDocument = document.implementation.createHTMLDocument('render error');
    const logError = jasmine.createSpy('logError');

    renderBootstrapError(testDocument, logError, new Error('broken'));

    // Esta prueba se enfoca solo en la función de pintado del error,
    // sin pasar por todo el flujo de bootstrap.
    expect(logError).toHaveBeenCalled();
    expect(testDocument.body.querySelector('main')?.textContent).toContain(
      'Please verify assets/config/app-config.json.',
    );
  });
});
