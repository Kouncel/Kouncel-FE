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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: RegisterVerifyComponent },
  { path: 'verify-success', component: RegisterSuccessComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterSuccessComponent,
    RegisterVerifyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NzToolTipModule,
  ],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
