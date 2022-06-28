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
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  files: any = {};
  isLoading: boolean;

  constructor(
    private lessonService: LessonService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {}

  create() {
    this.isLoading = true;
    this.lessonService
      .createLesson(this.courseId, {
        nameEn: this.nameEn,
        nameAr: this.nameAr,
        descriptionEn: this.descriptionEn,
        descriptionAr: this.descriptionAr,
        // order: 20,
      }, this.files)
      .subscribe((res) => {
        this.isLoading = false;
        this.created.emit({
          nameEn: this.nameEn,
          nameAr: this.nameAr,
          descriptionEn: this.descriptionEn,
          descriptionAr: this.descriptionAr,
          order: 20,
        });
        this.notification.create(
          'success',
          'Success',
          'Lesson created successfully',
          { nzPlacement: 'bottomRight' }
        );
        location.reload();
      }, 
      err => this.isLoading = false);
  }

  getFile(e: any, key: any) {
    this.files[key] = {file: e.target.files[0], name: e.target.files[0].name};
  }
}
