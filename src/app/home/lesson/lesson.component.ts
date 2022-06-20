import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CourseService } from 'src/app/models/courses.service';
import { LessonService } from 'src/app/models/lesson.service';

@Component({
  selector: 'koun-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit {
  createModalActive: boolean;
  course: any;
  courseId: any;
  lessons: any[];

  constructor(
    private lessonService: LessonService,
    public authenticationService: AuthenticationService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];
    this.lessonService
      .getAllLessons(this.courseId)
      .subscribe((res) => (this.lessons = res.data));
    this.courseService
      .getCourse(this.courseId)
      .subscribe((res) => (this.course = res));
  }

  lessonCreated(e: any) {
    e.title = e.nameEn;
    e.description = e.description || e.nameEn || '';
    e.image = `https://picsum.photos/700?random=${Math.ceil(Math.random()*1000)}`;
    this.lessons.push(e);
    this.createModalActive = false;
  }
}
