import { TEST_APP_CONFIG } from '@app/testing/test-app-config';
import {
  RUNTIME_APP_CONFIG_SCRIPT_ID,
  upsertInlineRuntimeAppConfig,
  readInlineRuntimeAppConfig,
  resolveRuntimeAppConfigUrl,
  loadRuntimeAppConfig,
  parseAppConfig,
} from './runtime-app-config';

describe('runtime app config', () => {
  afterEach(() => {
    if ((window.fetch as jasmine.Spy | undefined)?.calls) {
      (window.fetch as jasmine.Spy).calls.reset();
    }
  });

  it('resolves the local config file for localhost hosts', () => {
    expect(resolveRuntimeAppConfigUrl('localhost', 'http://localhost:4200/')).toBe(
      'http://localhost:4200/assets/config/app-config.local.json',
    );
    expect(resolveRuntimeAppConfigUrl('127.0.0.1', 'http://127.0.0.1:4200/')).toBe(
      'http://127.0.0.1:4200/assets/config/app-config.local.json',
    );
  });

  it('resolves the production config file for non-local hosts', () => {
    expect(resolveRuntimeAppConfigUrl('alxgarden.com', 'https://alxgarden.com/')).toBe(
      'https://alxgarden.com/assets/config/app-config.json',
    );
  });

  it('parses a valid runtime config and allows an empty analytics id', () => {
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
    expect(() =>
      parseAppConfig({
        contactEmail: 'sales@alxgarden.com',
      }),
    ).toThrowError(/Runtime config is missing valid string values/);
  });

  it('loads and validates the runtime config through fetch', async () => {
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

    const config = await loadRuntimeAppConfig();

    expect(window.fetch).toHaveBeenCalledWith(resolveRuntimeAppConfigUrl(), { cache: 'no-store' });
    expect(config.contactEmail).toBe('sales@alxgarden.com');
  });

  it('reuses the inline config when the document already contains it', async () => {
    const testDocument = document.implementation.createHTMLDocument('inline runtime config');
    const fetchSpy = jasmine.createSpy('fetchSpy');

    upsertInlineRuntimeAppConfig(testDocument, TEST_APP_CONFIG);

    const config = await loadRuntimeAppConfig({
      document: testDocument,
      fetchFn: fetchSpy as typeof fetch,
      hostname: 'alxgarden.com',
    });

    expect(config).toEqual(TEST_APP_CONFIG);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('ignores the inline config for localhost and still loads the local file', async () => {
    const testDocument = document.implementation.createHTMLDocument('local runtime config');
    const fetchSpy = jasmine.createSpy('fetchSpy').and.resolveTo({
      json: async () => TEST_APP_CONFIG,
      ok: true,
      status: 200,
      statusText: 'OK',
    } as Response);

    upsertInlineRuntimeAppConfig(testDocument, {
      ...TEST_APP_CONFIG,
      name: 'Server Config',
    });

    const config = await loadRuntimeAppConfig({
      baseUri: 'http://localhost/',
      document: testDocument,
      fetchFn: fetchSpy as typeof fetch,
      hostname: 'localhost',
    });

    expect(config).toEqual(TEST_APP_CONFIG);
    expect(fetchSpy).toHaveBeenCalledWith('http://localhost/assets/config/app-config.local.json', {
      cache: 'no-store',
    });
  });

  it('reads the serialized runtime config from the document head', () => {
    const testDocument = document.implementation.createHTMLDocument('serialized config');

    upsertInlineRuntimeAppConfig(testDocument, TEST_APP_CONFIG);

    expect(readInlineRuntimeAppConfig(testDocument)).toEqual(TEST_APP_CONFIG);
    expect(testDocument.getElementById(RUNTIME_APP_CONFIG_SCRIPT_ID)?.textContent).toContain(
      TEST_APP_CONFIG.name,
    );
  });
});
