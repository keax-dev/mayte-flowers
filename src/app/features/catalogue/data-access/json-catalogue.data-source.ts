import { CatalogueDataSource } from '@features/catalogue/data-access/catalogue.data-source';
import { CatalogueCategory } from '@features/catalogue/models/catalogue.models';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JsonCatalogueDataSource implements CatalogueDataSource {
  private readonly http = inject(HttpClient);

  load(): Observable<readonly CatalogueCategory[]> {
    return this.http.get<readonly CatalogueCategory[]>('assets/data/catalogue.json');
  }
}
