import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  BUYER_CHECKLIST,
  BUYER_PROMISES,
  COMPANY_INFO,
  TRUST_HIGHLIGHTS
} from '@core/data/company.data';
import { ContactDialogService } from '@core/services/contact-dialog.service';
import { SocialLinksComponent } from '@shared/ui/social-links/social-links.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [SocialLinksComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent {
  private readonly contactDialog = inject(ContactDialogService);

  readonly buyerChecklist = BUYER_CHECKLIST;
  readonly buyerPromises = BUYER_PROMISES;
  readonly company = COMPANY_INFO;
  readonly trustHighlights = TRUST_HIGHLIGHTS;

  openContact(): void {
    this.contactDialog.open({
      inquiryType: 'general',
      message:
        'Hello ALX Garden, I would like to learn more about your flower varieties, packing options and commercial process.',
      source: 'about_page'
    });
  }
}
