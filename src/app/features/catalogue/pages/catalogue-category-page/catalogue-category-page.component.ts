import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AnalyticsService } from '@core/services/analytics.service';
import { CatalogueCategory } from '@features/catalogue/data/catalogue.models';

@Component({
  selector: 'app-catalogue-category-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalogue-category-page.component.html',
  styleUrl: './catalogue-category-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogueCategoryPageComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly router = inject(Router);

  readonly categoryData = input<CatalogueCategory | null | undefined>(null);

  constructor() {
    effect(() => {
      if (this.categoryData() === undefined) {
        this.router.navigateByUrl('/not-found');
      }
    });
  }

  trackProductClick(categoryName: string, productName: string): void {
    this.analytics.trackEvent('catalogue_product_selected', {
      category_name: categoryName,
      product_name: productName
    });
  }
}
