import { Component, OnInit } from '@angular/core';
import * as csv from 'csvtojson';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProfessionsService } from 'src/app/models/professions.service';

@Component({
  selector: 'koun-professions',
  templateUrl: './professions.component.html',
  styleUrls: ['./professions.component.scss'],
})
export class ProfessionsComponent implements OnInit {
  professions: any;

  constructor(
    private professionsService: ProfessionsService,
    private notification: NzNotificationService
  ) {
    console.log(csv());
  }

  ngOnInit(): void {}

  addProfessions() {
    if (this.professions) {
      csv()
        .fromString(this.professions)
        .then((res) => {
          this.professionsService.createProfessions(res).subscribe((res) => {
            this.notification.create(
              'success',
              'Success',
              'Professions added successfully',
              { nzPlacement: 'bottomRight' }
            );
          });
        });
    }
  }
}
