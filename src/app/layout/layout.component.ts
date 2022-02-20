import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../shared/utils.service';

@Component({
  selector: 'koun-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(translate: TranslateService, utilsService: UtilsService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    utilsService.languageSource.subscribe((lang) => {
      translate.use(lang);
    });
  }

  ngOnInit(): void {}
}
