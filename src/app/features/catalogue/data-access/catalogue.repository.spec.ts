import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TEST_APP_CONFIG } from '@app/testing/test-app-config';
import { CatalogueRepository } from '@features/catalogue/data-access/catalogue.repository';
import { APP_CONFIG } from '@core/config/app-config.token';
import { TestBed } from '@angular/core/testing';

describe('CatalogueRepository', () => {
  let httpMock: HttpTestingController;
  let repository: CatalogueRepository;

  // Catálogo mínimo controlado para probar transformaciones,
  // búsqueda por alias y manejo de errores.
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
    // Montamos el repositorio real con HTTP de testing para simular
    // la carga del JSON del catálogo sin tocar archivos externos.
    TestBed.configureTestingModule({
      providers: [
        CatalogueRepository,
        { provide: APP_CONFIG, useValue: TEST_APP_CONFIG },
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    repository = TestBed.inject(CatalogueRepository);
  });

  afterEach(() => {
    // Verifica que cada prueba dejó el backend HTTP sin requests pendientes.
    httpMock.verify();
  });

  it('maps category cards and keeps direct product routes', () => {
    // Escuchamos el observable ya transformado que consume la UI del catálogo.
    let cards: unknown;

    repository.getCategoryCards$().subscribe((value) => {
      cards = value;
    });

    // Entregamos el JSON mock para disparar el mapeo interno del repositorio.
    httpMock.expectOne('assets/data/catalogue.json').flush(mockCatalogue);

    // Validamos que la salida tenga la forma esperada por la vista,
    // incluyendo el caso especial de rutas directas a producto.
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
    // Comprobamos que la búsqueda sea tolerante con aliases/variantes,
    // algo muy útil para URLs históricas o datos inconsistentes.
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

    // Debe resolver correctamente tanto la categoría como el producto final.
    expect(categoryName).toBe('HYPERICUM');
    expect(productName).toBe('RED HYPERICUM');
    expect(productRouteSlug).toBe('red-hypericum');
  });

  it('returns an empty catalogue when the data request fails', () => {
    // Si la carga del JSON falla, el repositorio no debe romper la app:
    // debe devolver una colección vacía y marcar el estado de error.
    let categories: unknown;

    repository.getCategories$().subscribe((value) => {
      categories = value;
    });

    httpMock.expectOne('assets/data/catalogue.json').error(new ProgressEvent('network error'));

    expect(categories).toEqual([]);
    expect(repository.loadError()).toBeTrue();
  });
});
