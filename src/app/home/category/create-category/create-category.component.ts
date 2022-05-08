import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryService } from 'src/app/models/categories.service';

@Component({
  selector: 'koun-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  @Output() created: EventEmitter<any> = new EventEmitter<any>();
  formGroup: FormGroup = new FormGroup({});

  constructor(
    translate: TranslateService,
    private categoryService: CategoryService,
    private notification: NzNotificationService,
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
        this.created.emit({
          nameEn: this.formGroup.get('title').value + 'EN',
          nameAr: this.formGroup.get('title').value + 'AR',
        });
        this.notification.create(
        'success',
        'Success',
        'Category created successfully',
        { nzPlacement: 'bottomRight' }
      );
      });
  }
  handleChange(e: any) {}
}
