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
      .get(`${localStorage.getItem('baseUrl')}instructor`, httpOptions)
      .pipe(map((res) => res));
  }

  createInstructor(instructor: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };
    const params = new HttpParams({
      fromObject: instructor,
    });

    const formData = new FormData();
    formData.append('image', instructor.image);
    formData.append('nameEn', instructor.nameEn);
    formData.append('nameAr', instructor.nameAr);

    return this.httpClient.post(
      `${localStorage.getItem('baseUrl')}instructor`,
      // params.toString(),
      formData,
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
      `${localStorage.getItem('baseUrl')}instructor/${id}`,
      // params.toString(),
      httpOptions
    );
  }
}
