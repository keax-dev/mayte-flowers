import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CatalogueCategoryCard } from '@features/catalogue/models/catalogue.models';
import { CatalogueRepository } from '@features/catalogue/data-access/catalogue.repository';
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
  private readonly catalogueRepository = inject(CatalogueRepository);
  private readonly analytics = inject(AnalyticsService);

  readonly loadError = this.catalogueRepository.loadError;
  readonly cards = input.required<readonly CatalogueCategoryCard[]>();

  trackCategoryClick(categoryName: string): void {
    this.analytics.trackEvent('catalogue_category_selected', {
      category_name: categoryName,
    });
  }
}
