import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/models/categories.service';

@Component({
  selector: 'koun-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  @ViewChild('detailsContainer', { static: false })
  detailsContainer: ElementRef;
  categories: any[] = [];

  instructorsArr: string[] = [
    `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
      Math.random() * 1000
    )}`,
    `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
      Math.random() * 1000
    )}`,
    `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
      Math.random() * 1000
    )}`,
    `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
      Math.random() * 1000
    )}`,
  ];

  constructor(
    private categoriesService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe(
      res => {
        res = res.filter((c: any) => c.courses.length);
        res.forEach((element: any, i: number) => {
          element.name = element.nameEn || element.nameAr;
        });
        this.categories = res;
      }
    );
  }

  scrollToDetails() {
    document
      .querySelector('body, html')
      .scroll({
        top: this.detailsContainer.nativeElement.querySelector(
          '.details-container'
        ).offsetTop,
        left: 0,
        behavior: 'smooth',
      });
  }
}
