const SLUG_SEPARATOR_PATTERN = /[_\s]+/g;
const DUPLICATE_DASH_PATTERN = /-+/g;
const DIACRITICS_PATTERN = /[\u0300-\u036f]/g;
const EDGE_DASH_PATTERN = /^-|-$/g;
const NON_SLUG_PATTERN = /[^a-z0-9-]/g;

function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICS_PATTERN, '')
    .trim()
    .replace(SLUG_SEPARATOR_PATTERN, '-')
    .replace(NON_SLUG_PATTERN, '-')
    .replace(DUPLICATE_DASH_PATTERN, '-')
    .replace(EDGE_DASH_PATTERN, '');
}

export function toRouteSlug(value: string): string {
  return normalizeSlug(value);
}

export function slugMatches(
  value: string,
  input: string,
  aliases: readonly string[] = [],
): boolean {
  const normalizedInput = normalizeSlug(input);

  return [value, ...aliases].some((candidate) => normalizeSlug(candidate) === normalizedInput);
}
