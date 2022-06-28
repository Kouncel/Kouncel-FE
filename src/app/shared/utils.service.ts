import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, delay, mergeMap, of, take, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  language: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('lang') || 'en'
  );
  languageSource = this.language.asObservable();

  constructor() {}

  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (
        checkControl &&
        checkControl.errors &&
        !checkControl.errors['matching']
      ) {
        return null;
      }
      if (control.value !== checkControl.value) {
        controls.get(checkControlName).setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  static retryRequest(): any {
    return mergeMap((response: any) => {
      if (response.status === 401) {
        return of(response).pipe(delay(2500), take(9));
      }
      return throwError({
        error: 'Unknown error for asynchronous function:' + response,
      });
    })
  }

  setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.language.next(lang);
  }
}
