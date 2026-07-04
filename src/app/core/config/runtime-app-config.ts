import { AppConfig } from '@core/config/app-config.model';

const LOCAL_HOSTS = new Set(['127.0.0.1', '0.0.0.0', 'localhost']);
const PRODUCTION_CONFIG_PATH = 'assets/config/app-config.json';
const LOCAL_CONFIG_PATH = 'assets/config/app-config.local.json';
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

export async function loadRuntimeAppConfig(): Promise<AppConfig> {
  const response = await fetch(resolveRuntimeAppConfigUrl(), {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Unable to load runtime config: ${response.status} ${response.statusText}`);
  }

  return parseAppConfig((await response.json()) as unknown);
}

export function resolveRuntimeAppConfigUrl(
  hostname = window.location.hostname,
  baseUri = document.baseURI,
): string {
  const runtimePath = LOCAL_HOSTS.has(hostname) ? LOCAL_CONFIG_PATH : PRODUCTION_CONFIG_PATH;

  return new URL(runtimePath, baseUri).toString();
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
