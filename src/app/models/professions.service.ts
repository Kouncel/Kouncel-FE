import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, delay, map, Observable, of, retryWhen } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfessionsService {
  constructor(private httpClient: HttpClient) {}

  getAllProfessions(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.httpClient
      .get(`${environment.baseUrl || localStorage.getItem('baseUrl')}professions?page=1&size=0`, httpOptions)
      .pipe(map((res) => res), retryWhen((errors) => errors.pipe(delay(2000))));
  }
}
