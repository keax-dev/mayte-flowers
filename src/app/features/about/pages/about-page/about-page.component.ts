import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContactDialogService } from '@features/contact';
import { SocialLinksComponent } from '@shared/ui/social-links/social-links.component';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { APP_CONFIG } from '@core/config/app-config.token';
import {
  TRUST_HIGHLIGHTS,
  BUYER_CHECKLIST,
  BUYER_PROMISES
} from '@features/about/data/about-content.data';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [SocialLinksComponent],
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
  readonly company = inject(APP_CONFIG);

  openContact(): void {
    void this.contactDialog.open({
      inquiryType: 'general',
      message:
        'Hello ALX Garden, I would like to learn more about your flower varieties, packing options and commercial process.',
      source: 'about_page'
    });
  }

  trackSocialClick(label: string): void {
    this.analytics.trackEvent('external_contact_clicked', {
      channel: label.toLowerCase(),
      context: 'about_page',
    });
  }
}
