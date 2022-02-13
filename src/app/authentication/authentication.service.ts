import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    localStorage.getItem('authToken') ? true : false
  );
  isLoggedInSource = this.isLoggedIn.asObservable();
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    const params = new HttpParams({
      fromObject: {
        username: email,
        password,
      },
    });

    return this.httpClient.post(
      `${environment.baseUrl}/accounts/login`,
      params.toString(),
      httpOptions
    );
  }

  register(registrationObj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    const params = new HttpParams({
      fromObject: registrationObj,
    });

    return this.httpClient.post(
      `${environment.baseUrl}/accounts/register`,
      params.toString(),
      httpOptions
    );
  }

  setLoggedInState(state: boolean) {
    this.isLoggedIn.next(state);
  }
}
