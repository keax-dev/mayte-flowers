import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CatalogueRepository } from '@features/catalogue/data-access/catalogue.repository';
import { TestBed } from '@angular/core/testing';

describe('CatalogueRepository', () => {
  let httpMock: HttpTestingController;
  let repository: CatalogueRepository;

  const mockCatalogue = [
    {
      slug: 'sunflower',
      name: 'SUNFLOWER',
      image: '/assets/catalogue/sunflower.jpg',
      buyerNote: 'Seasonal sunflower programs',
      directProductSlug: 'sunflower',
      products: [
        {
          slug: 'sunflower',
          name: 'SUNFLOWER',
          image: '/assets/catalogue/sunflower.jpg',
          description: 'Yellow sunflower',
          length: '60/70/80 cm',
          life: '14+',
        },
      ],
    },
    {
      slug: 'hypericum',
      aliases: ['hympericu'],
      name: 'HYPERICUM',
      image: '/assets/catalogue/hympericu.jpg',
      buyerNote: 'Textured bouquet accents',
      products: [
        {
          slug: 'red_hypericum',
          aliases: ['red_hympericu'],
          name: 'RED HYPERICUM',
          image: '/assets/hympericu/red.jpg',
          description: 'Red hypericum',
          length: '60/70cm',
          life: '14+',
        },
      ],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogueRepository, provideHttpClient(withFetch()), provideHttpClientTesting()],
    });

    httpMock = TestBed.inject(HttpTestingController);
    repository = TestBed.inject(CatalogueRepository);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('maps category cards and keeps direct product routes', () => {
    let cards: unknown;

    repository.getCategoryCards$().subscribe((value) => {
      cards = value;
    });

    httpMock.expectOne('assets/data/catalogue.json').flush(mockCatalogue);

    expect(cards).toEqual([
      {
        slug: 'sunflower',
        name: 'SUNFLOWER',
        image: '/assets/catalogue/sunflower.jpg',
        summary: 'Seasonal sunflower programs',
        route: ['/gallery', 'sunflower', 'sunflower'],
      },
      {
        slug: 'hypericum',
        name: 'HYPERICUM',
        image: '/assets/catalogue/hympericu.jpg',
        summary: 'Textured bouquet accents',
        route: ['/gallery', 'hypericum'],
      },
    ]);
  });

  it('finds categories and products by slug aliases', () => {
    let categoryName = '';
    let productName = '';
    let productRouteSlug = '';

    repository.getCategoryBySlug$('hympericu').subscribe((category) => {
      categoryName = category?.name ?? '';
    });

    repository.getProductBySlug$('hympericu', 'red-hympericu').subscribe((product) => {
      productName = product?.name ?? '';
      productRouteSlug = product?.routeSlug ?? '';
    });

    httpMock.expectOne('assets/data/catalogue.json').flush(mockCatalogue);

    expect(categoryName).toBe('HYPERICUM');
    expect(productName).toBe('RED HYPERICUM');
    expect(productRouteSlug).toBe('red-hypericum');
  });

  it('returns an empty catalogue when the data request fails', () => {
    let categories: unknown;

    repository.getCategories$().subscribe((value) => {
      categories = value;
    });

    httpMock.expectOne('assets/data/catalogue.json').error(new ProgressEvent('network error'));

    expect(categories).toEqual([]);
    expect(repository.loadError()).toBeTrue();
  });
});
