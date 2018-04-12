import { ProfileState } from './reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './../index';


export const getProfileState = createFeatureSelector<ProfileState>('profileState');

export const getUserEmail = createSelector(
  getProfileState,
  state => state.email
);

