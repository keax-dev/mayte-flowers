import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';

import { AnalyticsService } from '@core/services/analytics.service';
import { SOCIAL_LINKS } from '@core/data/company.data';
import { AppIconComponent } from '@shared/ui/app-icon/app-icon.component';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [AppIconComponent, NgClass],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialLinksComponent {
  private readonly analytics = inject(AnalyticsService);

  readonly context = input('shared');
  readonly layout = input<'row' | 'column' | 'wrap'>('row');
  readonly links = SOCIAL_LINKS;

  trackClick(label: string): void {
    this.analytics.trackEvent('external_contact_clicked', {
      channel: label.toLowerCase(),
      context: this.context()
    });
  }
}
