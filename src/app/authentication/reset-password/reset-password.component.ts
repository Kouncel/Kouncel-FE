import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'koun-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    localStorage.removeItem('authToken');
    this.authenticationService.setLoggedInState(false);
    // this.subscriptions.push(
    //   this.authenticationService.isLoggedIn.subscribe((isLoggedIn) => {
    //     this.router.navigate(['']);
    //   })
    // );
  }

  resetPassword() {
    this.formGroup.markAsDirty();
    if (this.formGroup.valid) {
      this.authenticationService
        .resetPassword(this.formGroup.get('email')?.value)
        .subscribe(
          (res) => {
            this.router.navigate(['/reset-verify'], {queryParams: {email: this.formGroup.get('email')?.value}});
          },
          (err) => {
            err?.error?.errors?.forEach((element: any) => {
              this.notification.create(
                'error',
                'Registration Error',
                element.error_description,
                { nzPlacement: 'bottomRight' }
              );
            });
          }
        );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
