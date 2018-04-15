import { AddUsersRequest } from './../../store/project/actions';
import { UsersIds } from './../../types/project';
import { getRouterState } from './../../store/app-routes/reducer';
import { Observable } from 'rxjs/';
import { Component, OnInit } from '@angular/core';
import { ProjectDetails, FilteredUsers } from '../../types';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators/take';
import { ProjectDetailsRequest, RemoveUserRequest, SearchUsersRequest } from '../../store/project';
import { getProjectDetails, getFilteredUsers } from '../../store/project/selectors';
import { Go } from '../../store/app-routes';

@Component({
  selector: 'app-project-summary',
  template: `
    <app-project-summary-component
      [project]="project$ | async"
      [filteredUsers]="filteredUsers$"

      (removeUser)="removeUser($event)"
      (searchUsers)="searchUsers($event)"
      (addUsersToProject)="addUsersToProject($event)"
      (navigateToSprints)="navigateToSprints($event)"
    >
    </app-project-summary-component>
  `,
})
export class ProjectSummaryContainer implements OnInit {
  project$: Observable<ProjectDetails>;
  projectId: string;
  filteredUsers$: Observable<FilteredUsers[]>;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new ProjectDetailsRequest());
    this.project$ = this.store.select(getProjectDetails);
    this.filteredUsers$ = this.store.select(getFilteredUsers);
  }

  removeUser(id: string) {
    this.store.dispatch(new RemoveUserRequest({ user: id }));
  }

  searchUsers(searchString: Object) {
    this.store.dispatch(new SearchUsersRequest(searchString));
  }

  addUsersToProject(users: UsersIds) {
    this.store.dispatch(new AddUsersRequest(users));
  }

  navigateToSprints(id: string) {
    this.store.dispatch(new Go({ path: [`project/${id}/sprints`] }));
  }

}
