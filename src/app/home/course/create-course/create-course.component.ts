import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryService } from 'src/app/models/categories.service';
import { CourseService } from 'src/app/models/courses.service';
import { InstructorService } from 'src/app/models/instructors.service';

@Component({
  selector: 'koun-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  @Output() created: EventEmitter<any> = new EventEmitter<any>();
  nameEn: string;
  nameAr: string;
  descriptionAr: string;
  descriptionEn: string;
  overviewAr: string;
  overviewEn: string;
  price: number;
  status: string = 'DRAFT';
  categoryId: any;
  categories: any[];
  instructors: any[];
  instructorId: any[];
  files: any = {};
  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
    private instructorService: InstructorService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
    this.instructorService.getAllInstructors().subscribe((res) => {
      this.instructors = res;
    });
  }

  create() {
    this.courseService
      .createCourse({
        nameEn: this.nameEn,
        nameAr: this.nameAr,
      })
      .subscribe((res: any) => {
        this.created.emit({
          nameEn: this.nameEn,
          nameAr: this.nameAr,
        });
        res['instructorId'] = this.instructorId;
        res['categoryId'] = this.categoryId;
        res['descriptionAr'] = this.descriptionAr;
        res['descriptionEn'] = this.descriptionEn;
        res['overviewAr'] = this.overviewAr;
        res['overviewEn'] = this.overviewEn;
        res['price'] = this.price;
        res['status']= this.status;
        this.courseService.editCourse(res['id'], res, this.files).subscribe((res) => {
          this.notification.create(
            'success',
            'Success',
            'Course created successfully',
            { nzPlacement: 'bottomRight' }
          );
        });
      });
  }

  getFile(e: any, key: any) {
    this.files[key] = {file: e.target.files[0], name: e.target.files[0].name};
  }
}
