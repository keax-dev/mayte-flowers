import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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
  private readonly router = inject(Router);

  readonly categoryData = input<CatalogueCategory | null | undefined>(null);

  constructor() {
    effect(() => {
      if (this.categoryData() === undefined) {
        this.router.navigateByUrl('/not-found');
      }
    });
  }
}
