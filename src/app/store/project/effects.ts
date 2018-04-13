import { FilteredUsers, ProjectSummary } from './../../types/project';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../index';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as ProjectActions from './actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ProjectEffects {

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<AppState>,
  ) { }

  @Effect()
  $createProject: Observable<ProjectActions.ProjectActions> = this.actions$
    .ofType(ProjectActions.PROJECT.CREATE.REQUEST)
    .pipe(
      map((action: ProjectActions.ProjectCreateRequest) => action.payload),
      switchMap((payload) => {
        console.log(payload)
        return this.http.post(`${environment.apiURL}v1/projects/create-project`, payload)
          .pipe(
            map(() => new ProjectActions.ProjectCreateSuccess()),
            catchError(err => of(new ProjectActions.ProjectCreateError(err))),
          );
      })
    );

  @Effect()
  $SearchUsers: Observable<ProjectActions.ProjectActions> = this.actions$
    .ofType(ProjectActions.SEARCH_USERS.REQUEST)
    .pipe(
      map((action: ProjectActions.SearchUsersRequest) => action.payload),
      switchMap((payload) => {
        return this.http.post(`${environment.apiURL}v1/users/find-users`, payload)
          .pipe(
            map((data: FilteredUsers[]) => new ProjectActions.SearchUsersSuccess(data)),
            catchError(err => of(new ProjectActions.SearchUsersError(err))),
          );
      })
    );

  @Effect()
  $ProjectsSummaryRequest: Observable<ProjectActions.ProjectActions> = this.actions$
    .ofType(ProjectActions.PROJECT.SUMMARY.REQUEST)
    .pipe(
      switchMap(() => {
        return this.http.get(`${environment.apiURL}v1/projects/project-list`)
          .pipe(
            map((data: ProjectSummary[]) => new ProjectActions.ProjectSummarySuccess(data)),
            catchError(err => of(new ProjectActions.ProjectSummaryError(err))),
          );
      })
    );
}
