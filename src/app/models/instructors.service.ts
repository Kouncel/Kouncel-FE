import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

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
      .get(`${environment.baseUrl}instructor`, httpOptions)
      .pipe(map((res) => res));
  }

  createInstructor(Instructor: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };
    const params = new HttpParams({
      fromObject: Instructor,
    });

    return this.httpClient.post(
      `${environment.baseUrl}instructor`,
      // params.toString(),
      Instructor,
      httpOptions
    );
  }

  deleteInstructor(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };

    return this.httpClient.delete(
      `${environment.baseUrl}instructor/${id}`,
      // params.toString(),
      httpOptions
    );
  }
}
