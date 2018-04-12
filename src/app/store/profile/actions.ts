import { UserLogin, UserProfile } from './../../types/profile';
import { Action } from '@ngrx/store';

export const LOGIN = {
  REQUEST: '[Login] requested',
  STORE_TOKEN: '[Login] store token',
  SUCCESS: '[Login] successful',
  ERROR: '[Login] failed'
};

export const SIGNUP = {
  REQUEST: '[Signup] requested',
  SUCCESS: '[Signup] successful',
  ERROR: '[Signup] failed'
};

export const PROFILE_UPDATE = {
  REQUEST: '[Profile update] requested',
  SUCCESS: '[Profile update] successful',
  ERROR: '[Profile update] failed'
};

export class LoginRequest implements Action {
  type = LOGIN.REQUEST;

  constructor(public payload: UserLogin) { }
}

export class LoginStoreToken implements Action {
  type = LOGIN.STORE_TOKEN;

  constructor(public payload) { }
}

export class LoginSuccess implements Action {
  type = LOGIN.SUCCESS;

  constructor(public payload: any) { }
}

export class LoginError implements Action {
  type = LOGIN.ERROR;

  constructor(public payload: Error) { }
}

export class SignupRequest implements Action {
  type = SIGNUP.REQUEST;

  constructor(public payload: UserProfile) { }
}

export class SignupSuccess implements Action {
  type = SIGNUP.SUCCESS;

  constructor(public payload: UserProfile) { }
}

export class SignupError implements Action {
  type = SIGNUP.ERROR;

  constructor(public payload: Error) { }
}

export class ProfileUpdateRequest implements Action {
  type = PROFILE_UPDATE.REQUEST;

  constructor(public payload: any) { }
}

export class ProfileUpdateSuccess implements Action {
  type = PROFILE_UPDATE.SUCCESS;

  constructor(public payload: any) { }
}

export class ProfileUpdateError implements Action {
  type = PROFILE_UPDATE.ERROR;

  constructor(public payload: any) { }
}

export type ProfileActions =
  LoginRequest | LoginStoreToken | LoginSuccess | LoginError |
  SignupRequest | SignupSuccess | SignupError |
  ProfileUpdateRequest | ProfileUpdateSuccess | ProfileUpdateError;


