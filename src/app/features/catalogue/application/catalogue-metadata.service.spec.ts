import { CatalogueMetadataService } from '@features/catalogue/application/catalogue-metadata.service';
import { CatalogueReader } from '@features/catalogue/application/catalogue-reader';
import { TEST_APP_CONFIG } from '@app/testing/test-app-config';
import { APP_CONFIG } from '@core/config/app-config.token';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';

describe('CatalogueMetadataService', () => {
  const category = {
    slug: 'roses',
    name: 'ROSES',
    image: '/assets/catalogue/roses.jpg',
    products: [
      {
        slug: 'explorer',
        name: 'EXPLORER',
        image: '/assets/roses/explorer.jpg',
        description: 'Deep red rose.',
      },
    ],
  };

  let service: CatalogueMetadataService;

  beforeEach(() => {
    const reader: CatalogueReader = {
      getCategories$: () => of([category]),
      getCategoryCards$: () => of([]),
      getCategoryBySlug$: (slug) => of(slug === category.slug ? category : undefined),
      getProductBySlug$: (_categorySlug, productSlug) =>
        of(category.products.find((product) => product.slug === productSlug)),
      hasLoadError: () => false,
    };

    TestBed.configureTestingModule({
      providers: [
        CatalogueMetadataService,
        { provide: APP_CONFIG, useValue: TEST_APP_CONFIG },
        { provide: CatalogueReader, useValue: reader },
      ],
    });

    service = TestBed.inject(CatalogueMetadataService);
  });

  it('builds route metadata without adding presentation concerns to the repository', async () => {
    await expectAsync(firstValueFrom(service.getCategoryTitle$('roses'))).toBeResolvedTo(
      'ROSES | ALX Garden',
    );
    await expectAsync(
      firstValueFrom(service.getProductDescription$('roses', 'explorer')),
    ).toBeResolvedTo('Deep red rose.');
  });
});
