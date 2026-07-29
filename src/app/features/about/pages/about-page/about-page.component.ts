import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContactDialogService } from '@features/contact';
import { SocialLinksComponent } from '@shared/ui/social-links/social-links.component';
import { RevealOnScrollDirective } from '@shared/ui/reveal-on-scroll/reveal-on-scroll.directive';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { BRAND_CONFIG, CONTACT_CONFIG } from '@core/config/app-config.token';
import { createSocialLinks } from '@core/config/social-links.config';
import {
  TRUST_HIGHLIGHTS,
  BUYER_CHECKLIST,
  BUYER_PROMISES,
} from '@features/about/data/about-content.data';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [SocialLinksComponent, RevealOnScrollDirective],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  private readonly contactDialog = inject(ContactDialogService);
  private readonly analytics = inject(AnalyticsService);

  readonly trustHighlights = TRUST_HIGHLIGHTS;
  readonly buyerChecklist = BUYER_CHECKLIST;
  readonly buyerPromises = BUYER_PROMISES;
  readonly company = inject(BRAND_CONFIG);
  readonly socialLinks = createSocialLinks(inject(CONTACT_CONFIG));

  openContact(): void {
    void this.contactDialog.open({
      inquiryType: 'general',
      message:
        'Hello ALX Garden, I would like to learn more about your flower varieties, packing options and commercial process.',
      source: 'about_page',
    });
  }

  trackSocialClick(label: string): void {
    this.analytics.trackEvent('external_contact_clicked', {
      channel: label.toLowerCase(),
      context: 'about_page',
    });
  }
}
