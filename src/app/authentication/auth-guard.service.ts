import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  GuardsCheckEnd,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    routeSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (localStorage.getItem('authToken')) {
      return true;
    }
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: encodeURIComponent(state.url) },
    });
    return false;
  }
}
