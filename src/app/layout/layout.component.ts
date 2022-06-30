import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../shared/utils.service';
import jwt_decode from "jwt-decode";
import { AuthenticationService } from '../authentication/authentication.service';
import mixpanel from 'mixpanel-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'koun-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(translate: TranslateService, utilsService: UtilsService,
    private authenticationService: AuthenticationService) {
      mixpanel.init(environment.mixpanelToken, {});
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    utilsService.languageSource.subscribe((lang) => {
      translate.use(lang);
    });
    try {
      const decodedJWT: any = jwt_decode(localStorage.getItem('authToken'));
      this.authenticationService.setIsAdminState(!!decodedJWT['realm_access']['roles'].find((r: any) => r === 'Kadmin'));
    } catch(e) {
      console.log(e)
    }
  }

  ngOnInit(): void {}
}
