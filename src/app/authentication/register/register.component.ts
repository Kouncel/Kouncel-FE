import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LookupsService } from 'src/app/models/lookups.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'koun-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  formGroup: FormGroup = new FormGroup({});
  subscriptions: Subscription[] = [];

  countries: any[] = [];
  professions: any[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private lookupsService: LookupsService
  ) {
    this.lookupsService
      .getCountries()
      .subscribe((countries) => (this.countries = countries));
    this.lookupsService
      .getProfessions()
      .subscribe((professions) => (this.professions = professions));
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        birthDate: new FormControl('', [Validators.required]),
        gender: new FormControl('Male', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        profession: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [RegisterComponent.match('password', 'confirmPassword')],
      }
    );
    // this.subscriptions.push(
    //   this.authenticationService.isLoggedIn.subscribe((isLoggedIn) => {
    //     this.router.navigate(['']);
    //   })
    // );
  }

  register() {
    console.log(this.formGroup);
    this.formGroup.markAsDirty();
    if (this.formGroup.valid) {
      this.authenticationService
        .login(
          this.formGroup.get('email')?.value,
          this.formGroup.get('password')?.value
        )
        .subscribe((authToken) => {
          localStorage.setItem('authToken', authToken);
          this.authenticationService.setLoggedInState(true);
          this.router.navigate(['verify']);
        });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

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
}
