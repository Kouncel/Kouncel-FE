import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CategoryService } from 'src/app/models/categories.service';
import { CourseService } from 'src/app/models/courses.service';
import { LookupsService } from 'src/app/models/lookups.service';

@Component({
  selector: 'koun-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  courses: any[];
  createModalActive: boolean;
  selectedCourse: any;
  constructor(
    private lookupService: LookupsService,
    public authenticationService: AuthenticationService,
    private courseService: CourseService,
    translate: TranslateService
  ) {
    this.courseService.getAllCourses().subscribe((res) => {
      if (res && res.data) {
        this.courses = res.data.map((c: any) => {
          c.title = c.nameEn;
          c.description = c.description || c.nameEn || '';
          c.image = c.coverImage || 'https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-17.jpg' || `https://picsum.photos/700?random=${Math.ceil(Math.random()*1000)}`;
          return c;
        });
      }
    });
  }

  ngOnInit(): void {
  }

  handleEditCourse(e: any) {
    this.selectedCourse = this.courses.find(c => c.id == e);
    this.createModalActive = true;
  }

  courseCreated(e: any) {
    e.title = e.nameEn;
    e.description = e.description || e.nameEn || '';
    e.image = `https://picsum.photos/700?random=${Math.ceil(Math.random()*1000)}`;
    this.courses.push(e);
  }
}
