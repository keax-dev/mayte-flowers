import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AnalyticsService } from '@core/services/analytics.service';
import { SOCIAL_LINKS } from '@core/data/company.data';
import { AppIconComponent } from '@shared/ui/app-icon/app-icon.component';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [AppIconComponent],
  templateUrl: './social-links.component.html',
  host: { class: 'd-block' },
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
