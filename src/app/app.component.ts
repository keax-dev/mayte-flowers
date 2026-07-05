import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { ContactDialogService } from '@features/contact';
import { NavbarComponent } from '@core/layout/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { SeoService } from '@core/seo/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  template: `
    TEST VERSION 1
    <header>
      <app-navbar (contactRequested)="openContact()"></app-navbar>
    </header>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly contactDialog = inject(ContactDialogService);
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.analytics.initialize();
    this.seo.initialize();
  }

  openContact(): void {
    void this.contactDialog.open({
      inquiryType: 'general',
      source: 'navbar',
    });
  }
}
