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
  isLoading: boolean;

  constructor(
    translate: TranslateService,
    private categoryService: CategoryService,
    private notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      nameEn: new FormControl('', [Validators.required]),
      nameAr: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }
  create() {
    this.isLoading = true;
    this.categoryService
      .createCategory({
        nameEn: this.formGroup.get('nameEn').value,
        nameAr: this.formGroup.get('nameAr').value,
      })
      .subscribe((res) => {
        this.isLoading = false;
        this.created.emit({
          nameEn: this.formGroup.get('nameEn').value,
          nameAr: this.formGroup.get('nameAr').value,
        });
        this.notification.create(
        'success',
        'Success',
        'Category created successfully',
        { nzPlacement: 'bottomRight' }
      );
      } ,
      err => this.isLoading = false);
  }
  handleChange(e: any) {}
}
