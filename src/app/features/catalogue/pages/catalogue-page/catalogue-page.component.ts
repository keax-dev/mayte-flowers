import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  readonly cards = input.required<readonly CatalogueCategoryCard[]>();
}
