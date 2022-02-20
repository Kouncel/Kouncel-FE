import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  language: BehaviorSubject<string> = new BehaviorSubject<string>('en');
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

  setLanguage(lang: string) {
    this.language.next(lang);
  }
}
