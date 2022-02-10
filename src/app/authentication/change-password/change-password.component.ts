import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LookupsService } from 'src/app/models/lookups.service';
import { UtilsService } from 'src/app/shared/utils.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'koun-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  subscriptions: Subscription[] = [];

  countries: any[] = [];
  professions: any[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private lookupsService: LookupsService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
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
    if (this.formGroup.valid) {
      this.router.navigate(['/change-password-success']);
      // this.authenticationService
      //   .login(
      //     this.formGroup.get('email')?.value,
      //     this.formGroup.get('password')?.value
      //   )
      //   .subscribe((authToken) => {
      //     localStorage.setItem('authToken', authToken);
      //     this.authenticationService.setLoggedInState(true);
      //     this.router.navigate(['verify']);
      //   });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
