import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LessonService } from 'src/app/models/lesson.service';

@Component({
  selector: 'koun-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.scss'],
})
export class CreateLessonComponent implements OnInit {
  @Input() courseId: any;
  @Output() created: EventEmitter<any> = new EventEmitter<any>();
  title: string;
  description: string;
  files: any = {};

  constructor(
    private lessonService: LessonService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {}

  create() {
    this.lessonService
      .createLesson(this.courseId, {
        nameEn: this.title + 'EN',
        nameAr: this.title + 'AR',
        descriptionEn: this.description + 'EN',
        descriptionAr: this.description + 'AR',
        // order: 20,
      }, this.files)
      .subscribe((res) => {
        this.created.emit({
          nameEn: this.title + 'EN',
          nameAr: this.title + 'AR',
          descriptionEn: this.description + 'EN',
          descriptionAr: this.description + 'AR',
          order: 20,
        });
        this.notification.create(
          'success',
          'Success',
          'Lesson created successfully',
          { nzPlacement: 'bottomRight' }
        );
      });
  }

  getFile(e: any, key: any) {
    this.files[key] = {file: e.target.files[0], name: e.target.files[0].name};
  }
}
