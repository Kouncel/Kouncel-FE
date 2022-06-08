import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retryWhen, tap, delay } from "rxjs/operators";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  retryLimit = 3;
  attempt = 0;

  constructor(public router: Router,
    private notification: NzNotificationService,
    private authenticationService: AuthenticationService,) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // retryWhen((errors) =>
      //   errors.pipe(delay(this.attempt * 2000),
      //     tap((error) => {
      //       console.log('tap');
      //       if (
      //         ++this.attempt >= this.retryLimit ||
      //         (error.status !== 401 && error.status !== 400 && error.status !== 403)
      //       ) {
      //           console.log('fail to auth   ', this.attempt)
      //         throw error;
      //       }
      //     })
      //   )
      // ),delay(this.attempt * 2000),
      catchError(error => {
        console.log('error occured', error);
          if (error.status === 401) {
            this.authenticationService.refreshToken(localStorage.getItem('refreshToken')).subscribe(
              authToken => {
                localStorage.setItem('authToken', authToken.access_token);
                localStorage.setItem('refreshToken', authToken.refresh_token);
              },
              err => {
                this.router.navigate(['/login'], {
                  queryParams: { returnUrl: encodeURIComponent(this.router.url) },
                });
              }
            );
          } else {
            this.notification.create(
              'error',
              'An Error Occured',
              error?.message,
              { nzPlacement: 'bottomRight' }
            );
          }
        return throwError(error.message);
      })
    );
  }
}