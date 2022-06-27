import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, delay, map, mergeMap, Observable, of, retryWhen, take, throwError } from 'rxjs';
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
      .pipe(map((res) => res), retryWhen((obs) => {
        return obs.pipe(
          mergeMap((response) => {
            if (response.status === 401) {
              return of(response).pipe(delay(2000), take(9));
            }
            return throwError({
              error: 'Unknown error for asynchronous function:' + response,
            });
          })
        );
      }));
  }
}
