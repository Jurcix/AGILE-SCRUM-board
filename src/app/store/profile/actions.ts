import { UserLogin, UserProfile } from './../../types/profile';
import { Action } from '@ngrx/store';

export const LOGIN = {
  REQUEST: '[Login] requested',
  SUCCEESS: '[Login] successful',
  ERROR: '[Login] failed'
};

export const SIGNUP = {
  REQUEST: '[Signup] requested',
  SUCCEESS: '[Signup] successful',
  ERROR: '[Signup] failed'
};

export class LoginRequest implements Action {
  type = LOGIN.REQUEST;

  constructor(public payload: UserLogin) { }
}

export class LoginSuccess implements Action {
  type = LOGIN.SUCCEESS;

  constructor(public payload: UserProfile) { }
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
  type = SIGNUP.SUCCEESS;

  constructor(public payload: UserProfile) { }
}

export class SignupError implements Action {
  type = SIGNUP.ERROR;

  constructor(public payload: Error) { }
}

export type ProfileActions =
  LoginRequest | LoginSuccess | LoginError |
  SignupRequest | SignupSuccess | SignupError;


