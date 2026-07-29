import { CatalogueCategory } from '@features/catalogue/models/catalogue.models';
import { Observable } from 'rxjs';

export abstract class CatalogueDataSource {
  abstract load(): Observable<readonly CatalogueCategory[]>;
}
