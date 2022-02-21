import { Component, OnInit } from '@angular/core';
import { LookupsService } from 'src/app/models/lookups.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'koun-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: any[];
  createModalActive: boolean;
  constructor(
    private lookupService: LookupsService,
    public authenticationService: AuthenticationService,
    translate: TranslateService
  ) {
    this.lookupService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  ngOnInit(): void {}
}
