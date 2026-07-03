import { ContactDialogService } from '@features/contact';
import { isPlatformBrowser } from '@angular/common';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { AppIconComponent } from '@shared/ui/app-icon/app-icon.component';
import { RouterLink } from '@angular/router';
import {
  ChangeDetectionStrategy,
  PLATFORM_ID,
  DestroyRef,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

interface HomeSlide {
  description: string;
  image: string;
  title: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, AppIconComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly contactDialog = inject(ContactDialogService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly analytics = inject(AnalyticsService);

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly prefersReducedMotion =
    this.isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private rotationIntervalId: number | null = null;

  readonly isAutoRotating = signal(!this.prefersReducedMotion);
  readonly activeIndex = signal(0);

  readonly slides: readonly [HomeSlide, ...HomeSlide[]] = [
    {
      image: '/assets/carrusel/1.jpg',
      title: 'GYPSOPHILA',
      description:
        'It is a genus of herbaceous plants known for their small white, pink or red flowers, commonly used in floral arrangements due to their light and airy appearance.',
    },
    {
      image: '/assets/carrusel/2.jpg',
      title: 'HYMPERICU',
      description:
        'It is a genus of plants appreciated in floral arrangements for its showy flowers, which add a vibrant and natural touch to floral compositions.',
    },
    {
      image: '/assets/carrusel/3.jpg',
      title: 'ROSES',
      description:
        'Known for their beauty and elegance, they are versatile flowers and popular in floral arrangements, ideal for expressing love and celebrating special occasions.',
    },
    {
      image: '/assets/carrusel/4.jpg',
      title: 'SUNFLOWER',
      description:
        'With their bright, distinctive yellow flower, they are a vibrant and cheerful choice for floral arrangements, perfect for spreading joy and positive energy on any occasion.',
    },
  ];

  readonly currentSlide = computed(() => this.slides[this.activeIndex()] ?? this.slides[0]);

  constructor() {
    if (this.isBrowser && this.isAutoRotating()) {
      this.startAutoRotation();
    }

    this.destroyRef.onDestroy(() => this.stopAutoRotation());
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
  }

  next(): void {
    this.activeIndex.update((currentIndex) => (currentIndex + 1) % this.slides.length);
  }

  previous(): void {
    this.activeIndex.update((currentIndex) =>
      currentIndex === 0 ? this.slides.length - 1 : currentIndex - 1,
    );
  }

  toggleAutoRotation(): void {
    if (this.isAutoRotating()) {
      this.isAutoRotating.set(false);
      this.stopAutoRotation();
      return;
    }

    this.isAutoRotating.set(true);
    this.startAutoRotation();
  }

  openQuoteDialog(): void {
    this.analytics.trackEvent('home_quote_cta_clicked', {
      product_highlight: this.currentSlide().title,
    });

    void this.contactDialog.open({
      flowerType: this.currentSlide().title,
      inquiryType: 'quote',
      message: `Hello ALX Garden, I would like a quote for ${this.currentSlide().title}. Please share availability and packing options.`,
      source: 'home_hero',
    });
  }

  trackCatalogueCta(): void {
    this.analytics.trackEvent('home_catalogue_cta_clicked', {
      product_highlight: this.currentSlide().title,
    });
  }

  startAutoRotation(): void {
    this.stopAutoRotation();
    this.rotationIntervalId = window.setInterval(() => this.next(), 6000);
  }

  stopAutoRotation(): void {
    if (this.rotationIntervalId === null) {
      return;
    }

    window.clearInterval(this.rotationIntervalId);
    this.rotationIntervalId = null;
  }
}
