import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppIconComponent } from '@shared/ui/app-icon/app-icon.component';
import { APP_CONFIG } from '@core/config/app-config.token';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AppIconComponent],
  templateUrl: './navbar.component.html',
  host: { class: 'd-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly contactRequested = output<void>();
  readonly isMenuOpen = signal(false);
  readonly company = inject(APP_CONFIG);

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  openContact(): void {
    this.closeMenu();
    this.contactRequested.emit();
  }

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }
}
