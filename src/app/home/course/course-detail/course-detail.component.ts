import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import mixpanel from 'mixpanel-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryService } from 'src/app/models/categories.service';
import { CourseService } from 'src/app/models/courses.service';
import { LessonService } from 'src/app/models/lesson.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'koun-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  shareModalActive = false;
  course: any = { instructor: {}, category: {} };
  relatedCourses: any;
  videoTypeKey: any = 'trailer';
  overlayVideoTypeKey: string = 'trailer';
  videoModalActive: any;
  lessons: any;
  isRTL: boolean;
  subscribers: any = [];
  courseUrl: string;

  selectedLessonId: any;

  faq = [
    {
      selected: false,
      id: 1,
      question: 'Lorem Ipsum Question?',
      answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      selected: false,
      id: 2,
      question: 'Lorem Ipsum Question?',
      answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      selected: false,
      id: 3,
      question: 'Lorem Ipsum Question?',
      answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      selected: false,
      id: 4,
      question: 'Lorem Ipsum Question?',
      answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      selected: false,
      id: 5,
      question: 'Lorem Ipsum Question?',
      answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      selected: false,
      id: 6,
      question: 'Lorem Ipsum Question?',
      answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      selected: false,
      id: 7,
      question: 'Lorem Ipsum Question?',
      answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      selected: false,
      id: 8,
      question: 'Lorem Ipsum Question?',
      answer:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    router: Router,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private lessonService: LessonService,
    private utilsService: UtilsService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.courseService.getCourse(params.id).subscribe((course: any) => {
        this.courseUrl = location.href;
        this.course = course;
        mixpanel.track('Course Clicked', {
          'course_id': params.id,
          'course_name': course.nameEn,
          'category_id': course.category.id,
          'category_name': course.category.nameEn,
        });
        this.categoryService
          .getAllCategories()
          .subscribe((catgegories: any) => {
            const currentCategory = catgegories.find(
              (c: any) => c.id === this.course.category.id
            );
            this.relatedCourses = currentCategory.courses.filter(
              (c: any) => c.id !== this.course.id
            );
          });
      });
      this.lessonService.getAllLessons(params.id).subscribe((lessons: any) => {
        this.lessons = lessons.data;
      });
    });
    this.subscribers = [];

    this.subscribers.push(
      this.utilsService.languageSource.subscribe((lang) => {
        this.isRTL = lang === 'ar';
      })
    );
  }

  sendAnalytics(analyticsType: string) {
    if (analyticsType === 'sample') {
      mixpanel.track('Sample CTA Clicked', {
        'course_id': this.course.id,
        'course_name': this.course.nameEn,
      });
    } else if (analyticsType === 'trailer') {
      mixpanel.track('Trailer CTA Clicked', {
        'course_id': this.course.id,
        'course_name': this.course.nameEn,
      });
    } else if (analyticsType === 'share') {
      mixpanel.track('Share Clicked', {
        'course_id': this.course.id,
        'course_name': this.course.nameEn,
      });
    } else if (analyticsType === 'subscribe') {
      mixpanel.track('Subscribe Clicked', {
        'course_id': this.course.id,
        'course_name': this.course.nameEn,
        'course_price': this.course.price,
      });
    } else if (analyticsType === 'category') {
      mixpanel.track('Category Clicked', {
        'category_id': this.course.category.id,
        'category_name': this.course.category.nameEn,
      });
    }
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.courseUrl);
    this.notification.create(
      'success',
      'Copied to clipboard',
      '',
      { nzPlacement: 'bottomRight' }
    );
  }
}
