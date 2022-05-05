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
  categories: any[];
  createModalActive: boolean;
  constructor(
    private lookupService: LookupsService,
    public authenticationService: AuthenticationService,
    private courseService: CourseService,
    translate: TranslateService
  ) {
    this.courseService.getAllCourses().subscribe((res) => {
      if (res && res.data) {
        this.categories = res.data.map((c: any) => {
          c.title = c.nameEn;
          c.description = c.description || c.nameEn || '';
          c.image = `https://source.unsplash.com/random/300x200?sig=${Math.ceil(
            Math.random() * 1000
          )}`;
          return c;
        });
      }
    });
  }

  ngOnInit(): void {
  }
}
