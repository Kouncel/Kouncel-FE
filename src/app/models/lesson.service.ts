import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as $ from "jquery";

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

  createLesson(courseId: any, lesson: any, files: any) {
    var form = new FormData();

    form.append("video", files['video'].file, files['video'].name);
    form.append("lesson", JSON.stringify(lesson));

    var settings: any = {
      "url": `${localStorage.getItem('baseUrl')}courses/${courseId}/lessons`,
      "method": "POST",
      "timeout": 0, 
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`},
      "data": form
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });

    return of({});
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
