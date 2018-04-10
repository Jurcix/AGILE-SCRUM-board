
import { compose, ActionReducer, combineReducers, ActionReducerMap } from '@ngrx/store';
import * as fromProfile from './profile/reducer';
import * as fromRouter from './app-routes/reducer';
import { RouterReducerState } from '@ngrx/router-store';

export interface AppState {
  router: RouterReducerState<fromRouter.RouterStateUrl>;
  profileState: fromProfile.ProfileState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.reducer.routerReducer,
  profileState: fromProfile.reducer
};
