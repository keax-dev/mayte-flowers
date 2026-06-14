import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';

interface HomeSlide {
  description: string;
  image: string;
  title: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly activeIndex = signal(0);
  readonly slides: readonly HomeSlide[] = [
    {
      image: '/assets/carrusel/1.jpg',
      title: 'GYPSOPHILA',
      description:
        'It is a genus of herbaceous plants known for their small white, pink or red flowers, commonly used in floral arrangements due to their light and airy appearance.'
    },
    {
      image: '/assets/carrusel/2.jpg',
      title: 'HYMPERICU',
      description:
        'It is a genus of plants appreciated in floral arrangements for its showy flowers, which add a vibrant and natural touch to floral compositions.'
    },
    {
      image: '/assets/carrusel/3.jpg',
      title: 'ROSES',
      description:
        'Known for their beauty and elegance, they are versatile flowers and popular in floral arrangements, ideal for expressing love and celebrating special occasions.'
    },
    {
      image: '/assets/carrusel/4.jpg',
      title: 'SUNFLOWER',
      description:
        'With their bright, distinctive yellow flower, they are a vibrant and cheerful choice for floral arrangements, perfect for spreading joy and positive energy on any occasion.'
    }
  ];

  readonly currentSlide = computed(() => this.slides[this.activeIndex()]);

  constructor() {
    const intervalId = window.setInterval(() => this.next(), 6000);

    this.destroyRef.onDestroy(() => window.clearInterval(intervalId));
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
  }

  next(): void {
    this.activeIndex.update((currentIndex) => (currentIndex + 1) % this.slides.length);
  }

  previous(): void {
    this.activeIndex.update((currentIndex) =>
      currentIndex === 0 ? this.slides.length - 1 : currentIndex - 1
    );
  }
}
