import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectDetails, FilteredUsers, UsersIds } from '../../types';
import { FormControl } from '@angular/forms';
import { concat } from 'ramda';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { takeLast } from 'rxjs/operators/takeLast';

@Component({
  selector: 'app-project-summary-component',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent implements OnInit {
  @Input() project: ProjectDetails;
  @Input() filteredUsers: Observable<FilteredUsers>;

  @Output() removeUser = new EventEmitter<string>();
  @Output() searchUsers = new EventEmitter<Object>();
  @Output() addUsersToProject = new EventEmitter<UsersIds>();
  @Output() goToBacklog = new EventEmitter<void>();
  @Output() navigateToSprints = new EventEmitter<string>();

  userSearchInput: FormControl;
  usersEmails = new BehaviorSubject<string[]>([]);

  get createdDate() {
    return this.project.createdAt ? new Date(this.project.createdAt) : '';
  }
  constructor() { }

  ngOnInit() {
    this.userSearchInput = new FormControl('');
  }

  onRemoveUser(id: string) {
    this.removeUser.emit(id);
  }

  onSearchUsers(searchString: string) {
    this.searchUsers.emit({ email: searchString });
  }

  addUser(userEmail: string) {
    this.usersEmails.next(concat(this.usersEmails.getValue(), [userEmail]));
  }

  revertAddUser(userEmail: string) {
    this.usersEmails.next(
      this.usersEmails.getValue()
        .filter(value => value !== userEmail)
    );
  }

  clearAddUserModal() {
    this.usersEmails.next([]);
    this.userSearchInput.setValue('');
  }

  onAddUsersToProject() {
    this.addUsersToProject.emit({ users: this.usersEmails.getValue()});
  }

  onGoToBacklog() {
    this.goToBacklog.emit();
  }

  onNavigateToSprints(id: string) {
    this.navigateToSprints.emit(id);
  }
}
