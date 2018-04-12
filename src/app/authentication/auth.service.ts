import { Store } from '@ngrx/store';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '../store';
import { getUserEmail } from '../store/profile';
import { Observable } from 'rxjs/Observable';
import { map, catchError, take } from 'rxjs/operators';

@Injectable()
export class AuthService {
  public currentToken: string;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.currentToken = sessionStorage.getItem('accessToken');
  }

  getAuthToken() {
    return this.currentToken;
  }

  refreshToken(): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const refreshToken = sessionStorage.getItem('refreshToken');
    let email;

    this.store.select(getUserEmail)
      .pipe(
        take(1),
    ).subscribe((usermail) => { email = usermail; });

    return this.http.post(`${environment.apiURL}v1/auth/refresh-token`,
      { email, refreshToken }, { headers })
      .pipe(
        map((payload: any) => {
          sessionStorage.setItem('accessToken', payload.accessToken);
          sessionStorage.setItem('refreshToken', payload.refreshToken);
          this.currentToken = payload.accessToken;
          return this.currentToken;
        }),
        catchError((err) => Observable.throw(err))
      );

  }
}
