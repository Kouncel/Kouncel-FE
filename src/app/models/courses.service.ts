import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, delay, map, mergeMap, Observable, of, retryWhen, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as $ from "jquery";

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private httpClient: HttpClient) {}

  getAllCourses(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient
      .get(`${environment.baseUrl || localStorage.getItem('baseUrl')}courses`, httpOptions)
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

  getCourse(courseId: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient
      .get(`${environment.baseUrl || localStorage.getItem('baseUrl')}courses/${courseId}`, httpOptions)
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

  createCourse(course: any) {
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };
    const params = new HttpParams({
      fromObject: course,
    });

    return this.httpClient.post(
      `${environment.baseUrl || localStorage.getItem('baseUrl')}courses`,
      // params.toString(),
      course,
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

  editCourse(courseId: any, course: any, files: any) {
    var form = new FormData();

    if (files['coverImage']) {
      form.append('cover', files['coverImage'].file, files['coverImage'].name);
    }
    if (files['image']) {
      form.append('image', files['image'].file, files['image'].name);
    }
    if (files['trailer']) {
      form.append('trailer', files['trailer'].file, files['trailer'].name);
    }
    if (files['sample']) {
      form.append('sample', files['sample'].file, files['sample'].name);
    }
    delete course["id"];
    delete course["title"];
    delete course["description"];
    delete course["coverImage"];
    delete course["image"];
    delete course["trailer"];
    delete course["sample"];
    delete course["category"];
    delete course["instructor"];

    form.append("course", JSON.stringify(course));

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient.put(
      `${environment.baseUrl || localStorage.getItem('baseUrl')}courses/${courseId}`,
      form,
      httpOptions
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

  deleteCourse(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient.delete(
      `${environment.baseUrl || localStorage.getItem('baseUrl')}courses/${id}`,
      // params.toString(),
      httpOptions
    );
  }
}
