import { ActivatedRouteSnapshot, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { StructuredData, SeoCategory, SeoProduct } from '@core/seo/seo.models';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { filter, map, startWith } from 'rxjs/operators';
import { buildBreadcrumbSchema } from '@core/seo/breadcrumb-schema';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { buildAbsoluteUrl } from '@core/config/url.utils';
import { Meta, Title } from '@angular/platform-browser';
import { APP_CONFIG } from '@core/config/app-config.token';
import { DOCUMENT } from '@angular/common';
import {
  buildOrganizationSchema,
  buildCollectionSchema,
  buildProductSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
} from '@core/seo/schema-builders';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly config = inject(APP_CONFIG);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  initialize(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        map(() => this.findActiveRoute(this.activatedRoute.snapshot.root)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((activeRoute) => this.updateMetadata(activeRoute));
  }

  updateMetadata(activeRoute: ActivatedRouteSnapshot): void {
    const description =
      (activeRoute.data['description'] as string | undefined) ?? this.config.defaultDescription;
    const image = this.resolveImage(activeRoute);
    const keywords = this.buildKeywords(activeRoute);
    const ogType = activeRoute.data['productData']
      ? 'product'
      : ((activeRoute.data['ogType'] as string | undefined) ?? 'website');
    const robots =
      (activeRoute.data['robots'] as string | undefined) ??
      (activeRoute.routeConfig?.path === 'not-found' ? 'noindex, nofollow' : 'index, follow');
    const pageTitle = this.title.getTitle() || this.config.name;
    const pageUrl = buildAbsoluteUrl(
      this.router.url === '/' ? '/home' : this.router.url,
      this.config.siteUrl,
    );

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: pageTitle });
    this.meta.updateTag({ property: 'og:type', content: ogType });
    this.meta.updateTag({ property: 'og:url', content: pageUrl });
    this.meta.updateTag({
      property: 'og:site_name',
      content: this.config.name,
    });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.updateCanonicalLink(pageUrl);
    this.updateStructuredData(activeRoute, pageTitle, description, pageUrl, image);
  }

  buildKeywords(activeRoute: ActivatedRouteSnapshot): string {
    const product = activeRoute.data['productData'] as SeoProduct | undefined;
    const category = activeRoute.data['categoryData'] as SeoCategory | undefined;

    return [
      this.config.name,
      'fresh-cut flowers',
      'flower supplier',
      'flower exporter',
      category?.name,
      product?.name,
    ]
      .filter(Boolean)
      .join(', ');
  }

  findActiveRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let current = route;

    while (current.firstChild) {
      current = current.firstChild;
    }

    return current;
  }

  resolveImage(activeRoute: ActivatedRouteSnapshot): string {
    const product = activeRoute.data['productData'] as SeoProduct | undefined;
    const category = activeRoute.data['categoryData'] as SeoCategory | undefined;
    const routeImage = activeRoute.data['image'] as string | undefined;

    return buildAbsoluteUrl(
      product?.image ?? category?.image ?? routeImage ?? this.config.defaultOgImage,
      this.config.siteUrl,
    );
  }

  updateCanonicalLink(pageUrl: string): void {
    let canonicalLink = this.document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;

    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', pageUrl);
  }

  updateStructuredData(
    activeRoute: ActivatedRouteSnapshot,
    pageTitle: string,
    description: string,
    pageUrl: string,
    image: string,
  ): void {
    const product = activeRoute.data['productData'] as SeoProduct | undefined;
    const category = activeRoute.data['categoryData'] as SeoCategory | undefined;
    const graph: StructuredData[] = [
      buildOrganizationSchema(this.config),
      buildBreadcrumbSchema(this.activatedRoute.snapshot.root, this.config),
    ];

    if (product) {
      graph.push(buildProductSchema(this.config, product, category, description, pageUrl, image));
    } else if (category) {
      graph.push(buildCollectionSchema(this.config, category, description, pageUrl, image));
    } else {
      graph.push(buildWebsiteSchema(this.config));
      graph.push(buildWebPageSchema(pageTitle, description, pageUrl, image));
    }

    let script = this.document.getElementById('app-structured-data') as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = 'app-structured-data';
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
  }
}
