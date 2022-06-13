import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'koun-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup = new FormGroup({});
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private notification: NzNotificationService,
    translate: TranslateService
  ) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    localStorage.removeItem('authToken');
    this.authenticationService.setLoggedInState(false);
    // this.subscriptions.push(
    //   this.authenticationService.isLoggedIn.subscribe((isLoggedIn) => {
    //     this.router.navigate(['']);
    //   })
    // );
  }

  login() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    this.authenticationService.setLoggedInState(false);
    this.formGroup.markAsDirty();
    if (this.formGroup.valid) {
      this.authenticationService
        .login(
          this.formGroup.get('email')?.value,
          this.formGroup.get('password')?.value
        )
        .subscribe(
          (authToken) => {
            localStorage.setItem('authToken', authToken.access_token);
            localStorage.setItem('refreshToken', authToken.refresh_token);
            this.authenticationService.setLoggedInState(true);
            if (this.route.snapshot.queryParams['returnUrl'] && this.route.snapshot.queryParams['returnUrl'].indexOf('login') === -1) {
              this.router.navigateByUrl(decodeURIComponent(this.route.snapshot.queryParams['returnUrl']));
            } else {
              this.router.navigate(['']);
            }
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
