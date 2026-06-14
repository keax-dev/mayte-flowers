import { DestroyRef, Injectable, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { filter, map, startWith } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { COMPANY_INFO } from '@core/data/company.data';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);

  initialize(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        map(() => this.findActiveRoute(this.activatedRoute)),
        map((route) => route.snapshot.data),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data) => {
        const description =
          data['description'] ?? COMPANY_INFO.defaultDescription;

        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:title', content: document.title });
      });
  }

  private findActiveRoute(route: ActivatedRoute): ActivatedRoute {
    let current = route;

    while (current.firstChild) {
      current = current.firstChild;
    }

    return current;
  }
}
