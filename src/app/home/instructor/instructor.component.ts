import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { InstructorService } from 'src/app/models/instructors.service';
import { LookupsService } from 'src/app/models/lookups.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'koun-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss'],
})
export class InstructorComponent implements OnInit {
  categories: any[];
  createModalActive: boolean;
  subscribers: any = [];
  isRTL: boolean;

  constructor(
    private lookupService: LookupsService,
    private instructorsService: InstructorService,
    public authenticationService: AuthenticationService,
    translate: TranslateService,
    private utilsService: UtilsService
  ) {
    this.instructorsService.getAllInstructors().subscribe(res => {
      this.categories = res;
    });
  }

  ngOnInit(): void {
    this.subscribers = [];

    this.subscribers.push(this.utilsService.languageSource.subscribe((lang) => {
      this.isRTL = lang === 'ar';
    }));}
}
