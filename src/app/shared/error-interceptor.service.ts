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
import { errors } from '../models/errors.const';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  isRefreshingToken: boolean = false;

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
      && req.url.indexOf('accounts/register') === -1) {
      if (localStorage.getItem('authToken')) {
        headers = req.headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('authToken')}`
      );
      }
    }
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      return next.handle(req.clone({ headers: headers })).pipe(
        catchError((error) => {
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
                },
                (err) => {
                  if (location.href.indexOf('returnUrl') === -1) {
                    this.router.navigate(['/login'], {
                      queryParams: {
                        returnUrl: encodeURIComponent(this.router.url),
                      },
                    });
                  }
                }
              );
          } else {
            if (error && error.error && error.error.errors) {
              error.error.errors.forEach((element: any) => {
                if (errors[element.error] !== undefined) {
                  const lang  = localStorage.getItem('lang') || 'en';
                  this.notification.create(
                    'error',
                    lang === 'en' ? 'Error' : '?????? ??????',
                    errors[element.error][lang],
                    { nzPlacement: 'bottomRight' }
                  );
                } else {
                  this.notification.create(
                    'error',
                    element.error,
                    element.error_description,
                    { nzPlacement: 'bottomRight' }
                  );
                }
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
          return throwError(error);
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
