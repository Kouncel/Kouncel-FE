import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private authenticationService: AuthenticationService
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
      this.router.navigate(['/reset-verify']);
      // this.authenticationService
      //   .login(
      //     this.formGroup.get('email')?.value,
      //     this.formGroup.get('password')?.value
      //   )
      //   .subscribe((authToken) => {
      //     localStorage.setItem('authToken', authToken);
      //     this.authenticationService.setLoggedInState(true);
      //     this.router.navigate(['']);
      //   });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
