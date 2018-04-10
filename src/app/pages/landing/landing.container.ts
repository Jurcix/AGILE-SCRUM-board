import { UserLogin } from './../../types/profile';
import { LoginRequest } from './../../store/profile/actions';
import { Go } from './../../store/app-routes/actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/index';


@Component({
  selector: 'app-landing',
  template: `
    <app-landing-component
      (signUp)="signUp($event)"
      (login)="login($event)"
    ></app-landing-component>
  `,
  styleUrls: [],
})
export class LandingContainer {
  constructor(private store: Store<AppState>) { }

  signUp() {
    this.store.dispatch(new Go({ path: ['sign-up'] }));
  }

  login(loginInfo: UserLogin) {
    this.store.dispatch(new LoginRequest(loginInfo));
  }
}
