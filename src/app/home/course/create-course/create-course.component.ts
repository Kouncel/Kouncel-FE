import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CourseService } from 'src/app/models/courses.service';

@Component({
  selector: 'koun-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  @Output() created: EventEmitter<any> = new EventEmitter<any>();
  title: string;
  constructor(private courseService: CourseService,
    private notification: NzNotificationService,) { }

  ngOnInit(): void {
  }

  create() {
    this.courseService
      .createCourse({
        nameEn: this.title + 'EN',
        nameAr: this.title + 'AR',
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
