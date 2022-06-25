import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HeaderService } from 'src/app/models/header.service';

@Component({
  selector: 'koun-edit-header',
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.scss']
})
export class EditHeaderComponent implements OnInit {
  header: any = {};

  constructor(
    private headerService: HeaderService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.headerService.getHeader().subscribe(
      header => {
        this.header = header;
      }
    )
  }

  getFile(e: any, key: any) {
    this.header.image = {file: e.target.files[0], name: e.target.files[0].name};
  }

  save() {
    this.headerService
      .editHeader(this.header)
      .subscribe((res: any) => {
          this.notification.create(
            'success',
            'Success',
            'Header saved successfully',
            { nzPlacement: 'bottomRight' }
          );
        });
  }

}
