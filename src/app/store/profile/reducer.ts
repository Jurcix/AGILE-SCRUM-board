import { ProfileActions, LOGIN, SIGNUP } from './actions';
import { merge } from 'ramda';

export interface ProfileState {
  name: string;
  lastname: string;
  email: string;
  birthYear: number;
  gender: string;
  phone: number;
  occupation: string;
  location: string;
}

export const InitialProfileState: ProfileState = {
  name: '',
  lastname: '',
  email: '',
  birthYear: null,
  gender: '',
  phone: null,
  occupation: '',
  location: '',
};

export function reducer(state = InitialProfileState, action: ProfileActions) {
  switch (action.type) {
    case LOGIN.SUCCEESS || SIGNUP.SUCCEESS:
      return merge(state, action.payload);
  }
}
