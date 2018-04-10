import { UserLogin } from './../../types/profile';
import { LoginRequest, SignupRequest } from './../../store/profile/actions';
import { Go } from './../../store/app-routes/actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/index';


@Component({
  selector: 'app-sign-up',
  template: `
    <app-sign-up-component
      (login)="login()"
      (signUp)="signUp($event)"
    >
    </app-sign-up-component>
  `,
  styleUrls: [],
})
export class SignUpContainer {
  constructor(private store: Store<AppState>) { }

  login() {
    this.store.dispatch(new Go({ path: ['home'] }));
  }

  signUp(registrationInfo) {
    this.store.dispatch(new SignupRequest(registrationInfo));
  }
}
