import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CategoryService } from 'src/app/models/categories.service';

@Component({
  selector: 'koun-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(
    translate: TranslateService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }
  create() {
    this.categoryService
      .createCategory({
        nameEn: this.formGroup.get('title').value + 'EN',
        nameAr: this.formGroup.get('title').value + 'AR',
      })
      .subscribe((res) => {
        console.log(res);
        location.reload();
      });
    console.log('create category');
  }
  handleChange(e: any) {}
}
