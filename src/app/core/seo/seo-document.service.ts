import { Injectable, inject } from '@angular/core';
import { SeoPageState } from '@core/seo/seo-page-state';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SeoDocumentService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);

  apply(state: SeoPageState): void {
    this.updateMetaTags(state);
    this.updateCanonicalLink(state.pageUrl);
    this.updateStructuredData(state);
  }

  private updateMetaTags(state: SeoPageState): void {
    this.meta.updateTag({ name: 'description', content: state.description });
    this.meta.updateTag({ name: 'keywords', content: state.keywords });
    this.meta.updateTag({ name: 'robots', content: state.robots });
    this.meta.updateTag({ property: 'og:title', content: state.pageTitle });
    this.meta.updateTag({ property: 'og:description', content: state.description });
    this.meta.updateTag({ property: 'og:image', content: state.image });
    this.meta.updateTag({ property: 'og:image:alt', content: state.pageTitle });
    this.meta.updateTag({ property: 'og:type', content: state.ogType });
    this.meta.updateTag({ property: 'og:url', content: state.pageUrl });
    this.meta.updateTag({ property: 'og:site_name', content: state.siteName });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: state.pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: state.description });
    this.meta.updateTag({ name: 'twitter:image', content: state.image });
  }

  private updateCanonicalLink(pageUrl: string): void {
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

  private updateStructuredData(state: SeoPageState): void {
    let script = this.document.getElementById('app-structured-data') as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = 'app-structured-data';
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': state.graph,
    });
  }
}
