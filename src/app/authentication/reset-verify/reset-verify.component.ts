import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'koun-reset-verify',
  templateUrl: './reset-verify.component.html',
  styleUrls: ['./reset-verify.component.scss'],
})
export class ResetVerifyComponent implements OnInit {
  @Input() email: string;

  constructor(private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private notification: NzNotificationService) {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
  }

  ngOnInit(): void {}

  resend() {
    this.authenticationService
      .resetPassword(this.email)
      .subscribe(
        (res) => {
          this.notification.create(
            'success',
            'Success',
            'Password reset link sent',
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
