import { AppConfig } from '@core/config/app-config.model';

const LOCAL_HOSTS = new Set(['127.0.0.1', '0.0.0.0', 'localhost']);
const PRODUCTION_CONFIG_PATH = 'assets/config/app-config.json';
const LOCAL_CONFIG_PATH = 'assets/config/app-config.local.json';
export const RUNTIME_APP_CONFIG_SCRIPT_ID = 'app-runtime-config';
const APP_CONFIG_KEYS = [
  'contactEmail',
  'defaultDescription',
  'defaultOgImage',
  'gaMeasurementId',
  'logo',
  'mapUrl',
  'name',
  'openingHours',
  'phoneDisplay',
  'phoneHref',
  'quoteResponsePromise',
  'salesFocus',
  'siteUrl',
  'tagline',
  'whatsappUrl',
] as const satisfies readonly (keyof AppConfig)[];
const OPTIONAL_EMPTY_STRING_KEYS = new Set<keyof AppConfig>(['gaMeasurementId']);

interface RuntimeAppConfigLoaderOptions {
  readonly baseUri?: string;
  readonly document?: Pick<Document, 'getElementById'> | null;
  readonly fetchFn?: typeof fetch;
  readonly hostname?: string;
}

export async function loadRuntimeAppConfig(
  options: RuntimeAppConfigLoaderOptions = {},
): Promise<AppConfig> {
  const hostname = options.hostname ?? globalThis.location?.hostname ?? 'localhost';
  const inlineConfig = LOCAL_HOSTS.has(hostname)
    ? null
    : readInlineRuntimeAppConfig(options.document ?? globalThis.document);

  if (inlineConfig) {
    return inlineConfig;
  }

  const fetchFn = options.fetchFn ?? globalThis.fetch?.bind(globalThis);

  if (!fetchFn) {
    throw new Error('Fetch API is not available to load the runtime config.');
  }

  const response = await fetchFn(resolveRuntimeAppConfigUrl(hostname, options.baseUri), {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Unable to load runtime config: ${response.status} ${response.statusText}`);
  }

  return parseAppConfig((await response.json()) as unknown);
}

export function resolveRuntimeAppConfigUrl(
  hostname = globalThis.location?.hostname ?? 'localhost',
  baseUri = globalThis.document?.baseURI ?? 'http://localhost/',
): string {
  const runtimePath = LOCAL_HOSTS.has(hostname) ? LOCAL_CONFIG_PATH : PRODUCTION_CONFIG_PATH;

  return new URL(runtimePath, baseUri).toString();
}

export function readInlineRuntimeAppConfig(
  doc: Pick<Document, 'getElementById'> | null | undefined,
): AppConfig | null {
  const script = doc?.getElementById(RUNTIME_APP_CONFIG_SCRIPT_ID);
  const rawConfig = script?.textContent?.trim();

  if (!rawConfig) {
    return null;
  }

  return parseAppConfig(JSON.parse(rawConfig) as unknown);
}

export function upsertInlineRuntimeAppConfig(doc: Document, config: AppConfig): void {
  let script = doc.getElementById(RUNTIME_APP_CONFIG_SCRIPT_ID) as HTMLScriptElement | null;

  if (!script) {
    script = doc.createElement('script');
    script.id = RUNTIME_APP_CONFIG_SCRIPT_ID;
    script.type = 'application/json';
    doc.head.appendChild(script);
  }

  script.textContent = JSON.stringify(config);
}

export function parseAppConfig(value: unknown): AppConfig {
  if (!isRecord(value)) {
    throw new Error('Runtime config must be a JSON object.');
  }

  const invalidKeys = APP_CONFIG_KEYS.filter((key) =>
    OPTIONAL_EMPTY_STRING_KEYS.has(key)
      ? !hasStringValue(value[key])
      : !isNonEmptyString(value[key]),
  );

  if (invalidKeys.length > 0) {
    throw new Error(`Runtime config is missing valid string values for: ${invalidKeys.join(', ')}`);
  }

  return {
    contactEmail: getString(value, 'contactEmail'),
    defaultDescription: getString(value, 'defaultDescription'),
    defaultOgImage: getString(value, 'defaultOgImage'),
    gaMeasurementId: getString(value, 'gaMeasurementId'),
    logo: getString(value, 'logo'),
    mapUrl: getString(value, 'mapUrl'),
    name: getString(value, 'name'),
    openingHours: getString(value, 'openingHours'),
    phoneDisplay: getString(value, 'phoneDisplay'),
    phoneHref: getString(value, 'phoneHref'),
    quoteResponsePromise: getString(value, 'quoteResponsePromise'),
    salesFocus: getString(value, 'salesFocus'),
    siteUrl: getString(value, 'siteUrl'),
    tagline: getString(value, 'tagline'),
    whatsappUrl: getString(value, 'whatsappUrl'),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function hasStringValue(value: unknown): value is string {
  return typeof value === 'string';
}

function getString(record: Record<string, unknown>, key: keyof AppConfig): string {
  const value = record[key];

  if (typeof value !== 'string') {
    throw new Error(`Runtime config key "${key}" must be a string.`);
  }

  return value;
}
