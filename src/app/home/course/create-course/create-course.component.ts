import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/models/courses.service';

@Component({
  selector: 'koun-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
  }

  create() {
    this.courseService
      .createCourse({
        nameEn: 'Test' + Math.ceil(Math.random() * 1000) + 'EN',
        nameAr: 'Test' + Math.ceil(Math.random() * 1000) + 'AR',
      })
      .subscribe((res) => {
        console.log(res);
        // location.reload();
      });
  }

}
