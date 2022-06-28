import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UtilsService } from 'src/app/shared/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { LookupsService } from 'src/app/models/lookups.service';
import { CategoryService } from 'src/app/models/categories.service';

@Component({
  selector: 'koun-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categories: any[];

  constructor(
    public authenticationService: AuthenticationService,
    public utilsService: UtilsService,
    public lookupsService: LookupsService,
    public categoriesService: CategoryService,
    private router: Router,
    translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.utilsService.languageSource.subscribe((lang) => {
      this.addRemoveRtlStyles(lang);
    });
  }

  logOut() {
    localStorage.removeItem('authToken');
    this.authenticationService.setLoggedInState(false);
    this.router.navigate(['/login']);
  }

  setLang(lang: string) {
    this.utilsService.setLanguage(lang);
  }

  addRemoveRtlStyles(lang: string) {
    switch (lang) {
      case 'en':
        document.querySelectorAll('.rtl-style').forEach((n) => n.remove());
        break;
      case 'ar':
        if (document.querySelectorAll('.rtl-style').length === 0)
          document
            .querySelector('body')
            .insertAdjacentHTML(
              'beforeend',
              `<link class="rtl-style" href="assets/styles/styles-ar.css" rel="stylesheet" />`
            );
        break;
    }
  }
}
