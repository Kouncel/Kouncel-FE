import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'koun-register-verify',
  templateUrl: './register-verify.component.html',
  styleUrls: ['./register-verify.component.scss']
})
export class RegisterVerifyComponent implements OnInit {
  @Input() email: string;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private notification: NzNotificationService
  ) {
    this.route.queryParams.subscribe(
      params => {
        this.email = params['email']
      }
    )
  }

  ngOnInit(): void {
  }

  resend() {
    this.authenticationService
      .sendVerifyEmail(this.email)
      .subscribe(
        (res) => {
          this.notification.create(
            'success',
            'Success',
            'Verify email sent',
            { nzPlacement: 'bottomRight' }
          );
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
