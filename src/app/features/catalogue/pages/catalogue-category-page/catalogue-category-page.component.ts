import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CatalogueCategory } from '@features/catalogue/models/catalogue.models';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalogue-category-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalogue-category-page.component.html',
  styleUrl: './catalogue-category-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogueCategoryPageComponent {
  private readonly analytics = inject(AnalyticsService);

  readonly categoryData = input<CatalogueCategory | null>(null);

  trackProductClick(categoryName: string, productName: string): void {
    this.analytics.trackEvent('catalogue_product_selected', {
      category_name: categoryName,
      product_name: productName,
    });
  }
}
