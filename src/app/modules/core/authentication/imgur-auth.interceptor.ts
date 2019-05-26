import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ImgurAuthService} from '../../imgur/modules/auth/common/services/imgur-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImgurAuthInterceptor implements HttpInterceptor {

  constructor(private _router: Router,
              private _authService: ImgurAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this._addAuthenticationDetailsToHeaders(request);

    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this._authService.logout();
            this._router.navigate(['/login']);
          }

          return throwError(err);
        })
      );
  }

  private _addAuthenticationDetailsToHeaders(request: HttpRequest<any>): HttpRequest<any> {
    if (!this._authService.isLoggedIn()) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this._authService.getAccessToken()}`
      }
    });
  }
}
