import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    localStorage.getItem('authToken') ? true : false
  );
  isLoggedInSource = this.isLoggedIn.asObservable();
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post('login', { email, password });
  }

  setLoggedInState(state: boolean) {
    this.isLoggedIn.next(state);
  }
}
