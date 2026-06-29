import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { COMPANY_INFO, buildAbsoluteUrl } from '@core/data/company.data';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  private isInitialized = false;

  initialize(): void {
    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;
    window.dataLayer ??= [];

    if (COMPANY_INFO.gaMeasurementId) {
      this.loadGoogleAnalytics(COMPANY_INFO.gaMeasurementId);
    }

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.trackPageView());
  }

  trackEvent(name: string, params: Record<string, unknown> = {}): void {
    const payload = { event: name, ...params };

    window.dataLayer?.push(payload);

    if (window.gtag) {
      window.gtag('event', name, params);
    }
  }

  private loadGoogleAnalytics(measurementId: string): void {
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
      window.dataLayer?.push(args as unknown as Record<string, unknown>);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });
  }

  private trackPageView(): void {
    this.trackEvent('page_view', {
      page_location: buildAbsoluteUrl(this.router.url),
      page_path: this.router.url,
      page_title: this.document.title
    });
  }
}
