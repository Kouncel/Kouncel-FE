import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    localStorage.getItem('authToken') ? true : false
  );
  isLoggedInSource = this.isLoggedIn.asObservable();

  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdminSource = this.isAdmin.asObservable();

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const formObject = {
      username: email,
      password,
    };
    const params = new HttpParams({
      fromObject: formObject,
    });

    return this.httpClient.post(
      `${localStorage.getItem('baseUrl')}accounts/login`,
      formObject,
      httpOptions
    );
  }

  resetPassword(email: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    const params = new HttpParams({
      fromObject: {
        email,
      },
    });

    return this.httpClient.post(
      `${localStorage.getItem('baseUrl')}accounts/forgot-password`,
      // params.toString(),
      { email },
      httpOptions
    );
  }

  register(registrationObj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const params = new HttpParams({
      fromObject: registrationObj,
    });

    return this.httpClient.post(
      `${localStorage.getItem('baseUrl')}accounts/register`,
      // params.toString(),
      registrationObj,
      httpOptions
    );
  }

  refreshToken(refreshToken: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }),
    };
    const params = new HttpParams({
      fromObject: refreshToken,
    });

    return this.httpClient.post(
      `${localStorage.getItem('baseUrl')}accounts/refresh`,
      // params.toString(),
      {refreshToken},
      httpOptions
    );
  }

  setLoggedInState(state: boolean) {
    this.isLoggedIn.next(state);
    try {
      const decodedJWT: any = jwt_decode(localStorage.getItem('authToken'));
      this.setIsAdminState(!!decodedJWT['realm_access']['roles'].find((r: any) => r === 'Kadmin'));
    } catch(e) { }
  }
  setIsAdminState(isAdmin: boolean) {
    this.isAdmin.next(isAdmin);
  }
}
