import { UserLogin, UserProfile, UserWithToken, UserSignUP } from './../../types/profile';
import { Action } from '@ngrx/store';

export const LOGIN = {
  REQUEST: '[Login] requested',
  STORE_TOKEN: '[Login] store token',
  SUCCESS: '[Login] successful',
  ERROR: '[Login] failed'
};

export const SIGNUP = {
  REQUEST: '[Signup] requested',
  // SUCCESS: '[Signup] successful',
  ERROR: '[Signup] failed'
};

export const PROFILE = {
  LOAD: {
    REQUEST: '[Profile Load] requested',
    SUCCESS: '[Profile Load] success',
    ERROR: '[Profile Load] error'
  },
  UPDATE: {
    REQUEST: '[Profile update] requested',
    SUCCESS: '[Profile update] successful',
    ERROR: '[Profile update] failed'
  }
};

export class LoginRequest implements Action {
  type = LOGIN.REQUEST;

  constructor(public payload: UserLogin) { }
}

export class LoginStoreToken implements Action {
  type = LOGIN.STORE_TOKEN;

  constructor(public payload: UserWithToken) { }
}

export class LoginSuccess implements Action {
  type = LOGIN.SUCCESS;

  constructor(public payload: UserProfile) { }
}

export class LoginError implements Action {
  type = LOGIN.ERROR;

  constructor(public payload: Error) { }
}

export class SignupRequest implements Action {
  type = SIGNUP.REQUEST;

  constructor(public payload: UserSignUP) { }
}

export class SignupError implements Action {
  type = SIGNUP.ERROR;

  constructor(public payload: Error) { }
}

export class ProfileUpdateRequest implements Action {
  type = PROFILE.UPDATE.REQUEST;

  constructor(public payload: UserProfile) { }
}

export class ProfileUpdateSuccess implements Action {
  type = PROFILE.UPDATE.SUCCESS;

  constructor(public payload: UserProfile) { }
}

export class ProfileUpdateError implements Action {
  type = PROFILE.UPDATE.ERROR;

  constructor(public payload: Error) { }
}

export class ProfileLoadRequest implements Action {
  type = PROFILE.LOAD.REQUEST;

  constructor(public payload: any) { }
}

export class ProfileLoadSuccess implements Action {
  type = PROFILE.LOAD.SUCCESS;

  constructor(public payload: UserProfile) { }
}

export class ProfileLoadError implements Action {
  type = PROFILE.LOAD.ERROR;

  constructor(public payload: Error) { }
}

export type ProfileActions =
  LoginRequest | LoginStoreToken | LoginSuccess | LoginError |
  SignupRequest |  SignupError |
  ProfileUpdateRequest | ProfileUpdateSuccess | ProfileUpdateError |
  ProfileLoadRequest | ProfileLoadSuccess | ProfileLoadError;


