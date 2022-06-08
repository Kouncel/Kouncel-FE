import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { empty, Observable, throwError } from 'rxjs';
import { catchError, retryWhen, tap } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class RetryHttpInterceptorService implements HttpInterceptor {
  retryLimit = 3;
  attempt = 0;

  constructor(
    public router: Router,
    private notification: NzNotificationService,
    private authenticationService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // retryWhen operator should come before catchError operator as it is more specific
      retryWhen((errors) =>
        errors.pipe(
          tap((error) => {
            if (
              ++this.attempt >= this.retryLimit ||
              (error.status !== 401 && error.status !== 400 && error.status !== 403)
            ) {
                console.log('fail to auth   ', this.attempt)
              throw error;
            }
          })
        )
      ),
      // now catch all other errors
      catchError((error) => {
        if (
          error.status === 401 ||
          error.status === 400 ||
          error.status === 403
        ) {
        //   this.router.navigateByUrl('abort-access', { replaceUrl: true });
        } else if (error.status === 500 || error.status === 502) {
        //   this.router.navigateByUrl('server-error', { replaceUrl: true });
          // do not return the error
          return empty();
        }

        return throwError('error occured');
      })
    );
  }
}
