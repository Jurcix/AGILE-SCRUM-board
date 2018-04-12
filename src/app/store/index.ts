
import { compose, ActionReducer, combineReducers, ActionReducerMap } from '@ngrx/store';
import * as fromProfile from './profile/reducer';
import * as fromRouterState from './app-routes/reducer';
import { RouterReducerState } from '@ngrx/router-store';

import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  router: RouterReducerState<fromRouterState.RouterStateUrl>;
  profileState: fromProfile.ProfileState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  profileState: fromProfile.reducer
};
