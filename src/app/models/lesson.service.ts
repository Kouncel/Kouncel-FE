import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

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
      .get(`${localStorage.getItem('baseUrl')}courses/${courseId}/lessons`, httpOptions)
      .pipe(map((res) => res));
  }

  createLesson(courseId: any, lesson: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };
    var form = new FormData();
    form.append("course", JSON.stringify(lesson));
    const params = new HttpParams({
      fromObject: lesson,
    });

    return this.httpClient.post(
      `${localStorage.getItem('baseUrl')}courses/${courseId}/lessons`,
      // params.toString(),
      form,
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
