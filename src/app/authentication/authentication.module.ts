import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, RouterModule.forRoot(routes), FormsModule],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
