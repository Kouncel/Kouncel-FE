import { Component, OnInit } from '@angular/core';
import { LookupsService } from 'src/app/models/lookups.service';

@Component({
  selector: 'koun-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: any[];
  constructor(private lookupService: LookupsService) {
    this.lookupService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  ngOnInit(): void {}
}
