import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'koun-category-section',
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.scss'],
})
export class CategorySectionComponent implements OnInit, OnDestroy {
  @ViewChild('coursesHolder', { static: false }) coursesHolder: ElementRef;
  @Input() list: any[];
  @Input() title = 'Category Name';
  subscribers: any[] = [];
  isRTL = false;
  globalScroll = 0;

  constructor(
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.subscribers = [];

    this.subscribers.push(this.utilsService.languageSource.subscribe((lang) => {
      this.isRTL = lang === 'ar';
    }));
  }

  scrollElement(direction: string) {
    switch (direction) {
      case 'left':
        if (this.isRTL) {
          this.globalScroll +=
            this.coursesHolder.nativeElement.querySelector(
              '.course-item'
            ).offsetWidth;
        } else {
          this.globalScroll -=
            this.coursesHolder.nativeElement.querySelector(
              '.course-item'
            ).offsetWidth;
        }
        break;
      case 'right':
          if (this.isRTL) {
            this.globalScroll -=
              this.coursesHolder.nativeElement.querySelector(
                '.course-item'
              ).offsetWidth;
          } else {
            this.globalScroll +=
              this.coursesHolder.nativeElement.querySelector(
                '.course-item'
              ).offsetWidth;
          }
        break;
    }

    if (this.globalScroll < 0) {
      this.globalScroll = 0;
    }
    if (
      this.globalScroll >
      this.coursesHolder.nativeElement.querySelector('.course-item')
        .offsetWidth *
        (this.list.length - 3)
    ) {
      this.globalScroll =
        this.coursesHolder.nativeElement.querySelector('.course-item')
          .offsetWidth *
        (this.list.length - 3);
    }
    console.log(this.globalScroll);
    if (this.isRTL) {
      this.coursesHolder.nativeElement.scroll({top: 0, left: this.globalScroll * -1, behavior: 'smooth'});
    } else {
      this.coursesHolder.nativeElement.scroll({top: 0, left: this.globalScroll, behavior: 'smooth'});
    }
  }

  ngOnDestroy(): void {
    this.subscribers.forEach(element => {
      element.unsubscribe();
    });
    this.subscribers = [];
  }
}
