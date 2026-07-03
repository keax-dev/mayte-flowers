import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { createSocialLinks } from '@core/config/social-links.config';
import { AppIconComponent } from '@shared/ui/app-icon/app-icon.component';
import { APP_CONFIG } from '@core/config/app-config.token';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [AppIconComponent],
  templateUrl: './social-links.component.html',
  host: { class: 'd-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksComponent {
  readonly linkClicked = output<string>();
  readonly layout = input<'row' | 'column' | 'wrap'>('row');
  readonly links = createSocialLinks(inject(APP_CONFIG));

  trackClick(label: string): void {
    this.linkClicked.emit(label);
  }
}
