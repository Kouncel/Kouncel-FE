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
import { UtilsService } from 'src/app/shared/utils.service';
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
        birthdate: new FormControl('', [Validators.required]),
        gender: new FormControl('Male', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        profession: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{6,100}$/
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [UtilsService.match('password', 'confirmPassword')],
      }
    );
    // this.subscriptions.push(
    //   this.authenticationService.isLoggedIn.subscribe((isLoggedIn) => {
    //     this.router.navigate(['']);
    //   })
    // );
  }

  register() {
    this.formGroup.markAsDirty();
    console.log();
    if (this.formGroup.valid) {
      const registrationOb = { ...this.formGroup.value };
      registrationOb.professionId = '0459cc91-7bce-422b-98c7-fe0b8a054b94';
      registrationOb.birthdate = '1996-01-24T17:33:07Z';
      delete registrationOb.profession;
      this.authenticationService
        .register(registrationOb)
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
}
