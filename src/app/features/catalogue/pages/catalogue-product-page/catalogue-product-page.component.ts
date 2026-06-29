import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { buildWhatsappUrl } from '@core/data/company.data';
import { AnalyticsService } from '@core/services/analytics.service';
import { ContactDialogService } from '@core/services/contact-dialog.service';
import {
  CatalogueCategory,
  CatalogueProduct
} from '@features/catalogue/data/catalogue.models';
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
  private readonly analytics = inject(AnalyticsService);
  private readonly contactDialog = inject(ContactDialogService);
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  readonly category = input('');
  readonly categoryData = input<CatalogueCategory | null | undefined>(null);
  readonly productData = input<CatalogueProduct | null | undefined>(null);
  readonly hasMetadata = computed(() => {
    const product = this.productData();
    const category = this.categoryData();

    return !!(
      product?.headOptions?.length ||
      product?.color ||
      product?.head ||
      product?.length ||
      product?.life ||
      product?.availability ||
      product?.minimumOrder ||
      product?.packing ||
      product?.seasonality ||
      product?.idealFor?.length ||
      category?.availability ||
      category?.minimumOrder ||
      category?.packing ||
      category?.seasonality ||
      category?.idealFor?.length ||
      this.isGypsophila()
    );
  });
  readonly isGypsophila = computed(() => this.category() === 'gypsophila');
  readonly socialLayout = computed<'column' | 'wrap'>(() =>
    ['hypericum', 'hympericu'].includes(this.category()) ? 'wrap' : 'column'
  );
  readonly commercialHighlights = computed(() => {
    const product = this.productData();
    const category = this.categoryData();

    return [
      {
        label: 'Availability',
        value: product?.availability ?? category?.availability ?? ''
      },
      {
        label: 'Seasonality',
        value: product?.seasonality ?? category?.seasonality ?? ''
      },
      {
        label: 'Packing',
        value: product?.packing ?? category?.packing ?? ''
      },
      {
        label: 'Minimum order',
        value: product?.minimumOrder ?? category?.minimumOrder ?? ''
      }
    ].filter((item) => item.value);
  });
  readonly idealFor = computed(
    () => this.productData()?.idealFor ?? this.categoryData()?.idealFor ?? []
  );
  readonly productWhatsappUrl = computed(() => {
    const product = this.productData();

    if (!product) {
      return buildWhatsappUrl(
        'Hello ALX Garden, I would like to receive more information about your flower catalogue.'
      );
    }

    return buildWhatsappUrl(
      `Hello ALX Garden, I would like a quote for ${product.name}. Please share availability and packing options.`
    );
  });

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

  openQuoteDialog(): void {
    const product = this.productData();

    if (!product) {
      return;
    }

    this.analytics.trackEvent('product_quote_cta_clicked', {
      category: this.category(),
      product_name: product.name
    });

    this.contactDialog.open({
      flowerType: product.name,
      inquiryType: 'quote',
      message: `Hello ALX Garden, I would like a quote for ${product.name}. Please share availability, packing options and next steps.`,
      source: 'product_page'
    });
  }

  trackWhatsappQuote(): void {
    const product = this.productData();

    this.analytics.trackEvent('product_whatsapp_clicked', {
      category: this.category(),
      product_name: product?.name ?? ''
    });
  }
}
