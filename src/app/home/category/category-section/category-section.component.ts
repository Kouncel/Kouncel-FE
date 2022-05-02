import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'koun-category-section',
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.scss'],
})
export class CategorySectionComponent implements OnInit {
  @ViewChild('coursesHolder', { static: false }) coursesHolder: ElementRef;
  @Input() list: any[];
  @Input() title = 'Category Name';
  globalScroll = 0;

  constructor() {}

  ngOnInit(): void {
    this.list.forEach(element => {
      element.id = Math.ceil(Math.random()*1000);
    });
  }

  scrollElement(direction: string) {
    switch (direction) {
      case 'left':
        this.globalScroll -=
          this.coursesHolder.nativeElement.querySelector(
            '.course-item'
          ).offsetWidth;
        if (this.globalScroll < 0) {
          this.globalScroll = 0;
        }
        this.coursesHolder.nativeElement.scroll({top: 0, left: this.globalScroll, behavior: 'smooth'});
        break;
      case 'right':
        this.globalScroll +=
          this.coursesHolder.nativeElement.querySelector(
            '.course-item'
          ).offsetWidth;
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
        this.coursesHolder.nativeElement.scroll({top: 0, left: this.globalScroll, behavior: 'smooth'});
        break;
    }
  }
}
