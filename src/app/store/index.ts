
import { compose, ActionReducer, combineReducers, ActionReducerMap } from '@ngrx/store';
import * as fromProfile from './profile/reducer';
import * as fromRouterState from './app-routes/reducer';
import * as fromProject from './project/reducer';
import * as fromStory from './story/reducer';
import * as fromSprint from './sprints/reducer';
import { RouterReducerState } from '@ngrx/router-store';

import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  router: RouterReducerState<fromRouterState.RouterStateUrl>;
  profileState: fromProfile.ProfileState;
  projectState: fromProject.ProjectState;
  storyState: fromStory.StoryState;
  sprintState: fromSprint.SprintsState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  profileState: fromProfile.reducer,
  projectState: fromProject.reducer,
  storyState: fromStory.reducer,
  sprintState: fromSprint.reducer,
};
