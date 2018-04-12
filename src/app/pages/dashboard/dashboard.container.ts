import { PasswordUpdateRequest } from './../../store/profile/actions';
import { ProfileState } from './../../store/profile/reducer';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../../store/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { UserProfile, UpdatePassword } from '../../types';
import { getProfileState, ProfileUpdateRequest } from '../../store/profile';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-dashboard-component
      [user]="user$ | async"
      (updateProfile)="updateProfile($event)"
      (updatePassword)="updatePassword($event)"
    >
    </app-dashboard-component>
  `
})
export class DashboardContainer implements OnInit {
  constructor(private store: Store<AppState>) { }

  user$: Observable<ProfileState>;

  ngOnInit() {
    this.user$ = this.store.select(getProfileState);
  }

  updateProfile(updatedUser: UserProfile) {
    this.store.dispatch(new ProfileUpdateRequest(updatedUser));
  }

  updatePassword(updatedPassword: UpdatePassword) {
    this.store.dispatch(new PasswordUpdateRequest(updatedPassword));
  }
}
