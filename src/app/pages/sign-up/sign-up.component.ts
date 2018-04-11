import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { range } from 'ramda';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Output() login = new EventEmitter<void>();
  @Output() signUp = new EventEmitter();

  signUpForm: FormGroup;
  birthYear: number[];
  countries: string[];
  occupations: string[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const currentYear = (new Date).getFullYear();
    this.birthYear = range(1900, currentYear);

    this.countries = [
      'Lietuva', 'Anglija', 'Amerika', 'Niekur',
    ];

    this.occupations = [
      'Dirbantis', 'Studentas', 'Bedarbis'
    ];

    this.buildForm();
  }

  private buildForm() {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthYear: ['', Validators.required],
      gender: ['', Validators.required],
      location: '',
      phone: ['', Validators.required],
      occupation: '',
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSignUp(registrationInfo) {
    this.signUp.emit(registrationInfo);
  }

  goToLogin() {
    this.login.emit();
  }
}
