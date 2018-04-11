import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { merge } from 'ramda';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  profileForm: FormGroup;
  countries: string[];
  occupations: string[];
  editMode = false;
  user = {
    name: 'Raiunbow', 
      lastName: 'Dash',
      email: 'email@email.com',
      birthYear: '1993',
      gender: 'Female', 
      location: 'Lietuva',
      phone: '1236456789',
      occupation: 'Studentas',
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.countries = [
      'Lietuva', 'Anglija', 'Amerika', 'Niekur',
    ];

    this.occupations = [
      'Dirbantis', 'Studentas', 'Bedarbis'
    ];

    this.buildForm();
  }

  toggleMode() {
    this.editMode = !this.editMode;
    const state = this.editMode ? 'enable' : 'disable';

    Object.keys(this.profileForm.controls).forEach((controlName) => {
      if (controlName !== 'birthYear' && controlName !== 'gender') { 
        this.profileForm.controls[controlName][state]();
      }
    });


    console.log(this.profileForm)
  }

  onUpdateProfile(updatedProfileForm) {
    console.log(updatedProfileForm);
    console.log(this.user);
    this.user = merge(this.user, updatedProfileForm);
    console.log(this.user)
    this.resetForm();
    this.editMode = false;
  }

  private resetForm() {
    this.profileForm.reset({
      name: { value: this.user.name, disabled: true },
      lastName: { value: this.user.lastName, disabled: true },
      email: { value: this.user.email, disabled: true },
      birthYear: { value: this.user.birthYear, disabled: true },
      gender: { value: this.user.gender, disabled: true },
      location: { value: this.user.location, disabled: true },
      phone: { value: this.user.phone, disabled: true },
      occupation: { value: this.user.occupation, disabled: true },
    })
  }

  private buildForm() {
    this.profileForm = this.fb.group({
      name: [{ value: this.user.name, disabled: true }, Validators.required],
      lastName: [{ value: this.user.lastName, disabled: true }, Validators.required],
      email: [{ value: this.user.email, disabled: true }, Validators.required],
      birthYear: [{ value: this.user.birthYear, disabled: true }, Validators.required],
      gender: [{ value: this.user.gender, disabled: true }, Validators.required],
      location: [{ value: this.user.location, disabled: true }],
      phone: [{ value: this.user.phone, disabled: true }, Validators.required],
      occupation: [{ value: this.user.occupation, disabled: true }],
    });
  }

}
