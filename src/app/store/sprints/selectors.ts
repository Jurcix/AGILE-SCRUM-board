import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SprintsState } from './reducer';
import { SprintSummary } from './../../types/sprint';
import { AppState } from './../index';

export const getSprintState = createFeatureSelector<SprintsState>('sprintState');

export const getSprintSummaries = createSelector(
  getSprintState,
  state => state.sprintsSummaries
);



