import { ProfileActions, LOGIN, SIGNUP, PROFILE } from './actions';
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

export function reducer(state = InitialProfileState, action: ProfileActions): ProfileState {
  switch (action.type) {
    case LOGIN.SUCCESS:
      return merge(state, action.payload);
    case PROFILE.LOAD.SUCCESS:
      return merge(state, action.payload);
    case PROFILE.UPDATE.SUCCESS:
      return merge(state, action.payload);
  }
  return state;
}

