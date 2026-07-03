import { DestroyRef, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, startWith } from 'rxjs/operators';
import { buildAbsoluteUrl } from '@core/config/url.utils';
import { APP_CONFIG } from '@core/config/app-config.token';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly document = inject(DOCUMENT);
  private readonly config = inject(APP_CONFIG);
  private readonly router = inject(Router);

  isInitialized = false;

  initialize(): void {
    if (this.isInitialized || !this.isBrowser) {
      return;
    }

    this.isInitialized = true;
    window.dataLayer ??= [];

    if (this.config.gaMeasurementId) {
      this.loadGoogleAnalytics(this.config.gaMeasurementId);
    }

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.trackPageView());
  }

  trackEvent(name: string, params: Record<string, unknown> = {}): void {
    if (!this.isBrowser) {
      return;
    }

    const payload = { event: name, ...params };

    window.dataLayer?.push(payload);

    if (window.gtag) {
      window.gtag('event', name, params);
    }
  }

  loadGoogleAnalytics(measurementId: string): void {
    if (this.document.getElementById('ga-script')) {
      return;
    }

    const script = this.document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    this.document.head.appendChild(script);

    window.dataLayer ??= [];
    window.gtag ??= function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });
  }

  trackPageView(): void {
    this.trackEvent('page_view', {
      page_location: buildAbsoluteUrl(this.router.url, this.config.siteUrl),
      page_title: this.document.title,
      page_path: this.router.url,
    });
  }
}
