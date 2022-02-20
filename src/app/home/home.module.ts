import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authentication/auth-guard.service';
import { CategoryComponent } from './category/category.component';
import { CategoryItemComponent } from './category/category-item/category-item.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationModule } from '../authentication/authentication.module';

const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: CategoryComponent, path: 'categories' },
];

@NgModule({
  declarations: [HomeComponent, CategoryComponent, CategoryItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationModule,
    RouterModule.forRoot(routes),
  ],
})
export class HomeModule {}
