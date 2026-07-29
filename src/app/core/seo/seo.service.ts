import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { buildSeoPageState, findActiveRoute } from '@core/seo/seo-page-state';
import { filter, map, startWith } from 'rxjs/operators';
import { SeoDocumentService } from '@core/seo/seo-document.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { SEO_CONFIG } from '@core/config/app-config.token';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(SeoDocumentService);
  private readonly config = inject(SEO_CONFIG);
  private readonly router = inject(Router);
  private readonly title = inject(Title);

  initialize(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        map(() => findActiveRoute(this.activatedRoute.snapshot.root)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((activeRoute) => this.updateMetadata(activeRoute));
  }

  private updateMetadata(activeRoute: ActivatedRouteSnapshot): void {
    const state = buildSeoPageState(
      activeRoute,
      this.activatedRoute.snapshot.root,
      this.config,
      this.title.getTitle(),
      this.router.url,
    );

    this.document.apply(state);
  }
}
