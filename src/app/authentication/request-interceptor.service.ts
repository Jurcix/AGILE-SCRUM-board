import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { catchError, map, switchMap, finalize } from 'rxjs/operators';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) { }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.method === 'POST' || req.method === 'PATCH') {
      req.headers.append('Content-Type', 'application/json');
    }

    if (req.url !== `${environment.apiURL}v1/auth/login` &&
      req.url !== `${environment.apiURL}v1/auth/refresh-token`) {
      return next.handle(this.addToken(req, this.authService.getAuthToken()))
        .pipe(
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              switch ((<HttpErrorResponse>error).status) {
                // case 400:
                //   return this.handle400Error(error);
                case 401:
                  return this.handle401Error(req, next);
              }
            } else {
              return Observable.throw(error);
            }
          })
        );
    } else {
      return next.handle(req);
    }
  }


  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null);

      return this.authService.refreshToken()
        .pipe(
          switchMap((newToken: string) => {
            if (newToken) {
              this.tokenSubject.next(newToken);
              return next.handle(this.addToken(req, newToken));
            }
            console.log('no token :(');
            return;
          }),
          catchError((error) => {
            return Observable.throw(error);
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      return this.tokenSubject
        .filter(token => token != null)
        .take(1)
        .switchMap(token => {
          return next.handle(this.addToken(req, token));
        });
    }
  }
}
