import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, delay, map, mergeMap, Observable, of, retryWhen, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilsService } from '../shared/utils.service';

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
      .get(`${environment.baseUrl || localStorage.getItem('baseUrl')}professions?page=1&limit=200`, httpOptions)
      .pipe(map((res) => res), retryWhen((obs) => {
        return obs.pipe(
          UtilsService.retryRequest()
        );
      }));
  }

  createProfessions(professions: any[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient
      .post(
        `${
          environment.baseUrl || localStorage.getItem('baseUrl')
        }professions`,
        professions,
        httpOptions
      )
      .pipe(
        map((res) => res),
        retryWhen((obs) => {
          return obs.pipe(
            UtilsService.retryRequest()
          );
        })
      );
  }


}
