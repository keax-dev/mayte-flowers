import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { CatalogueProduct } from '@features/catalogue/data/catalogue.models';
import { AppIconComponent } from '@shared/ui/app-icon/app-icon.component';
import { SocialLinksComponent } from '@shared/ui/social-links/social-links.component';

@Component({
  selector: 'app-catalogue-product-page',
  standalone: true,
  imports: [AppIconComponent, SocialLinksComponent],
  templateUrl: './catalogue-product-page.component.html',
  styleUrl: './catalogue-product-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogueProductPageComponent {
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  readonly category = input('');
  readonly productData = input<CatalogueProduct | null | undefined>(null);
  readonly hasMetadata = computed(() => {
    const product = this.productData();

    return !!(
      product?.headOptions?.length ||
      product?.color ||
      product?.head ||
      product?.length ||
      product?.life ||
      this.isGypsophila()
    );
  });
  readonly isGypsophila = computed(() => this.category() === 'gypsophila');
  readonly socialLayout = computed<'column' | 'wrap'>(() =>
    ['hypericum', 'hympericu'].includes(this.category()) ? 'wrap' : 'column'
  );

  constructor() {
    effect(() => {
      if (this.productData() === undefined) {
        this.router.navigateByUrl('/not-found');
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
