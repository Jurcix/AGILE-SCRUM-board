import { UpdatePassword } from './../../types/profile';
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { merge, pathOr } from 'ramda';
import { UserProfile } from '../../types';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {
  @Input() user: UserProfile;

  @Output() updateProfile = new EventEmitter<UserProfile>();
  @Output() updatePassword = new EventEmitter<UpdatePassword>();

  profileForm: FormGroup;
  passwordForm: FormGroup;
  countries: string[];
  occupations: string[];
  editMode = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.countries = [
      'Lietuva', 'Anglija', 'Amerika', 'Niekur',
    ];
    this.occupations = [
      'Dirbantis', 'Studentas', 'Bedarbis'
    ];

    this.buildProfileForm();
    this.buildPasswordForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (pathOr(null, ['user', 'currentValue'], changes) && !changes.user.firstChange) {
      this.resetProfileForm();
    }
  }

  toggleMode() {
    this.editMode = !this.editMode;
    this.changePropertiesState();

    if (!this.editMode) {
      this.resetProfileForm();
    }
  }

  changePropertiesState() {
    const state = this.editMode ? 'enable' : 'disable';
    Object.keys(this.profileForm.controls).forEach((controlName) => {
      if (controlName !== 'birthYear' && controlName !== 'gender') {
        this.profileForm.controls[controlName][state]();
      }
    });
  }

  onUpdateProfile(updatedProfileForm: UserProfile) {
    this.updateProfile.emit(updatedProfileForm);
    this.editMode = false;
  }

  onUpdatePassword(updatePassword: UpdatePassword) {
    this.updatePassword.emit(updatePassword);
  }

  private resetProfileForm() {
    this.profileForm.reset({
      name: { value: this.user.name, disabled: true },
      lastName: { value: this.user.lastName, disabled: true },
      email: { value: this.user.email, disabled: true },
      birthYear: { value: this.user.birthYear, disabled: true },
      gender: { value: this.user.gender, disabled: true },
      location: { value: this.user.location, disabled: true },
      phone: { value: this.user.phone, disabled: true },
      occupation: { value: this.user.occupation, disabled: true },
    });
  }

  private buildProfileForm() {
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

  private buildPasswordForm() {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  private resetPasswordForm() {
    this.passwordForm.reset({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  }

}
