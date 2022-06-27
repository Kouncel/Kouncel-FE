import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, delay, map, mergeMap, Observable, of, retryWhen, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as $ from "jquery";

@Injectable({ providedIn: 'root' })
export class InstructorService {
  constructor(private httpClient: HttpClient) {}

  getAllInstructors(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient
      .get(`${environment.baseUrl || localStorage.getItem('baseUrl')}instructor`, httpOptions)
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

  createInstructor(instructor: any) {
      var form = new FormData();
      form.append("image", instructor.image, "Screen Shot 2022-05-08 at 1.35.10 PM.png");
      delete instructor.image;
      form.append("instructor", JSON.stringify(instructor));

      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }),
      };
  
      return this.httpClient.post(
        `${environment.baseUrl || localStorage.getItem('baseUrl')}instructor`,
        form,
        httpOptions
      ).pipe(retryWhen((obs) => {
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

/*

    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };
    const params = new HttpParams({
      fromObject: instructor,
    });

    const formData = new FormData();
    formData.append('image', instructor.image);
    delete instructor.image;
    formData.append('instructor', JSON.stringify(instructor))

    return this.httpClient.post(
      `${environment.baseUrl || localStorage.getItem('baseUrl')}instructor`,
      formData,
      httpOptions
    ); */
  }

  deleteInstructor(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient.delete(
      `${environment.baseUrl || localStorage.getItem('baseUrl')}instructor/${id}`,
      // params.toString(),
      httpOptions
    );
  }
}
