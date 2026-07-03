import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CatalogueCategory, CatalogueProduct } from '@features/catalogue/models/catalogue.models';
import { GypsophilaPackingTableComponent } from '@features/catalogue/ui/gypsophila-packing-table/gypsophila-packing-table.component';
import { ProductSpecificationsComponent } from '@features/catalogue/ui/product-specifications/product-specifications.component';
import { ProductQuotePanelComponent } from '@features/catalogue/ui/product-quote-panel/product-quote-panel.component';
import { ContactDialogService } from '@features/contact';
import { SocialLinksComponent } from '@shared/ui/social-links/social-links.component';
import { AppIconComponent } from '@shared/ui/app-icon/app-icon.component';
import { buildWhatsappUrl } from '@core/config/url.utils';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { APP_CONFIG } from '@core/config/app-config.token';
import { Location } from '@angular/common';
import {
  ProductCommercialDetailsComponent,
  CommercialHighlight,
} from '@features/catalogue/ui/product-commercial-details/product-commercial-details.component';

@Component({
  selector: 'app-catalogue-product-page',
  standalone: true,
  imports: [
    ProductCommercialDetailsComponent,
    GypsophilaPackingTableComponent,
    ProductSpecificationsComponent,
    ProductQuotePanelComponent,
    SocialLinksComponent,
    AppIconComponent,
  ],
  templateUrl: './catalogue-product-page.component.html',
  styleUrl: './catalogue-product-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogueProductPageComponent {
  private readonly contactDialog = inject(ContactDialogService);
  private readonly analytics = inject(AnalyticsService);
  private readonly location = inject(Location);
  private readonly config = inject(APP_CONFIG);

  readonly categoryData = input<CatalogueCategory | null>(null);
  readonly productData = input<CatalogueProduct | null>(null);
  readonly category = input('');

  readonly commercialHighlights = computed<readonly CommercialHighlight[]>(() => {
    const product = this.productData();
    const category = this.categoryData();

    return [
      {
        label: 'Availability',
        value: product?.availability ?? category?.availability ?? '',
      },
      {
        label: 'Seasonality',
        value: product?.seasonality ?? category?.seasonality ?? '',
      },
      {
        label: 'Packing',
        value: product?.packing ?? category?.packing ?? '',
      },
      {
        label: 'Minimum order',
        value: product?.minimumOrder ?? category?.minimumOrder ?? '',
      },
    ].filter((item) => item.value);
  });

  readonly hasMetadata = computed(() => {
    const product = this.productData();

    return !!(
      this.commercialHighlights().length ||
      this.idealFor().length ||
      product?.headOptions?.length ||
      product?.color ||
      product?.head ||
      product?.length ||
      product?.life ||
      this.isGypsophila()
    );
  });

  readonly idealFor = computed(
    () => this.productData()?.idealFor ?? this.categoryData()?.idealFor ?? [],
  );

  readonly isGypsophila = computed(() => this.category() === 'gypsophila');

  readonly productWhatsappUrl = computed(() => {
    const product = this.productData();
    const message = product
      ? `Hello ALX Garden, I would like a quote for ${product.name}. Please share availability and packing options.`
      : 'Hello ALX Garden, I would like to receive more information about your flower catalogue.';

    return buildWhatsappUrl(message, this.config.whatsappUrl);
  });

  readonly socialLayout = computed<'column' | 'wrap'>(() =>
    ['hypericum', 'hympericu'].includes(this.category()) ? 'wrap' : 'column',
  );

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
      product_name: product.name,
    });

    void this.contactDialog.open({
      flowerType: product.name,
      inquiryType: 'quote',
      message: `Hello ALX Garden, I would like a quote for ${product.name}. Please share availability, packing options and next steps.`,
      source: 'product_page',
    });
  }

  trackWhatsappQuote(): void {
    this.analytics.trackEvent('product_whatsapp_clicked', {
      category: this.category(),
      product_name: this.productData()?.name ?? '',
    });
  }

  trackSocialClick(label: string): void {
    this.analytics.trackEvent('external_contact_clicked', {
      channel: label.toLowerCase(),
      context: 'product_page',
    });
  }
}
