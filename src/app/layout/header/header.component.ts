import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'koun-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logOut() {
    localStorage.removeItem('authToken');
    this.authenticationService.setLoggedInState(false);
    this.router.navigate(['/login']);
  }
}
