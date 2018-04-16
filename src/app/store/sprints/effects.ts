import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as SprintActions from './actions';
import { environment } from '../../../environments/environment';
import { SprintSummary } from './../../types/sprint';
import { AppState } from './../index';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { getRouterState } from '../app-routes';

@Injectable()
export class SprintEffects {

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<AppState>,
  ) { }

  @Effect()
  $SprintListRequest: Observable<SprintActions.SprintActions> = this.actions$
    .ofType(SprintActions.SPRINT.LIST.REQUEST)
    .pipe(
      withLatestFrom(this.store.select(getRouterState)),
      switchMap(([action, route]) => {
        const id = route.state.params.id;
        return this.http.get(`${environment.apiURL}v1/sprints/${id}/sprint-list`)
          .pipe(
            map((data: SprintSummary[]) => new SprintActions.SprintListSuccess(data)),
            catchError(err => of(new SprintActions.SprintListError(err))),
          );
      })
    );

  @Effect()
  $createSprints: Observable<SprintActions.SprintActions> = this.actions$
    .ofType(SprintActions.SPRINT.CREATE.REQUEST)
    .pipe(
      map((action: SprintActions.SprintCreatetRequest) => action.payload),
      withLatestFrom(this.store.select(getRouterState)),
      switchMap(([payload, route]) => {
        const id = route.state.params.id;
        return this.http.post(`${environment.apiURL}v1/sprints/${id}/create-sprints`, payload)
          .pipe(
            map((newSprints: SprintSummary[]) => new SprintActions.SprintCreateSuccess(newSprints)),
            catchError(err => of(new SprintActions.SprintCreateError(err))),
          );
      })
    );

  @Effect()
  $addStoriesToSprint: Observable<SprintActions.SprintActions> = this.actions$
    .ofType(SprintActions.SPRINT.ADD_STORIES.REQUEST)
    .pipe(
      map((action: SprintActions.AddStoriesToSprintRequest) => action.payload),
      withLatestFrom(this.store.select(getRouterState)),
      switchMap(([payload, route]) => {
        const id = route.state.params.id;
        return this.http.patch(
          `${environment.apiURL}v1/sprints/${id}/${payload.indicator}/update-sprint`,
          { stories: payload.stories })
          .pipe(
            map((newSprint: SprintSummary) =>
              new SprintActions.AddStoriesToSprintSuccess(newSprint)),
            catchError(err => of(new SprintActions.AddStoriesToSprintError(err))),
          );
      })
    );

  @Effect()
  $addStoriesToSprintSuccess: Observable<SprintActions.SprintActions> = this.actions$
    .ofType(SprintActions.SPRINT.ADD_STORIES.SUCCESS)
    .pipe(
      map(() => new SprintActions.SprintListRequest())
    );
}
