import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retryWhen, tap, delay, finalize } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  retryLimit = 3;
  attempt = 0;

  constructor(
    public router: Router,
    private notification: NzNotificationService,
    private authenticationService: AuthenticationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers;
    if (req.url.indexOf('accounts/login') === -1
      && req.url.indexOf('accounts/forgot-password') === -1
      && req.url.indexOf('accounts/register') === -1
      && req.url.indexOf('professions') === -1) {
      headers = req.headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('authToken')}`
      );
    }
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      return next.handle(req.clone({ headers: headers })).pipe(
        catchError((error) => {
          console.log('error occured', error);
          if (error.status === 401) {
            this.authenticationService
              .refreshToken(localStorage.getItem('refreshToken'))
              .subscribe(
                (authToken) => {
                  localStorage.setItem('authToken', authToken.access_token);
                  localStorage.setItem(
                    'refreshToken',
                    authToken.refresh_token
                  );
                  // location.reload();
                },
                (err) => {
                  this.router.navigate(['/login'], {
                    queryParams: {
                      returnUrl: encodeURIComponent(this.router.url),
                    },
                  });
                }
              );
          } else {
            console.log(error);
            if (error && error.error && error.error.errors) {
              error.error.errors.forEach((element: any) => {
                this.notification.create(
                  'error',
                  element.error,
                  element.error_description,
                  { nzPlacement: 'bottomRight' }
                );
              });
            } else {
              this.notification.create(
                'error',
                'An Error Occured',
                error?.message,
                { nzPlacement: 'bottomRight' }
              );
            }
          }
          return throwError(error.message);
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
