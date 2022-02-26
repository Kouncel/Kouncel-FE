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
import { InstructorComponent } from './instructor/instructor.component';
import { InstructorItemComponent } from './instructor/instructor-item/instructor-item.component';
import { CreateInstructorComponent } from './instructor/create-instructor/create-instructor.component';
import { EarlyBirdComponent } from './early-bird/early-bird.component';
import { EarlyBirdSuccessComponent } from './early-bird/early-bird-success/early-bird-success.component';

const routes: Routes = [
  { component: EarlyBirdComponent, path: '' },
  { path: '**', redirectTo: '' },
  // { component: CategoryComponent, path: 'categories' },
  // { component: InstructorComponent, path: 'instructors' },
];

@NgModule({
  declarations: [
    HomeComponent,
    CategoryComponent,
    CategoryItemComponent,
    CreateCategoryComponent,
    InstructorComponent,
    InstructorItemComponent,
    CreateInstructorComponent,
    EarlyBirdComponent,
    EarlyBirdSuccessComponent,
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
