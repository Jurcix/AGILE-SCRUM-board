import { ActivatedRoute } from '@angular/router';
import { FilteredUsers, ProjectSummary, ProjectDetails } from './../../types/project';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../index';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as ProjectActions from './actions';
import { map, switchMap, catchError, take, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs/observable/of';
import { ProfileActions } from '../profile';
import { getRouterState } from '../app-routes';

@Injectable()
export class ProjectEffects {

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) { }

  @Effect()
  $createProject: Observable<ProjectActions.ProjectActions> = this.actions$
    .ofType(ProjectActions.PROJECT.CREATE.REQUEST)
    .pipe(
      map((action: ProjectActions.ProjectCreateRequest) => action.payload),
      switchMap((payload) => {
        return this.http.post(`${environment.apiURL}v1/projects/create-project`, payload)
          .pipe(
            map(() => new ProjectActions.ProjectCreateSuccess()),
            catchError(err => of(new ProjectActions.ProjectCreateError(err))),
          );
      })
    );

  @Effect()
  $createProjectSucces: Observable<ProjectActions.ProjectActions> = this.actions$
    .ofType(ProjectActions.PROJECT.CREATE.SUCCESS)
    .pipe(
      map(() => new ProjectActions.ProjectSummaryRequest())
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

  @Effect()
  $ProjectDetailsRequest: Observable<ProjectActions.ProjectActions> = this.actions$
    .ofType(ProjectActions.PROJECT.DETAILS.REQUEST)
    .pipe(
      withLatestFrom(this.store.select(getRouterState)),
      switchMap(([action, router]) => {
        const id = router.state.params.id;
        return this.http.get(`${environment.apiURL}v1/projects/${id}/project-details`)
          .pipe(
            map((data: ProjectDetails) => new ProjectActions.ProjectDetailsSuccess(data)),
            catchError(err => of(new ProjectActions.ProjectSummaryError(err))),
          );
      })
    );

  @Effect()
  $RemoveUserRequest: Observable<ProjectActions.ProjectActions> = this.actions$
    .ofType(ProjectActions.REMOVE_USER.REQUEST)
    .pipe(
      map((action: ProjectActions.RemoveUserRequest) => action.payload),
      withLatestFrom(this.store.select(getRouterState)),
      switchMap(([payload, router]) => {
        const id = router.state.params.id;
        return this.http.patch(`${environment.apiURL}v1/projects/${id}/remove-user`, payload)
          .pipe(
            map((data: ProjectDetails) => new ProjectActions.RemoveUserSuccess(data)),
            catchError(err => of(new ProjectActions.RemoveUserError(err))),
          );
      })
    );

  @Effect()
  $RemoveUserSucces: Observable<ProjectActions.ProjectActions> = this.actions$
    .ofType(ProjectActions.REMOVE_USER.SUCCESS)
    .pipe(
      map(() => new ProjectActions.ProjectDetailsRequest())
    );

  @Effect()
  $AddUsers: Observable<ProjectActions.ProjectActions> = this.actions$
    .ofType(ProjectActions.ADD_USERS.REQUEST)
    .pipe(
      map((action: ProjectActions.AddUsersRequest) => action.payload),
      withLatestFrom(this.store.select(getRouterState)),
      switchMap(([payload, router]) => {
        const id = router.state.params.id;
        return this.http.patch(`${environment.apiURL}v1/projects/${id}/update-project`, payload)
          .pipe(
            map((data: ProjectDetails) => new ProjectActions.AddUsersSuccess(data)),
            catchError(err => of(new ProjectActions.AddUsersError(err))),
          );
      })
    );
}
