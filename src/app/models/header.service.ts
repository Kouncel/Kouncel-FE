import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, delay, map, mergeMap, Observable, of, retryWhen, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as $ from "jquery";

@Injectable({ providedIn: 'root' })
export class HeaderService {
  constructor(private httpClient: HttpClient) {}

  getHeader(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient
      .get(`${environment.baseUrl || localStorage.getItem('baseUrl')}header`, httpOptions)
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


  editHeader(header: any) {
    var form = new FormData();
    if (header.image && typeof header.image !== 'string') {
      form.append("image", header.image.file, "Screen Shot 2022-05-08 at 1.35.10 PM.png");
    }
    delete header.image;
    form.append("header", JSON.stringify(header));

    const httpOptions: any = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient.post(
      `${environment.baseUrl || localStorage.getItem('baseUrl')}header`,
      // params.toString(),
      form,
      httpOptions,
    ).pipe(map((res) => res), retryWhen((obs) => {
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
