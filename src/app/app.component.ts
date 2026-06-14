import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from '@core/layout/navbar/navbar.component';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  template: `
    <header>
      <app-navbar></app-navbar>
    </header>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.initialize();
  }
}
