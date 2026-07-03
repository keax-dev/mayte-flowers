import {
  slugMatches,
  toRouteSlug
} from '@features/catalogue/models/catalogue-slug.utils';

describe('catalogue slug utilities', () => {
  it('normalizes spaces, separators and diacritics into a route-safe slug', () => {
    expect(toRouteSlug('  Rosa Mágica__Premium  ')).toBe('rosa-magica-premium');
  });

  it('matches normalized aliases without changing the source data', () => {
    expect(slugMatches('hypericum', 'red-hympericu', ['red_hympericu'])).toBeTrue();
    expect(slugMatches('hypericum', 'gypsophila', ['hympericu'])).toBeFalse();
  });
});
