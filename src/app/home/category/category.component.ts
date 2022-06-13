import { Component, OnInit } from '@angular/core';
import { LookupsService } from 'src/app/models/lookups.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CategoryService } from 'src/app/models/categories.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'koun-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: any[];
  createModalActive: boolean;
  subscribers: any = [];
  isRTL: boolean;

  constructor(
    private lookupService: LookupsService,
    public authenticationService: AuthenticationService,
    private categoryService: CategoryService,
    translate: TranslateService,
    private utilsService: UtilsService
  ) {
    
    this.categoryService.getAllCategories().subscribe(
      res => this.categories = res.map((c: any) => {
        c.title = c.nameEn;
        c.description = c.description || c.nameEn || '';
        c.image = `https://source.unsplash.com/random/300x200?sig=${Math.ceil(Math.random()*1000)}`;
        return c;
      })
    );

    // this.lookupService
    //   .getCategories()
    //   .subscribe((categories) => (this.categories = categories));
  }

  ngOnInit(): void {
    this.subscribers = [];

    this.subscribers.push(this.utilsService.languageSource.subscribe((lang) => {
      this.isRTL = lang === 'ar';
    }));
  }

  categoryCreated(e: any) {
    e.title = e.nameEn;
    e.description = e.description || e.nameEn || '';
    e.image = `https://source.unsplash.com/random/300x200?sig=${Math.ceil(Math.random()*1000)}`;
    this.categories.push(e);
  }
}
