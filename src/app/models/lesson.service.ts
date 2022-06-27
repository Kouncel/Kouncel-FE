import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  delay,
  map,
  mergeMap,
  Observable,
  of,
  retry,
  retryWhen,
  take,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';

@Injectable({ providedIn: 'root' })
export class LessonService {
  constructor(private httpClient: HttpClient) {}

  getAllLessons(courseId: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient
      .get(
        `${
          environment.baseUrl || localStorage.getItem('baseUrl')
        }courses/${courseId}/lessons`,
        httpOptions
      )
      .pipe(
        map((res) => res),
        retryWhen((obs) => {
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
        })
      );
  }

  createLesson(courseId: any, lesson: any, files: any) {
    var form = new FormData();

    // form.append("lesson", JSON.stringify(lesson));

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
        }courses/${courseId}/lessons`,
        lesson,
        httpOptions
      )
      .pipe(
        map((res) => res),
        retryWhen((obs) => {
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
        })
      );
  }

    // createLesson(courseId: any, lesson: any, files: any) {
    //   var form = new FormData();

    //   form.append("video", files['video'].file, files['video'].name);
    //   form.append("lesson", JSON.stringify(lesson));

    //   const httpOptions = {
    //     headers: new HttpHeaders({
    //       Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    //     }),
    //   };

    //   return this.httpClient.post(
    //     `${environment.baseUrl || localStorage.getItem('baseUrl')}courses/${courseId}/lessons`,
    //     form,
    //     httpOptions
    //   ).pipe(map((res) => res), retryWhen((obs) => {
    //         return obs.pipe(
    //           mergeMap((response) => {
    //             if (response.status === 401) {
    //               return of(response).pipe(delay(2000), take(9));
    //             }
    //             return throwError({
    //               error: 'Unknown error for asynchronous function:' + response,
    //             });
    //           })
    //         );
    //       }));
    // }

  deleteLesson(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient.delete(
      `${environment.baseUrl || localStorage.getItem('baseUrl')}lessons/${id}`,
      // params.toString(),
      httpOptions
    );
  }
}
