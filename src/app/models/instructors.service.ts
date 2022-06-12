import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, delay, map, Observable, of, retryWhen } from 'rxjs';
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
      .get(`${localStorage.getItem('baseUrl')}instructor`, httpOptions)
      .pipe(map((res) => res), retryWhen((errors) => errors.pipe(delay(2000))));
  }

  createInstructor(instructor: any) {
    console.log(instructor)
      var form = new FormData();
      form.append("image", instructor.image, "Screen Shot 2022-05-08 at 1.35.10 PM.png");
      delete instructor.image;
      form.append("instructor", JSON.stringify(instructor));

      var settings: any = {
        "url": `${localStorage.getItem('baseUrl')}instructor`,
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
      });

      return of({});

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
      `${localStorage.getItem('baseUrl')}instructor`,
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
      `${localStorage.getItem('baseUrl')}instructor/${id}`,
      // params.toString(),
      httpOptions
    );
  }
}
