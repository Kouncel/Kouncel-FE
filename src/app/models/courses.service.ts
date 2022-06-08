import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

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
      .get(`${localStorage.getItem('baseUrl')}courses`, httpOptions)
      .pipe(map((res) => res));
  }

  getCourse(courseId: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient
      .get(`${localStorage.getItem('baseUrl')}courses/${courseId}`, httpOptions)
      .pipe(map((res) => res));
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
      `${localStorage.getItem('baseUrl')}courses`,
      // params.toString(),
      course,
      httpOptions,
    );
  }

  editCourse(courseId: any, course: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };
    const params = new HttpParams({
      fromObject: course,
    });

    return this.httpClient.put(
      `${localStorage.getItem('baseUrl')}courses/${courseId}`,
      // params.toString(),
      course,
      httpOptions
    );
  }

  deleteCourse(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient.delete(
      `${localStorage.getItem('baseUrl')}courses/${id}`,
      // params.toString(),
      httpOptions
    );
  }
}
