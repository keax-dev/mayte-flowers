import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { upsertInlineRuntimeAppConfig } from '@core/config/runtime-app-config';
import { ContactDialogService } from '@features/contact';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { NavbarComponent } from '@core/layout/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { SeoService } from '@core/seo/seo.service';
import { APP_CONFIG } from '@core/config/app-config.token';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  template: `
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
  private readonly document = inject(DOCUMENT);
  private readonly runtimeConfig = inject(APP_CONFIG);
  private readonly seo = inject(SeoService);

  constructor() {
    upsertInlineRuntimeAppConfig(this.document, this.runtimeConfig);
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
