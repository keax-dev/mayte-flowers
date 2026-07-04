import {
  resolveRuntimeAppConfigUrl,
  loadRuntimeAppConfig,
  parseAppConfig,
} from './runtime-app-config';

describe('runtime app config', () => {
  afterEach(() => {
    // Si en una prueba se hizo spy a fetch, aquí lo dejamos limpio
    // para que no contamine la siguiente.
    if ((window.fetch as jasmine.Spy | undefined)?.calls) {
      (window.fetch as jasmine.Spy).calls.reset();
    }
  });

  it('resolves the local config file for localhost hosts', () => {
    // Esta prueba verifica la regla de entorno local:
    // localhost y 127.0.0.1 deben cargar el archivo local.
    expect(resolveRuntimeAppConfigUrl('localhost', 'http://localhost:4200/')).toBe(
      'http://localhost:4200/assets/config/app-config.local.json',
    );
    expect(resolveRuntimeAppConfigUrl('127.0.0.1', 'http://127.0.0.1:4200/')).toBe(
      'http://127.0.0.1:4200/assets/config/app-config.local.json',
    );
  });

  it('resolves the production config file for non-local hosts', () => {
    // Para un dominio real, la app debe pedir el config productivo.
    expect(resolveRuntimeAppConfigUrl('alxgarden.com', 'https://alxgarden.com/')).toBe(
      'https://alxgarden.com/assets/config/app-config.json',
    );
  });

  it('parses a valid runtime config and allows an empty analytics id', () => {
    // Aquí probamos solo la validación/parseo del objeto,
    // sin depender todavía de fetch ni del navegador.
    const config = parseAppConfig({
      contactEmail: 'sales@alxgarden.com',
      defaultDescription: 'desc',
      defaultOgImage: '/assets/carrousel-1.jpg',
      gaMeasurementId: '',
      logo: '/assets/logo.jpg',
      mapUrl: 'https://maps.example.com',
      name: 'ALX Garden',
      openingHours: 'Opening at 8:00 AM',
      phoneDisplay: '+593 980086342',
      phoneHref: 'tel:+593980086342',
      quoteResponsePromise: 'quote promise',
      salesFocus: 'sales focus',
      siteUrl: 'https://alxgarden.com',
      tagline: 'tagline',
      whatsappUrl: 'https://api.whatsapp.com/send?phone=593980086342',
    });

    expect(config.name).toBe('ALX Garden');
    expect(config.gaMeasurementId).toBe('');
  });

  it('throws when required runtime config values are missing', () => {
    // Si faltan campos críticos, el parser debe fallar para evitar
    // que la app arranque con una configuración incompleta.
    expect(() =>
      parseAppConfig({
        contactEmail: 'sales@alxgarden.com',
      }),
    ).toThrowError(/Runtime config is missing valid string values/);
  });

  it('loads and validates the runtime config through fetch', async () => {
    // Simulamos la respuesta del archivo JSON remoto/local.
    spyOn(window, 'fetch').and.resolveTo({
      json: async () => ({
        contactEmail: 'sales@alxgarden.com',
        defaultDescription: 'desc',
        defaultOgImage: '/assets/carrousel-1.jpg',
        gaMeasurementId: '',
        logo: '/assets/logo.jpg',
        mapUrl: 'https://maps.example.com',
        name: 'ALX Garden',
        openingHours: 'Opening at 8:00 AM',
        phoneDisplay: '+593 980086342',
        phoneHref: 'tel:+593980086342',
        quoteResponsePromise: 'quote promise',
        salesFocus: 'sales focus',
        siteUrl: 'https://alxgarden.com',
        tagline: 'tagline',
        whatsappUrl: 'https://api.whatsapp.com/send?phone=593980086342',
      }),
      ok: true,
      status: 200,
      statusText: 'OK',
    } as Response);

    // Ejecutamos el flujo real de carga: URL -> fetch -> json -> validación.
    const config = await loadRuntimeAppConfig();

    // Validamos tanto la URL usada como el resultado final ya parseado.
    expect(window.fetch).toHaveBeenCalledWith(resolveRuntimeAppConfigUrl(), { cache: 'no-store' });
    expect(config.contactEmail).toBe('sales@alxgarden.com');
  });
});
