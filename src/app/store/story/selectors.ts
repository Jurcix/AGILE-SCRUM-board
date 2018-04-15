import { StoryState } from './reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const getStoryState = createFeatureSelector<StoryState>('storyState');

export const getFilteredAssignees = createSelector(
  getStoryState,
  state => state.filteredUsers
);

export const getStories = createSelector(
  getStoryState,
  state => state.stories
);

