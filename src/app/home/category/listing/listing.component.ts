import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/models/categories.service';
import { HeaderService } from 'src/app/models/header.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'koun-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  @ViewChild('detailsContainer', { static: false })
  detailsContainer: ElementRef;
  categories: any[] = [];
  headerData: any = {};
  lang = 'en';

  instructorsArr: string[] = [
    `https://picsum.photos/700?random=${Math.ceil(Math.random()*1000)}`,
    `https://picsum.photos/700?random=${Math.ceil(Math.random()*1000)}`,
    `https://picsum.photos/700?random=${Math.ceil(Math.random()*1000)}`,
    `https://picsum.photos/700?random=${Math.ceil(Math.random()*1000)}`,
  ];

  constructor(
    private categoriesService: CategoryService,
    private utilsService: UtilsService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.utilsService.languageSource.subscribe(
      lang => this.lang = lang
    );
    this.headerService.getHeader().subscribe(
      res => this.headerData = res
    );
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
