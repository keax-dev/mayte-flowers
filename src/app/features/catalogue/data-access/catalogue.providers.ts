import { CatalogueMetadataService } from '@features/catalogue/application/catalogue-metadata.service';
import { JsonCatalogueDataSource } from '@features/catalogue/data-access/json-catalogue.data-source';
import { CatalogueRepository } from '@features/catalogue/data-access/catalogue.repository';
import { CatalogueDataSource } from '@features/catalogue/data-access/catalogue.data-source';
import { CatalogueReader } from '@features/catalogue/application/catalogue-reader';
import { Provider } from '@angular/core';

export const CATALOGUE_PROVIDERS: Provider[] = [
  CatalogueMetadataService,
  CatalogueRepository,
  { provide: CatalogueDataSource, useClass: JsonCatalogueDataSource },
  { provide: CatalogueReader, useExisting: CatalogueRepository },
];
