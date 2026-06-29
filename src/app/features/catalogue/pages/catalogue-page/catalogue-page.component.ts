import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AnalyticsService } from '@core/services/analytics.service';
import { CatalogueCategoryCard } from '@features/catalogue/data/catalogue.models';

@Component({
  selector: 'app-catalogue-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalogue-page.component.html',
  styleUrl: './catalogue-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CataloguePageComponent {
  private readonly analytics = inject(AnalyticsService);

  readonly cards = input.required<readonly CatalogueCategoryCard[]>();

  trackCategoryClick(categoryName: string): void {
    this.analytics.trackEvent('catalogue_category_selected', {
      category_name: categoryName
    });
  }
}
