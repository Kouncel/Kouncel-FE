import { Component, OnInit } from '@angular/core';
import { LessonService } from 'src/app/models/lesson.service';

@Component({
  selector: 'koun-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  constructor(
    private lessonService: LessonService
  ) { }

  ngOnInit(): void {
    this.lessonService.getAllLessons().subscribe(res => console.log(res));
  }

}
