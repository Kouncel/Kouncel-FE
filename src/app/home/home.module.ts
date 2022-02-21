import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authentication/auth-guard.service';
import { CategoryComponent } from './category/category.component';
import { CategoryItemComponent } from './category/category-item/category-item.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzUploadModule } from 'ng-zorro-antd/upload';

const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: CategoryComponent, path: 'categories' },
];

@NgModule({
  declarations: [
    HomeComponent,
    CategoryComponent,
    CategoryItemComponent,
    CreateCategoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationModule,
    ReactiveFormsModule,
    NzUploadModule,
    RouterModule.forRoot(routes),
  ],
})
export class HomeModule {}
