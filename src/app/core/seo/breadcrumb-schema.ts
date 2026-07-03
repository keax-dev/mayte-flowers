import { SeoCategory, SeoProduct, StructuredData } from '@core/seo/seo.models';
import { ActivatedRouteSnapshot } from '@angular/router';
import { buildAbsoluteUrl } from '@core/config/url.utils';
import { AppConfig } from '@core/config/app-config.model';

export function buildBreadcrumbSchema(
  root: ActivatedRouteSnapshot,
  config: AppConfig,
): StructuredData {
  const itemListElement: StructuredData[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: buildAbsoluteUrl('/home', config.siteUrl),
    },
  ];

  let current = root.firstChild;
  let currentUrl = '';
  let position = 2;

  while (current) {
    const segment = current.url.map((part) => part.path).join('/');

    if (segment) {
      currentUrl += `/${segment}`;
      itemListElement.push({
        '@type': 'ListItem',
        position,
        name: getRouteLabel(current, config.name),
        item: buildAbsoluteUrl(currentUrl, config.siteUrl),
      });
      position += 1;
    }

    current = current.firstChild;
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

function getRouteLabel(
  route: ActivatedRouteSnapshot,
  companyName: string,
): string {
  const product = route.data['productData'] as SeoProduct | undefined;
  const category = route.data['categoryData'] as SeoCategory | undefined;

  if (product) {
    return product.name;
  }

  if (category) {
    return category.name;
  }

  const labels: Record<string, string> = {
    home: 'Home',
    'about-us': 'About Us',
    gallery: 'Products',
    'not-found': 'Page Not Found',
  };
  const path = route.routeConfig?.path ?? '';
  const title = route.title;

  return (
    labels[path] ??
    (typeof title === 'string'
      ? title.replace(` | ${companyName}`, '')
      : path || companyName)
  );
}
