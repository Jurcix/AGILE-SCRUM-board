import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './reducer';

export const getProjectState = createFeatureSelector<ProjectState>('projectState');

export const getFilteredUsers = createSelector(
  getProjectState,
  state => state.filteredUsers
);

export const getProjectsSummary = createSelector(
  getProjectState,
  state => state.projectsSummary
);

export const getProjectDetails = createSelector(
  getProjectState,
  state => state.projectDetails
);

