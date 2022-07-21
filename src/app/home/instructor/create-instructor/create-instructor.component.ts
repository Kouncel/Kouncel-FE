import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { InstructorService } from 'src/app/models/instructors.service';

@Component({
  selector: 'koun-create-instructor',
  templateUrl: './create-instructor.component.html',
  styleUrls: ['./create-instructor.component.scss'],
})
export class CreateInstructorComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  myImage: any;
  isLoading: boolean;

  constructor(
    translate: TranslateService,
    private instrcutorService: InstructorService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      nameEn: new FormControl('', [Validators.required]),
      nameAr: new FormControl('', [Validators.required]),
      overviewEn: new FormControl('', [Validators.required]),
      overviewAr: new FormControl('', [Validators.required]),
      bioEn: new FormControl('', [Validators.required]),
      bioAr: new FormControl('', [Validators.required]),
      myImage: new FormControl(),
      // description: new FormControl('', [Validators.required]),
    });
  }
  create(e: any) {
    this.myImage = e.target.files[0];
  }
  createInstructor() {
    this.isLoading = true;
    this.instrcutorService
      .createInstructor({
        nameEn: this.formGroup.get('nameEn').value,
        nameAr: this.formGroup.get('nameAr').value,
        overviewEn: this.formGroup.get('overviewEn').value,
        overviewAr: this.formGroup.get('overviewAr').value,
        bioEn: this.formGroup.get('bioEn').value,
        bioAr: this.formGroup.get('bioAr').value,
        image: this.myImage,
      })
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.notification.create(
            'success',
            'Success',
            'Instructor created successfully',
            { nzPlacement: 'bottomRight' }
          );
          this.router.navigateByUrl('/instructors');
        },
        (err) => (this.isLoading = false)
      );
  }
}
