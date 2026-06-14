import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { COMPANY_INFO } from '@core/data/company.data';
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

  readonly company = COMPANY_INFO;

  openContact(): void {
    this.contactDialog.open();
  }
}
