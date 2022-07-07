import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CategoryService } from '../models/categories.service';

@Component({
  selector: 'koun-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: [];

  constructor(translate: TranslateService,
    private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    // this.categoryService.createCategory({nameAr: 'testAr'+Math.floor(Math.random() * 1000), nameEn: 'testEn'+Math.floor(Math.random() * 1000)}).subscribe(
    //   res => console.log(res)
    // );
  }
}
