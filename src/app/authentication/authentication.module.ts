import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { RegisterVerifyComponent } from './register-verify/register-verify.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetVerifyComponent } from './reset-verify/reset-verify.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordSuccessComponent } from './change-password-success/change-password-success.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: RegisterVerifyComponent },
  { path: 'verify-success', component: RegisterSuccessComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-verify', component: ResetVerifyComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  {
    path: 'change-password-success',
    component: ChangePasswordSuccessComponent,
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterSuccessComponent,
    RegisterVerifyComponent,
    ResetPasswordComponent,
    ResetVerifyComponent,
    ChangePasswordComponent,
    ChangePasswordSuccessComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NzToolTipModule,
    NzNotificationModule,
  ],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
