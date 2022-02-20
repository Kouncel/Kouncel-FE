import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'koun-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authenticationService: AuthenticationService,
    public utilsService: UtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logOut() {
    localStorage.removeItem('authToken');
    this.authenticationService.setLoggedInState(false);
    this.router.navigate(['/login']);
  }

  setLang(lang: string) {
    this.utilsService.setLanguage(lang);
  }
}
