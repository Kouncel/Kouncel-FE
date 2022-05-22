import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LessonService {
  constructor(private httpClient: HttpClient) {}

  getAllLessons(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient
      .get(`${localStorage.getItem('baseUrl')}lessons`, httpOptions)
      .pipe(map((res) => res));
  }

  createLesson(lesson: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };
    const params = new HttpParams({
      fromObject: lesson,
    });

    return this.httpClient.post(
      `${localStorage.getItem('baseUrl')}lessons`,
      // params.toString(),
      lesson,
      httpOptions
    );
  }

  deleteLesson(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient.delete(
      `${localStorage.getItem('baseUrl')}lessons/${id}`,
      // params.toString(),
      httpOptions
    );
  }
}
