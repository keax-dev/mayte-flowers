import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type IconName =
  | 'arrow-left'
  | 'chevron-left'
  | 'chevron-right'
  | 'close'
  | 'instagram'
  | 'location'
  | 'menu'
  | 'phone'
  | 'whatsapp';

interface IconDefinition {
  path: string;
  viewBox?: string;
}

const ICONS: Record<IconName, IconDefinition> = {
  'arrow-left': {
    path: 'M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L4.8 13H24v-2H4.8z'
  },
  'chevron-left': {
    path: 'M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z'
  },
  'chevron-right': {
    path: 'M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z'
  },
  close: {
    path: 'M18.3 5.71 12 12l6.3 6.29-1.41 1.41L10.59 13.41 4.29 19.7 2.88 18.29 9.17 12 2.88 5.71 4.29 4.29l6.3 6.3 6.29-6.3z'
  },
  instagram: {
    path: 'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2m0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95zm8.95 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3M12 6.5A5.5 5.5 0 1 1 6.5 12 5.5 5.5 0 0 1 12 6.5m0 1.8A3.7 3.7 0 1 0 15.7 12 3.7 3.7 0 0 0 12 8.3'
  },
  location: {
    path: 'M12 2a7 7 0 0 1 7 7c0 5.24-7 13-7 13S5 14.24 5 9a7 7 0 0 1 7-7m0 9.5A2.5 2.5 0 1 0 9.5 9 2.5 2.5 0 0 0 12 11.5'
  },
  menu: {
    path: 'M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z'
  },
  phone: {
    path: 'M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02z'
  },
  whatsapp: {
    path: 'M12 2a10 10 0 0 0-8.7 14.93L2 22l5.23-1.27A10 10 0 1 0 12 2m0 18.2a8.15 8.15 0 0 1-4.15-1.13l-.3-.18-3.1.75.83-3.03-.2-.31A8.19 8.19 0 1 1 12 20.2m4.49-6.12c-.24-.12-1.43-.71-1.65-.79s-.38-.12-.54.12-.62.79-.76.95-.28.18-.52.06a6.7 6.7 0 0 1-1.96-1.21 7.43 7.43 0 0 1-1.37-1.7c-.14-.24 0-.37.11-.49s.24-.28.36-.42a1.63 1.63 0 0 0 .24-.4.44.44 0 0 0 0-.42c-.06-.12-.54-1.31-.74-1.79s-.39-.41-.54-.42h-.46a.89.89 0 0 0-.65.3 2.69 2.69 0 0 0-.84 2 4.67 4.67 0 0 0 1 2.48 10.62 10.62 0 0 0 4.08 3.61 13.8 13.8 0 0 0 1.36.5 3.27 3.27 0 0 0 1.49.09 2.42 2.42 0 0 0 1.58-1.12 1.94 1.94 0 0 0 .13-1.12c-.05-.08-.21-.14-.45-.26'
  }
};

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './app-icon.component.html',
  host: { class: 'd-inline-flex' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppIconComponent {
  readonly decorative = input(false);
  readonly name = input.required<IconName>();
  readonly size = input(24);
  readonly title = input('');

  readonly icon = computed(() => ICONS[this.name()]);
}
