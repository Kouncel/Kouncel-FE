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
import { TranslateService } from '@ngx-translate/core';
import mixpanel from 'mixpanel-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { LookupsService } from 'src/app/models/lookups.service';
import { ProfessionsService } from 'src/app/models/professions.service';
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
  isRTL: boolean;

  countries: any[] = [];
  professions: any[] = [];
  showHidePassword = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private lookupsService: LookupsService,
    private professionsService: ProfessionsService,
    private notification: NzNotificationService,
    private utilsService: UtilsService,
    translate: TranslateService
  ) {
    this.professionsService.getAllProfessions().subscribe((res: any) => {
      this.professions = res['data'];
    });
    this.lookupsService
      .getCountries()
      .subscribe((countries) => (this.countries = countries));
      this.utilsService.languageSource.subscribe((lang) => {
        this.isRTL = lang === 'ar';
      })
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
    setTimeout(() => {
      console.log(this.formGroup)
      Object.keys(this.formGroup.controls).forEach(key => {
        console.log(this.formGroup.controls[key].errors)
      });
    }, 2000);
  }

  register() {
    // TODO: Check why validators are not working when marking as dirty
    this.formGroup.markAllAsTouched();
    // this.formGroup.markAsDirty();
    if (this.formGroup.valid) {
      mixpanel.track('Registration Started', {
        'email_address': this.formGroup.get('email')?.value
      });
      const registrationOb = { ...this.formGroup.value };
      registrationOb.professionId = registrationOb.profession;
      registrationOb.birthdate = '1996-01-24T17:33:07Z';
      delete registrationOb.profession;
      this.authenticationService.register(registrationOb).subscribe(
        (authToken) => {
          this.router.navigate(['verify'], {queryParams: {email: this.formGroup.get('email')?.value}});
          mixpanel.track('Registration Succuss', {
            'email_address': this.formGroup.get('email')?.value
          });
          mixpanel.track('Email Verification Sent', {
            'email_address': this.formGroup.get('email')?.value
          });
        },
        (err) => {
          // err?.error?.errors?.forEach((element: any) => {
          //   this.notification.create(
          //     'error',
          //     'Registration Error',
          //     element.error_description,
          //     { nzPlacement: 'bottomRight' }
          //   );
          // });
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
