import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

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
  readonly layout = input<'row' | 'column' | 'wrap'>('row');
  readonly links = SOCIAL_LINKS;
}
