import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { InstructorService } from 'src/app/models/instructors.service';

@Component({
  selector: 'koun-create-instructor',
  templateUrl: './create-instructor.component.html',
  styleUrls: ['./create-instructor.component.scss'],
})
export class CreateInstructorComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(translate: TranslateService,
    private instrcutorService: InstructorService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      myImage: new FormControl()
      // description: new FormControl('', [Validators.required]),
    });
  }
  create(e: any) {
    console.log(e);
    console.log(this.formGroup.value);
    console.log('create category');
    this.instrcutorService.createInstructor({nameEn: 'En' + Math.ceil(Math.random() * 1000), nameAr:'Ar' + Math.ceil(Math.random() * 1000), image: e.target.files[0]}).subscribe(res => console.log(res));
  }
  handleChange(e: any) {
    console.log(e);
  }
}
