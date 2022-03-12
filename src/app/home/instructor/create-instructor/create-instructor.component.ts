import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'koun-create-instructor',
  templateUrl: './create-instructor.component.html',
  styleUrls: ['./create-instructor.component.scss'],
})
export class CreateInstructorComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(translate: TranslateService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      // description: new FormControl('', [Validators.required]),
    });
  }
  create() {
    console.log('create category');
  }
  handleChange(e: any) {}
}