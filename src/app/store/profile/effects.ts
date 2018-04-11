import { AppState } from './../index';
import { UserProfile } from './../../types/profile';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { environment } from '../../../environments/environment';
import * as ProfileActions from './actions';
import { Go } from '../app-routes';


@Injectable()
export class ProfileEffects {

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<AppState>,
  ) { }

  @Effect()
  $login: Observable<ProfileActions.ProfileActions> = this.actions$
    .ofType(ProfileActions.LOGIN.REQUEST)
    .pipe(
      map((action: ProfileActions.LoginRequest) => action.payload),
      switchMap((payload) => {
        console.log(payload);
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
        return this.http.post(`${environment.apiURL}v1/auth/login`, payload, { headers })
          .pipe(
            map((data) => {
              return new ProfileActions.LoginSuccess(data);
            }),
            catchError(err => of(new ProfileActions.LoginError(err))),
        );
      })
    );

  @Effect()
  $loginSuccess: Observable<ProfileActions.ProfileActions> = this.actions$
    .ofType(ProfileActions.LOGIN.SUCCESS)
    .pipe(
      map((action: ProfileActions.LoginSuccess) => action.payload),
      map((payload) => {
        sessionStorage.setItem('accessToken', payload.token.accessToken);
        sessionStorage.setItem('refreshToken', payload.token.refreshToken);

        return new Go({ path: ['dashboard'] });
      })
    );

  @Effect()
  $signup: Observable<ProfileActions.ProfileActions> = this.actions$
    .ofType(ProfileActions.SIGNUP.REQUEST)
    .pipe(
      map((action: ProfileActions.SignupRequest) => action.payload),
      switchMap((payload) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
        return this.http.post(`${environment.apiURL}v1/auth/register`, payload, { headers })
          .pipe(
            map((data: UserProfile) => {
              return new ProfileActions.SignupSuccess(data);
            }),
            catchError(err => of(new ProfileActions.SignupError(err))),
        );
      })
    );
}

