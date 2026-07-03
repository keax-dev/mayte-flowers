import {
  ChangeDetectionStrategy,
  Component,
  output,
  input,
} from '@angular/core';

@Component({
  selector: 'app-product-quote-panel',
  standalone: true,
  templateUrl: './product-quote-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductQuotePanelComponent {
  readonly productName = input.required<string>();
  readonly whatsappUrl = input.required<string>();

  readonly whatsappClicked = output<void>();
  readonly quoteRequested = output<void>();
}
