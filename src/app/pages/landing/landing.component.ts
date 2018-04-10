import { UserLogin } from './../../types/profile';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing-component',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @Output() signUp: EventEmitter<void> = new EventEmitter<void>();
  @Output() login = new EventEmitter<UserLogin>();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  onLogin(loginInfo: UserLogin) {
    this.login.emit(loginInfo);
  }

  onSignUp() {
    this.signUp.emit();
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    });
  }
}
