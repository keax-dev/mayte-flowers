import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CataloguePageData } from '@features/catalogue/models/catalogue.models';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { RevealOnScrollDirective } from '@shared/ui/reveal-on-scroll/reveal-on-scroll.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalogue-page',
  standalone: true,
  imports: [RouterLink, RevealOnScrollDirective],
  templateUrl: './catalogue-page.component.html',
  styleUrl: './catalogue-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CataloguePageComponent {
  private readonly analytics = inject(AnalyticsService);

  readonly pageData = input.required<CataloguePageData>();
  readonly loadError = computed(() => this.pageData().loadError);
  readonly cards = computed(() => this.pageData().cards);

  trackCategoryClick(categoryName: string): void {
    this.analytics.trackEvent('catalogue_category_selected', {
      category_name: categoryName,
    });
  }
}
