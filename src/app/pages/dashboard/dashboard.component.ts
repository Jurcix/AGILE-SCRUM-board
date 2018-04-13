import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FilteredUsers } from './../../types/project';
import { UpdatePassword, Project } from './../../types/';
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { merge, pathOr, find, pipe, concat } from 'ramda';
import { UserProfile } from '../../types';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {
  @Input() user: UserProfile;
  @Input() filteredUsers: Observable<FilteredUsers>;

  @Output() updateProfile = new EventEmitter<UserProfile>();
  @Output() updatePassword = new EventEmitter<UpdatePassword>();
  @Output() createProject = new EventEmitter<Project>();
  @Output() searchUsers = new EventEmitter<Object>();

  profileForm: FormGroup;
  passwordForm: FormGroup;
  projectForm: FormGroup;
  userSearchInput: FormControl;
  usersEmails = new BehaviorSubject<string[]>(['']);
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
    this.userSearchInput = new FormControl('');

    this.buildProfileForm();
    this.buildPasswordForm();
    this.buildProjectForm();
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

  onCreateProject(project: Project) {
    this.createProject.emit(project);
  }

  onSearchUsers(searchString: string) {
    this.searchUsers.emit({email: searchString});
  }

  addUser(userEmail: string) {
    const newUsers = concat(this.projectForm.controls['users'].value, [userEmail]);
    this.projectForm.patchValue({
      users: newUsers
    });
    this.usersEmails.next(this.projectForm.controls['users'].value);
  }

  removeUser(userEmail: string) {
    const newUsers = this.projectForm.controls['users'].value
      .filter(email => email !== userEmail);
      this.projectForm.patchValue({
        users: newUsers
      });
      this.usersEmails.next(this.projectForm.controls['users'].value);
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

  private buildProjectForm() {
    this.projectForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      startDate: '',
      users: [[]],
      description: [''],
    });
  }

  private resetProjectForm() {
    this.userSearchInput.setValue('');
    this.usersEmails.next(null);
    this.projectForm.reset({
      code: '',
      name: '',
      startDate: '',
      users: [],
      description: '',
    });
  }
}
