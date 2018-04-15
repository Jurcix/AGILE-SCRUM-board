import { getStories } from './../../store/story/selectors';
import { Observable } from 'rxjs/Observable';
import {
  CreateStoryRequest,
  LoadStoryRequest,
  DeleteStoryRequest
} from './../../store/story/actions';
import { FilteredUsers } from './../../types/project';
import { AppState } from './../../store/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { SearchAssigneesRequest, getFilteredAssignees } from '../../store/story';
import { Story } from '../../types/story';

@Component({
  selector: 'app-backlog',
  template: `
   <app-backlog-component
    [filteredUsers]="filteredUsers$"
    [stories]="stories$ | async"

    (createStory)="createStory($event)"
    (searchUsers)="searchUsers($event)"
    (deleteStories)="deleteStories($event)"
  ></app-backlog-component>
`
})
export class BacklogContainer implements OnInit {
  filteredUsers$: Observable<FilteredUsers[]>;
  stories$: Observable<Story[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadStoryRequest);
    this.filteredUsers$ = this.store.select(getFilteredAssignees);
    this.stories$ = this.store.select(getStories);
  }

  searchUsers(searchString: Object) {
    this.store.dispatch(new SearchAssigneesRequest(searchString));
  }

  createStory(story: Story) {
    this.store.dispatch(new CreateStoryRequest(story));
  }

  deleteStories(storiesIds: string[]) {
    this.store.dispatch(new DeleteStoryRequest(storiesIds));
  }
}
