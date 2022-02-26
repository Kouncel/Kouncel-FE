import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'koun-early-bird-success',
  templateUrl: './early-bird-success.component.html',
  styleUrls: ['./early-bird-success.component.scss'],
})
export class EarlyBirdSuccessComponent implements OnInit {
  constructor(translate: TranslateService) {}

  ngOnInit(): void {}

  reload() {
    location.reload();
  }
}
