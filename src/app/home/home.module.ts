import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authentication/auth-guard.service';

const routes: Routes = [{ component: HomeComponent, path: '' }];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class HomeModule {}
