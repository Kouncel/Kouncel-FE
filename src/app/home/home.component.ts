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
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit(): void {
    // this.categoryService.createCategory({nameAr: 'testAr'+Math.floor(Math.random() * 1000), nameEn: 'testEn'+Math.floor(Math.random() * 1000)}).subscribe(
    //   res => console.log(res)
    // );
  }
}
