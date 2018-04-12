import { RouterActionsUnion, Go } from './../app-routes/actions';
import { AppState } from './../index';
import { UserProfile, UserWithToken, UserSignUP, UpdatePassword } from './../../types/profile';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { environment } from '../../../environments/environment';
import * as ProfileActions from './actions';


@Injectable()
export class ProfileEffects {

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<AppState>,
  ) { }

  @Effect()
  $loginRequest: Observable<ProfileActions.ProfileActions> = this.actions$
    .ofType(ProfileActions.LOGIN.REQUEST)
    .pipe(
      map((action: ProfileActions.LoginRequest) => action.payload),
      switchMap((payload) => {
        return this.http.post(`${environment.apiURL}v1/auth/login`, payload)
          .pipe(
            map((data: UserWithToken) => new ProfileActions.LoginStoreToken(data)),
            catchError(err => of(new ProfileActions.LoginError(err))),
        );
      })
    );

  @Effect()
  $loginStoreToken: Observable<ProfileActions.ProfileActions | Go> = this.actions$
    .ofType(ProfileActions.LOGIN.STORE_TOKEN)
    .pipe(
      map((action: ProfileActions.LoginStoreToken) => action.payload),
      tap((payload: UserWithToken) => {
        sessionStorage.setItem('accessToken', payload.token.accessToken);
        sessionStorage.setItem('refreshToken', payload.token.refreshToken);
      }),
      mergeMap((payload: UserWithToken) => [
        new Go({ path: ['dashboard'] }),
        new ProfileActions.LoginSuccess(payload.user)
      ])
    );

  @Effect()
  $signupRequest: Observable<ProfileActions.ProfileActions> = this.actions$
    .ofType(ProfileActions.SIGNUP.REQUEST)
    .pipe(
      map((action: ProfileActions.SignupRequest) => action.payload),
      switchMap((payload: UserSignUP) => {
        return this.http.post(`${environment.apiURL}v1/auth/register`, payload)
          .pipe(
            map((data: UserWithToken) => {
              return new ProfileActions.LoginStoreToken(data);
            }),
            catchError(err => of(new ProfileActions.SignupError(err))),
        );
      })
    );

  @Effect()
  $loadProfileRequest: Observable<ProfileActions.ProfileActions> = this.actions$
    .ofType(ProfileActions.PROFILE.LOAD.REQUEST)
    .pipe(
      switchMap(() => {
        return this.http.get(`${environment.apiURL}v1/users/profile`)
          .pipe(
            map((data: UserProfile) => {
              return new ProfileActions.ProfileLoadSuccess(data);
            }),
            catchError(err => of(new ProfileActions.ProfileLoadError(err))),
          );
      })
    );

  @Effect()
  $updateProfileRequest: Observable<ProfileActions.ProfileActions> = this.actions$
    .ofType(ProfileActions.PROFILE.UPDATE.REQUEST)
    .pipe(
      map((action: ProfileActions.ProfileUpdateRequest) => action.payload),
      switchMap((payload: UserProfile) => {
        return this.http.patch(`${environment.apiURL}v1/users/update-user`, payload)
          .pipe(
            map((data: UserProfile) => new ProfileActions.ProfileUpdateSuccess(data)),
            catchError(err => of(new ProfileActions.ProfileUpdateError(err))),
        );
      })
    );

  @Effect()
  $updatePasswordRequest: Observable<ProfileActions.ProfileActions> = this.actions$
    .ofType(ProfileActions.PROFILE.UPDATE_PASSWORD.REQUEST)
    .pipe(
      map((action: ProfileActions.PasswordUpdateRequest) => action.payload),
      switchMap((payload: UpdatePassword) => {
        return this.http.patch(`${environment.apiURL}v1/users/update-password`, payload)
          .pipe(
            map(() => new ProfileActions.PasswordUpdateSuccess()),
            catchError(err => of(new ProfileActions.ProfileUpdateError(err))),
        );
      })
    );
}

