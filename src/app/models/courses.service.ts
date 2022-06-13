import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, delay, map, Observable, of, retryWhen } from 'rxjs';
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
      .get(`${localStorage.getItem('baseUrl')}courses`, httpOptions)
      .pipe(map((res) => res), retryWhen((errors) => errors.pipe(delay(2000))));
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
      .pipe(map((res) => res), retryWhen((errors) => errors.pipe(delay(2000))));
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

  editCourse(courseId: any, course: any, files: any) {


    console.log(course)
    var form = new FormData();

    form.append("cover", files['coverImage'].file, files['coverImage'].name);
    form.append("image", files['image'].file, files['coverImage'].name);
    form.append("trailer", files['trailer'].file, files['coverImage'].name);
    form.append("sample", files['sample'].file, files['coverImage'].name);
    delete course["id"];
    delete course["coverImage"];
    delete course["image"];
    delete course["trailer"];
    delete course["sample"];
    delete course["category"];
    delete course["instructor"];

    form.append("course", JSON.stringify(course));

    var settings: any = {
      "url": `${localStorage.getItem('baseUrl')}courses/${courseId}`,
      "method": "PUT",
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


    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    //   }),
    // };
    // const params = new HttpParams({
    //   fromObject: course,
    // });

    // return this.httpClient.put(
    //   `${localStorage.getItem('baseUrl')}courses/${courseId}`,
    //   // params.toString(),
    //   course,
    //   httpOptions
    // );
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
