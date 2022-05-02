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

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(public router: Router) {}

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
          }
        return throwError(error.message);
      })
    );
  }
}