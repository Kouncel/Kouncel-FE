import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    localStorage.getItem('authToken') ? true : false
  );
  isLoggedInSource = this.isLoggedIn.asObservable();
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return of('77878dy8w7ef78we6f87w6ef876w7e8f678d6f89wye7ftw78==');
    return this.httpClient.post('login', { email, password });
  }

  setLoggedInState(state: boolean) {
    this.isLoggedIn.next(state);
  }
}
