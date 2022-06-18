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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { InstructorComponent } from './instructor/instructor.component';
import { InstructorItemComponent } from './instructor/instructor-item/instructor-item.component';
import { CreateInstructorComponent } from './instructor/create-instructor/create-instructor.component';
import { CourseComponent } from './course/course.component';
import { CourseItemComponent } from './course/course-item/course-item.component';
import { CreateCourseComponent } from './course/create-course/create-course.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../shared/error-interceptor.service';
import { ListingComponent } from './category/listing/listing.component';
import { CategorySectionComponent } from './category/category-section/category-section.component';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
import { CreateLessonComponent } from './lesson/create-lesson/create-lesson.component';
import { ListLessonsComponent } from './lesson/list-lessons/list-lessons.component';
import { LessonComponent } from './lesson/lesson.component';
import { RetryHttpInterceptorService } from '../shared/retry-interceptor.service';

const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: CourseComponent, path: 'courses' },
  { component: CreateCourseComponent, path: 'create-course' },
  { component: CategoryComponent, path: 'categories' },
  { component: CreateCategoryComponent, path: 'create-category' },
  { component: ListingComponent, path: 'list-categories' },
  { component: CreateLessonComponent, path: 'create-lesson' },
  { component: LessonComponent, path: 'course/:id/lessons' },
  { component: InstructorComponent, path: 'instructors' },
  { component: CreateInstructorComponent, path: 'create-instructor' },
  { component: CourseDetailComponent, path: 'course/:id' },
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
    CourseComponent,
    CourseItemComponent,
    CreateCourseComponent,
    ListingComponent,
    CategorySectionComponent,
    CourseDetailComponent,
    CreateLessonComponent,
    ListLessonsComponent,
    LessonComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationModule,
    ReactiveFormsModule,
    FormsModule,
    NzUploadModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: true
    }),
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }
  // , {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: RetryHttpInterceptorService,
  //   multi: true
  // }
]
})
export class HomeModule {}
