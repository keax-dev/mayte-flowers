import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface CommercialHighlight {
  readonly label: string;
  readonly value: string;
}

@Component({
  selector: 'app-product-commercial-details',
  standalone: true,
  templateUrl: './product-commercial-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCommercialDetailsComponent {
  readonly highlights = input<readonly CommercialHighlight[]>([]);
  readonly idealFor = input<readonly string[]>([]);
}
