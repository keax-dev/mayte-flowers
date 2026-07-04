import { slugMatches, toRouteSlug } from '@features/catalogue/models/catalogue-slug.utils';

describe('catalogue slug utilities', () => {
  it('normalizes spaces, separators and diacritics into a route-safe slug', () => {
    // Esta utilidad convierte nombres "sucios" o con acentos
    // en slugs seguros para usar en rutas.
    expect(toRouteSlug('  Rosa MÃ¡gica__Premium  ')).toBe('rosa-magica-premium');
  });

  it('matches normalized aliases without changing the source data', () => {
    // Aquí comprobamos la lógica de comparación flexible entre slugs,
    // aceptando aliases normalizados sin mutar el dato de entrada.
    expect(slugMatches('hypericum', 'red-hympericu', ['red_hympericu'])).toBeTrue();
    expect(slugMatches('hypericum', 'gypsophila', ['hympericu'])).toBeFalse();
  });
});
