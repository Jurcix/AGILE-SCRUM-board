import { AppState } from './../index';
import { UserProfile } from './../../types/profile';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError, tap, mergeMap } from 'rxjs/operators';
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
        return this.http.post(`${environment.apiURL}v1/auth/login`, payload)
          .pipe(
            map((data: any) => new ProfileActions.LoginStoreToken(data)),
            catchError(err => of(new ProfileActions.LoginError(err))),
        );
      })
    );

  @Effect()
  $loginSuccess: Observable<ProfileActions.ProfileActions> = this.actions$
    .ofType(ProfileActions.LOGIN.STORE_TOKEN)
    .pipe(
      map((action: ProfileActions.LoginStoreToken) => action.payload),
      tap((payload) => {
        sessionStorage.setItem('accessToken', payload.token.accessToken);
        sessionStorage.setItem('refreshToken', payload.token.refreshToken);
      }),
      mergeMap((payload) => [
        new Go({ path: ['dashboard'] }),
        new ProfileActions.LoginSuccess(payload.user)
      ])
    );

  @Effect()
  $signup: Observable<ProfileActions.ProfileActions> = this.actions$
    .ofType(ProfileActions.SIGNUP.REQUEST)
    .pipe(
      map((action: ProfileActions.SignupRequest) => action.payload),
      switchMap((payload) => {
        return this.http.post(`${environment.apiURL}v1/auth/register`, payload)
          .pipe(
            map((data: UserProfile) => {
              return new ProfileActions.SignupSuccess(data);
            }),
            catchError(err => of(new ProfileActions.SignupError(err))),
        );
      })
    );

  @Effect()
  $updateProfileRequest: Observable<ProfileActions.ProfileActions> = this.actions$
    .ofType(ProfileActions.PROFILE_UPDATE.REQUEST)
    .pipe(
      map((action: ProfileActions.ProfileUpdateRequest) => action.payload),
      switchMap((payload) => {
        return this.http.patch(`${environment.apiURL}v1/users/update-user`, payload)
          .pipe(
            map((data: any) => new ProfileActions.ProfileUpdateSuccess(data)),
            catchError(err => of(new ProfileActions.ProfileUpdateError(err))),
        );
      })
    );
}

