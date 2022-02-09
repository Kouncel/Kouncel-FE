import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { countries } from './countries.const';

@Injectable({ providedIn: 'root' })
export class LookupsService {
  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<any> {
    return of(countries);
    return this.httpClient.get('');
  }
}
