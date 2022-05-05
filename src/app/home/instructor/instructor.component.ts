import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { InstructorService } from 'src/app/models/instructors.service';
import { LookupsService } from 'src/app/models/lookups.service';

@Component({
  selector: 'koun-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss'],
})
export class InstructorComponent implements OnInit {
  categories: any[];
  createModalActive: boolean;
  constructor(
    private lookupService: LookupsService,
    private instructorsService: InstructorService,
    public authenticationService: AuthenticationService,
    translate: TranslateService
  ) {
    this.instructorsService.getAllInstructors().subscribe(res => console.log(res))
  }

  ngOnInit(): void {}
}
