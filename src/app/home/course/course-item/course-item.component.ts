import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CourseService } from 'src/app/models/courses.service';

@Component({
  selector: 'koun-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input() course: any;
  @Input() id: string;
  @Input() title: string = 'Category Title';
  @Input() status: string = 'DRAFT';
  @Input() description: string;
  @Input() image: string;
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  showPublishButton: boolean = true;


  constructor(public authenticationService: AuthenticationService,
    private courseService: CourseService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    Object.keys(this.course).forEach(key => {
      if (!this.course[key] || this.status !== 'DRAFT') {
        this.showPublishButton = false;
      }
    });
  }

  editCourse(e: any) {
    e.preventDefault();
    this.edit.emit(this.id);
  }
  delete(e: any) {
    e.preventDefault();
    alert('Delete');
  }
  publishCourse(e: any, status: string) {
    const course = {...this.course};
    course.categoryId = course.category.id;
    course.instructorId = course.instructor.id;
    delete course.category;
    delete course.instructor;
    course.status = status;
    this.courseService.editCourse(this.id, course, []).subscribe(res => {
      this.showPublishButton = true;
      this.status = status;
      this.notification.create(
        'success',
        'Success',
        `Course set to ${status} successfully`,
        { nzPlacement: 'bottomRight' }
      );
    });
  }
}
