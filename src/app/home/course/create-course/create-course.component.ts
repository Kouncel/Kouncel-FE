import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() course: any;
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
  isLoading: boolean;

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
    if (this.course) {
      this.nameEn = this.course.nameEn;
      this.nameAr = this.course.nameAr;
      this.descriptionAr = this.course.descriptionAr;
      this.descriptionEn = this.course.descriptionEn;
      this.overviewAr = this.course.overviewAr;
      this.overviewEn = this.course.overviewEn;
      this.price = this.course.price;
      this.status = this.course.status;
      if (this.course.category) {
        this.categoryId = this.course.category.id;
      }
      if (this.course.instructor) {
        this.instructorId = this.course.instructor.id;
      }
    }
  }

  create() {
    this.isLoading = true;
    if (this.course) {
      this.course.categoryId = this.categoryId;
      this.course.instructorId = this.instructorId;
      this.course.nameEn = this.nameEn;
      this.course.nameAr = this.nameAr;
      this.course.descriptionAr = this.descriptionAr;
      this.course.descriptionEn = this.descriptionEn;
      this.course.overviewAr = this.overviewAr;
      this.course.overviewEn = this.overviewEn;
      this.course.price = this.price;
      this.course.status = this.status;
      this.courseService.editCourse(this.course.id, {...this.course}, this.files).subscribe((res) => {
        this.isLoading = false;
        this.notification.create(
          'success',
          'Success',
          'Course edited successfully',
          { nzPlacement: 'bottomRight' }
        );
      }, err => this.isLoading = false);
    } else { 
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
          this.isLoading = false
          this.notification.create(
            'success',
            'Success',
            'Course created successfully',
            { nzPlacement: 'bottomRight' }
          );
        }, err => this.isLoading = false);
      }, err => this.isLoading = false);
    }
  }

  getFile(e: any, key: any) {
    this.files[key] = {file: e.target.files[0], name: e.target.files[0].name};
  }
}
