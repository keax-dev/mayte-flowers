import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CatalogueProduct } from '@features/catalogue/models/catalogue.models';

@Component({
  selector: 'app-product-specifications',
  standalone: true,
  templateUrl: './product-specifications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSpecificationsComponent {
  readonly product = input.required<CatalogueProduct>();
}
