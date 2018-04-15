import { getRouterState } from './../app-routes/reducer';
import { environment } from './../../../environments/environment';
import { AppState } from './../index';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as StoryActions from './actions';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { FilteredUsers } from '../../types';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { Story } from '../../types/story';

@Injectable()
export class StoryEffects {

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<AppState>,
  ) { }

  @Effect()
  $SearchAssignees: Observable<StoryActions.StoryActions> = this.actions$
    .ofType(StoryActions.SEARCH_ASSIGNEES.REQUEST)
    .pipe(
      map((action: StoryActions.SearchAssigneesRequest) => action.payload),
      withLatestFrom(this.store.select(getRouterState)),
      switchMap(([payload, router]) => {
        const id = router.state.params.id;
        return this.http.post(`${environment.apiURL}v1/users/find-users`, payload)
          .pipe(
            map((data: FilteredUsers[]) => new StoryActions.SearchAssigneesSuccess(data)),
            catchError(err => of(new StoryActions.SearchAssigneesError(err))),
          );
      })
    );

  @Effect()
  $CreateStory: Observable<StoryActions.StoryActions> = this.actions$
    .ofType(StoryActions.STORY.CREATE.REQUEST)
    .pipe(
      map((action: StoryActions.CreateStoryRequest) => action.payload),
      withLatestFrom(this.store.select(getRouterState)),
      switchMap(([payload, router]) => {
        const id = router.state.params.id;
        return this.http.post(`${environment.apiURL}v1/stories/${id}/create-story`, payload)
          .pipe(
            map((data: Story) => new StoryActions.CreateStorySuccess(data)),
            catchError(err => of(new StoryActions.CreateStoryError(err))),
          );
      })
    );

  @Effect()
  $LoadStories: Observable<StoryActions.StoryActions> = this.actions$
    .ofType(StoryActions.STORY.LOAD.REQUEST)
    .pipe(
      withLatestFrom(this.store.select(getRouterState)),
      switchMap(([payload, router]) => {
        const id = router.state.params.id;
        return this.http.get(`${environment.apiURL}v1/stories/${id}/story-list`)
          .pipe(
            map((data: Story[]) => new StoryActions.LoadStorySuccess(data)),
            catchError(err => of(new StoryActions.LoadStoryError(err))),
          );
      })
    );

  @Effect()
  $DeleteStories: Observable<StoryActions.StoryActions> = this.actions$
    .ofType(StoryActions.STORY.DELETE.REQUEST)
    .pipe(
      withLatestFrom(this.store.select(getRouterState)),
      switchMap(([payload, router]) => {
        const id = router.state.params.id;
        return this.http.delete(`${environment.apiURL}v1/stories/${id}/delete-stories`)
          .pipe(
            map(() => new StoryActions.DeleteStorySuccess()),
            catchError(err => of(new StoryActions.DeleteStoryError(err))),
          );
      })
    );

  @Effect()
  $DeleteStoriesSuccess: Observable<StoryActions.StoryActions> = this.actions$
    .ofType(StoryActions.STORY.DELETE.SUCCESS)
    .pipe(
      map(() => new StoryActions.LoadStoryRequest())
    );

}

