import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(public router: Router,
    private notification: NzNotificationService,) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
          if (error.status === 401) {
              this.router.navigate(['/login'], {
                queryParams: { returnUrl: encodeURIComponent(this.router.url) },
              });
          } else {
            this.notification.create(
              'error',
              'An Error Occured',
              'An Error Occured',
              { nzPlacement: 'bottomRight' }
            );
          }
        return throwError(error.message);
      })
    );
  }
}