import { getProjectsSummary } from './../../store/project/selectors';
import { FilteredUsers, ProjectSummary } from './../../types/project';
import { SearchUsersRequest, ProjectSummaryRequest } from './../../store/project/actions';
import { Project } from './../../types';
import { PasswordUpdateRequest, ProfileLoadRequest } from './../../store/profile/actions';
import { ProfileState } from './../../store/profile/reducer';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../../store/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { UserProfile, UpdatePassword } from '../../types';
import { getProfileState, ProfileUpdateRequest } from '../../store/profile';
import { ProjectCreateRequest } from '../../store/project';
import { getFilteredUsers } from '../../store/project/selectors';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-dashboard-component
      [user]="user$ | async"
      [filteredUsers]="filteredUsers$"
      [projects]="projects$ | async"
      (updateProfile)="updateProfile($event)"
      (updatePassword)="updatePassword($event)"
      (createProject)="createProject($event)"
      (searchUsers)="searchUsers($event)"
    >
    </app-dashboard-component>
  `
})
export class DashboardContainer implements OnInit {
  constructor(private store: Store<AppState>) { }

  user$: Observable<ProfileState>;
  filteredUsers$: Observable<FilteredUsers[]>;
  projects$: Observable<ProjectSummary[]>;

  ngOnInit() {
    this.store.dispatch(new ProfileLoadRequest());
    this.store.dispatch(new ProjectSummaryRequest());
    this.user$ = this.store.select(getProfileState);
    this.filteredUsers$ = this.store.select(getFilteredUsers);
    this.projects$ = this.store.select(getProjectsSummary);
  }

  updateProfile(updatedUser: UserProfile) {
    this.store.dispatch(new ProfileUpdateRequest(updatedUser));
  }

  updatePassword(updatedPassword: UpdatePassword) {
    this.store.dispatch(new PasswordUpdateRequest(updatedPassword));
  }

  createProject(project: Project) {
    this.store.dispatch(new ProjectCreateRequest(project));
  }

  searchUsers(searchString: Object) {
    this.store.dispatch(new SearchUsersRequest(searchString));
  }
}
