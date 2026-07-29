import { ActivatedRouteSnapshot } from '@angular/router';
import { StructuredData, SeoCategory, SeoProduct } from '@core/seo/seo.models';
import { buildBreadcrumbSchema } from '@core/seo/breadcrumb-schema';
import { buildAbsoluteUrl } from '@core/config/url.utils';
import { SeoConfig } from '@core/config/app-config.model';
import {
  buildOrganizationSchema,
  buildCollectionSchema,
  buildProductSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
} from '@core/seo/schema-builders';

export interface SeoPageState {
  readonly description: string;
  readonly graph: readonly StructuredData[];
  readonly image: string;
  readonly keywords: string;
  readonly ogType: string;
  readonly pageTitle: string;
  readonly pageUrl: string;
  readonly robots: string;
  readonly siteName: string;
}

export function findActiveRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  let current = route;

  while (current.firstChild) {
    current = current.firstChild;
  }

  return current;
}

export function buildSeoPageState(
  activeRoute: ActivatedRouteSnapshot,
  routeRoot: ActivatedRouteSnapshot,
  config: SeoConfig,
  currentTitle: string,
  routerUrl: string,
): SeoPageState {
  const description =
    (activeRoute.data['description'] as string | undefined) ?? config.defaultDescription;
  const image = resolveImage(activeRoute, config);
  const pageTitle = currentTitle || config.name;
  const pageUrl = buildAbsoluteUrl(routerUrl === '/' ? '/home' : routerUrl, config.siteUrl);
  const product = activeRoute.data['productData'] as SeoProduct | undefined;

  return {
    description,
    graph: buildStructuredDataGraph(
      routeRoot,
      activeRoute,
      config,
      pageTitle,
      description,
      pageUrl,
      image,
    ),
    image,
    keywords: buildKeywords(activeRoute, config.name),
    ogType: product ? 'product' : ((activeRoute.data['ogType'] as string | undefined) ?? 'website'),
    pageTitle,
    pageUrl,
    robots:
      (activeRoute.data['robots'] as string | undefined) ??
      (activeRoute.routeConfig?.path === 'not-found' ? 'noindex, nofollow' : 'index, follow'),
    siteName: config.name,
  };
}

function buildKeywords(activeRoute: ActivatedRouteSnapshot, companyName: string): string {
  const product = activeRoute.data['productData'] as SeoProduct | undefined;
  const category = activeRoute.data['categoryData'] as SeoCategory | undefined;

  return [
    companyName,
    'fresh-cut flowers',
    'flower supplier',
    'flower exporter',
    category?.name,
    product?.name,
  ]
    .filter(Boolean)
    .join(', ');
}

function resolveImage(activeRoute: ActivatedRouteSnapshot, config: SeoConfig): string {
  const product = activeRoute.data['productData'] as SeoProduct | undefined;
  const category = activeRoute.data['categoryData'] as SeoCategory | undefined;
  const routeImage = activeRoute.data['image'] as string | undefined;

  return buildAbsoluteUrl(
    product?.image ?? category?.image ?? routeImage ?? config.defaultOgImage,
    config.siteUrl,
  );
}

function buildStructuredDataGraph(
  routeRoot: ActivatedRouteSnapshot,
  activeRoute: ActivatedRouteSnapshot,
  config: SeoConfig,
  pageTitle: string,
  description: string,
  pageUrl: string,
  image: string,
): readonly StructuredData[] {
  const product = activeRoute.data['productData'] as SeoProduct | undefined;
  const category = activeRoute.data['categoryData'] as SeoCategory | undefined;
  const graph: StructuredData[] = [
    buildOrganizationSchema(config),
    buildBreadcrumbSchema(routeRoot, config),
  ];

  if (product) {
    graph.push(buildProductSchema(config, product, category, description, pageUrl, image));
  } else if (category) {
    graph.push(buildCollectionSchema(config, category, description, pageUrl, image));
  } else {
    graph.push(buildWebsiteSchema(config));
    graph.push(buildWebPageSchema(pageTitle, description, pageUrl, image));
  }

  return graph;
}
