import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router
} from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter, map, startWith } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  COMPANY_INFO,
  SOCIAL_LINKS,
  buildAbsoluteUrl
} from '@core/data/company.data';
import {
  CatalogueCategory,
  CatalogueProduct
} from '@features/catalogue/data/catalogue.models';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly title = inject(Title);

  initialize(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        map(() => this.findActiveRoute(this.activatedRoute.snapshot.root)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((activeRoute) => this.updateMetadata(activeRoute));
  }

  private updateMetadata(activeRoute: ActivatedRouteSnapshot): void {
    const description =
      (activeRoute.data['description'] as string | undefined) ??
      COMPANY_INFO.defaultDescription;
    const image = this.resolveImage(activeRoute);
    const keywords = this.buildKeywords(activeRoute);
    const ogType = this.resolveOgType(activeRoute);
    const robots =
      (activeRoute.data['robots'] as string | undefined) ??
      (activeRoute.routeConfig?.path === 'not-found'
        ? 'noindex, nofollow'
        : 'index, follow');
    const pageTitle = this.title.getTitle() || COMPANY_INFO.name;
    const pageUrl = buildAbsoluteUrl(this.router.url === '/' ? '/home' : this.router.url);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ name: 'robots', content: robots });

    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: pageTitle });
    this.meta.updateTag({ property: 'og:type', content: ogType });
    this.meta.updateTag({ property: 'og:url', content: pageUrl });
    this.meta.updateTag({ property: 'og:site_name', content: COMPANY_INFO.name });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.updateCanonicalLink(pageUrl);
    this.updateStructuredData(activeRoute, pageTitle, description, pageUrl, image);
  }

  private buildBreadcrumbSchema(): Record<string, unknown> {
    const itemListElement = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: buildAbsoluteUrl('/home')
      }
    ];

    let current = this.activatedRoute.snapshot.root.firstChild;
    let currentUrl = '';
    let position = 2;

    while (current) {
      const segment = current.url.map((part) => part.path).join('/');

      if (segment) {
        currentUrl += `/${segment}`;
        itemListElement.push({
          '@type': 'ListItem',
          position,
          name: this.getRouteLabel(current),
          item: buildAbsoluteUrl(currentUrl)
        });
        position += 1;
      }

      current = current.firstChild;
    }

    return {
      '@type': 'BreadcrumbList',
      itemListElement
    };
  }

  private buildCollectionSchema(
    category: CatalogueCategory,
    description: string,
    pageUrl: string,
    image: string
  ): Record<string, unknown> {
    return {
      '@type': 'CollectionPage',
      name: `${category.name} | ${COMPANY_INFO.name}`,
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
            `/gallery/${category.routeSlug ?? category.slug}/${product.routeSlug ?? product.slug}`
          )
        }))
      }
    };
  }

  private buildKeywords(activeRoute: ActivatedRouteSnapshot): string {
    const product = activeRoute.data['productData'] as CatalogueProduct | undefined;
    const category = activeRoute.data['categoryData'] as CatalogueCategory | undefined;

    return [
      COMPANY_INFO.name,
      'fresh-cut flowers',
      'flower supplier',
      'flower exporter',
      category?.name,
      product?.name
    ]
      .filter(Boolean)
      .join(', ');
  }

  private buildOrganizationSchema(): Record<string, unknown> {
    return {
      '@type': 'Organization',
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.siteUrl,
      logo: buildAbsoluteUrl(COMPANY_INFO.logo),
      image: buildAbsoluteUrl(COMPANY_INFO.defaultOgImage),
      description: COMPANY_INFO.defaultDescription,
      email: COMPANY_INFO.contactEmail,
      telephone: COMPANY_INFO.phoneDisplay,
      sameAs: SOCIAL_LINKS.filter((link) => link.openInNewTab).map((link) => link.href),
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: COMPANY_INFO.contactEmail,
          telephone: COMPANY_INFO.phoneDisplay,
          availableLanguage: ['en', 'es']
        }
      ]
    };
  }

  private buildProductSchema(
    product: CatalogueProduct,
    category: CatalogueCategory | undefined,
    description: string,
    pageUrl: string,
    image: string
  ): Record<string, unknown> {
    return {
      '@type': 'Product',
      name: product.name,
      brand: {
        '@type': 'Brand',
        name: COMPANY_INFO.name
      },
      category: category?.name ?? 'Flowers',
      description,
      image,
      url: pageUrl,
      additionalProperty: [
        product.color && {
          '@type': 'PropertyValue',
          name: 'Color',
          value: product.color
        },
        product.length && {
          '@type': 'PropertyValue',
          name: 'Stem length',
          value: product.length
        },
        product.life && {
          '@type': 'PropertyValue',
          name: 'Vase life',
          value: product.life
        },
        (product.availability ?? category?.availability) && {
          '@type': 'PropertyValue',
          name: 'Availability',
          value: product.availability ?? category?.availability
        },
        (product.packing ?? category?.packing) && {
          '@type': 'PropertyValue',
          name: 'Packing',
          value: product.packing ?? category?.packing
        },
        (product.minimumOrder ?? category?.minimumOrder) && {
          '@type': 'PropertyValue',
          name: 'Minimum order',
          value: product.minimumOrder ?? category?.minimumOrder
        }
      ].filter(Boolean)
    };
  }

  private buildWebsiteSchema(): Record<string, unknown> {
    return {
      '@type': 'WebSite',
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.siteUrl,
      description: COMPANY_INFO.defaultDescription,
      inLanguage: ['en', 'es']
    };
  }

  private findActiveRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let current = route;

    while (current.firstChild) {
      current = current.firstChild;
    }

    return current;
  }

  private getRouteLabel(route: ActivatedRouteSnapshot): string {
    const product = route.data['productData'] as CatalogueProduct | undefined;
    const category = route.data['categoryData'] as CatalogueCategory | undefined;

    if (product) {
      return product.name;
    }

    if (category) {
      return category.name;
    }

    const path = route.routeConfig?.path ?? '';

    if (path === 'home') {
      return 'Home';
    }

    if (path === 'about-us') {
      return 'About Us';
    }

    if (path === 'gallery') {
      return 'Products';
    }

    if (path === 'not-found') {
      return 'Page Not Found';
    }

    const title = route.title;

    return typeof title === 'string'
      ? title.replace(` | ${COMPANY_INFO.name}`, '')
      : path || COMPANY_INFO.name;
  }

  private resolveImage(activeRoute: ActivatedRouteSnapshot): string {
    const product = activeRoute.data['productData'] as CatalogueProduct | undefined;
    const category = activeRoute.data['categoryData'] as CatalogueCategory | undefined;
    const routeImage = activeRoute.data['image'] as string | undefined;

    return buildAbsoluteUrl(
      product?.image ?? category?.image ?? routeImage ?? COMPANY_INFO.defaultOgImage
    );
  }

  private resolveOgType(activeRoute: ActivatedRouteSnapshot): string {
    if (activeRoute.data['productData']) {
      return 'product';
    }

    return (activeRoute.data['ogType'] as string | undefined) ?? 'website';
  }

  private updateCanonicalLink(pageUrl: string): void {
    let canonicalLink = this.document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', pageUrl);
  }

  private updateStructuredData(
    activeRoute: ActivatedRouteSnapshot,
    pageTitle: string,
    description: string,
    pageUrl: string,
    image: string
  ): void {
    const product = activeRoute.data['productData'] as CatalogueProduct | undefined;
    const category = activeRoute.data['categoryData'] as CatalogueCategory | undefined;
    const graph: Record<string, unknown>[] = [
      this.buildOrganizationSchema(),
      this.buildBreadcrumbSchema()
    ];

    if (product) {
      graph.push(this.buildProductSchema(product, category, description, pageUrl, image));
    } else if (category) {
      graph.push(this.buildCollectionSchema(category, description, pageUrl, image));
    } else {
      graph.push(this.buildWebsiteSchema());
      graph.push({
        '@type': 'WebPage',
        name: pageTitle,
        description,
        url: pageUrl,
        image
      });
    }

    let structuredDataScript = this.document.getElementById(
      'app-structured-data'
    ) as HTMLScriptElement | null;

    if (!structuredDataScript) {
      structuredDataScript = this.document.createElement('script');
      structuredDataScript.id = 'app-structured-data';
      structuredDataScript.type = 'application/ld+json';
      this.document.head.appendChild(structuredDataScript);
    }

    structuredDataScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph
    });
  }
}
