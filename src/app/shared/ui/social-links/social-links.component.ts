import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AppIconComponent } from '@shared/ui/app-icon/app-icon.component';
import { SocialLink } from '@shared/ui/social-links/social-link.model';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [AppIconComponent],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.css',
  host: { class: 'd-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksComponent {
  readonly linkClicked = output<string>();
  readonly layout = input<'row' | 'column' | 'wrap'>('row');
  readonly links = input.required<readonly SocialLink[]>();

  trackClick(label: string): void {
    this.linkClicked.emit(label);
  }
}
