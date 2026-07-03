import { SeoCategory, SeoProduct, StructuredData } from '@core/seo/seo.models';
import { createSocialLinks } from '@core/config/social-links.config';
import { buildAbsoluteUrl } from '@core/config/url.utils';
import { AppConfig } from '@core/config/app-config.model';

export function buildCollectionSchema(
  config: AppConfig,
  category: SeoCategory,
  description: string,
  pageUrl: string,
  image: string,
): StructuredData {
  return {
    '@type': 'CollectionPage',
    name: `${category.name} | ${config.name}`,
    description,
    url: pageUrl,
    image,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: category.products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.name,
        url: buildAbsoluteUrl(
          `/gallery/${category.routeSlug ?? category.slug}/${product.routeSlug ?? product.slug}`,
          config.siteUrl,
        ),
      })),
    },
  };
}

export function buildOrganizationSchema(config: AppConfig): StructuredData {
  return {
    '@type': 'Organization',
    name: config.name,
    url: config.siteUrl,
    logo: buildAbsoluteUrl(config.logo, config.siteUrl),
    image: buildAbsoluteUrl(config.defaultOgImage, config.siteUrl),
    description: config.defaultDescription,
    email: config.contactEmail,
    telephone: config.phoneDisplay,
    sameAs: createSocialLinks(config)
      .filter((link) => link.openInNewTab)
      .map((link) => link.href),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: config.contactEmail,
        telephone: config.phoneDisplay,
        availableLanguage: ['en', 'es'],
      },
    ],
  };
}

export function buildProductSchema(
  config: AppConfig,
  product: SeoProduct,
  category: SeoCategory | undefined,
  description: string,
  pageUrl: string,
  image: string,
): StructuredData {
  return {
    '@type': 'Product',
    name: product.name,
    brand: {
      '@type': 'Brand',
      name: config.name,
    },
    category: category?.name ?? 'Flowers',
    description,
    image,
    url: pageUrl,
    additionalProperty: [
      product.color && {
        '@type': 'PropertyValue',
        name: 'Color',
        value: product.color,
      },
      product.length && {
        '@type': 'PropertyValue',
        name: 'Stem length',
        value: product.length,
      },
      product.life && {
        '@type': 'PropertyValue',
        name: 'Vase life',
        value: product.life,
      },
      (product.availability ?? category?.availability) && {
        '@type': 'PropertyValue',
        name: 'Availability',
        value: product.availability ?? category?.availability,
      },
      (product.packing ?? category?.packing) && {
        '@type': 'PropertyValue',
        name: 'Packing',
        value: product.packing ?? category?.packing,
      },
      (product.minimumOrder ?? category?.minimumOrder) && {
        '@type': 'PropertyValue',
        name: 'Minimum order',
        value: product.minimumOrder ?? category?.minimumOrder,
      },
    ].filter(Boolean),
  };
}

export function buildWebPageSchema(
  pageTitle: string,
  description: string,
  pageUrl: string,
  image: string,
): StructuredData {
  return {
    '@type': 'WebPage',
    name: pageTitle,
    description,
    url: pageUrl,
    image,
  };
}

export function buildWebsiteSchema(config: AppConfig): StructuredData {
  return {
    '@type': 'WebSite',
    name: config.name,
    url: config.siteUrl,
    description: config.defaultDescription,
    inLanguage: ['en', 'es'],
  };
}
