import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryService } from 'src/app/models/categories.service';
import { CourseService } from 'src/app/models/courses.service';
import { InstructorService } from 'src/app/models/instructors.service';

@Component({
  selector: 'koun-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  @Output() created: EventEmitter<any> = new EventEmitter<any>();
  title: string;
  categoryId: any;
  categories: any[];
  instructors: any[];
  instructorId: any[];
  constructor(private courseService: CourseService,
    private categoryService: CategoryService,
    private instructorService: InstructorService,
    private notification: NzNotificationService,) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
    this.instructorService.getAllInstructors().subscribe(res => {
      this.instructors = res;
    });
  }

  create() {
    this.courseService
      .createCourse({
        nameEn: this.title + 'EN',
        nameAr: this.title + 'AR',
        categoryId: this.categoryId
      })
      .subscribe((res) => {
        this.created.emit({
          nameEn: this.title + 'EN',
          nameAr: this.title + 'AR',
        });
        this.notification.create(
        'success',
        'Success',
        'Course created successfully',
        { nzPlacement: 'bottomRight' }
      );
      });
  }

}
