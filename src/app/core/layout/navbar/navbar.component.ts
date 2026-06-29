import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { COMPANY_INFO } from '@core/data/company.data';
import { ContactDialogService } from '@core/services/contact-dialog.service';
import { AppIconComponent } from '@shared/ui/app-icon/app-icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AppIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private readonly contactDialog = inject(ContactDialogService);

  readonly company = COMPANY_INFO;
  readonly isMenuOpen = signal(false);

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  openContact(): void {
    this.closeMenu();
    this.contactDialog.open({
      inquiryType: 'general',
      source: 'navbar'
    });
  }

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }
}
