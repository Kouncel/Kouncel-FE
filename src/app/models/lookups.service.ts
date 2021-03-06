import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { countries } from './countries.const';
import { professions } from './professions.const';
import { categories } from './categories.const';

@Injectable({ providedIn: 'root' })
export class LookupsService {
  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<any> {
    return of(countries);
    return this.httpClient.get('');
  }

  getProfessions(): Observable<any> {
    return of(professions);
    return this.httpClient.get('');
  }

  getCategories(): Observable<any> {
    return of(categories);
    return this.httpClient.get('');
  }
}
