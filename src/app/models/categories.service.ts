import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, delay, map, mergeMap, Observable, of, retry, retryWhen, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilsService } from '../shared/utils.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient
      .get(`${environment.baseUrl || localStorage.getItem('baseUrl')}category`, httpOptions)
      .pipe(map((res) => res), retryWhen((obs) => {
        return obs.pipe(
          UtilsService.retryRequest()
        );
      }));
  }

  createCategory(category: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };
    const params = new HttpParams({
      fromObject: category,
    });

    return this.httpClient.post(
      `${environment.baseUrl || localStorage.getItem('baseUrl')}category`,
      // params.toString(),
      category,
      httpOptions
    ).pipe(retryWhen((obs) => {
      return obs.pipe(
        UtilsService.retryRequest()
      );
    }));
  }

  deleteCategory(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient.delete(
      `${environment.baseUrl || localStorage.getItem('baseUrl')}category/${id}`,
      // params.toString(),
      httpOptions
    );
  }
}
