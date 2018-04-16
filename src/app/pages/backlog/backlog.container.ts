import { SprintListRequest, AddStoriesToSprintRequest } from './../../store/sprints/actions';
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
import { SprintSummary } from '../../types/sprint';
import { getSprintSummaries } from '../../store/sprints/selectors';

@Component({
  selector: 'app-backlog',
  template: `
   <app-backlog-component
    [filteredUsers]="filteredUsers$"
    [stories]="stories$ | async"
    [sprints]="sprints$ | async"

    (createStory)="createStory($event)"
    (searchUsers)="searchUsers($event)"
    (deleteStories)="deleteStories($event)"
    (moveToSprint)="moveToSprint($event)"
  ></app-backlog-component>
`
})
export class BacklogContainer implements OnInit {
  filteredUsers$: Observable<FilteredUsers[]>;
  stories$: Observable<Story[]>;
  sprints$: Observable<SprintSummary[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadStoryRequest);
    this.store.dispatch(new SprintListRequest);
    this.filteredUsers$ = this.store.select(getFilteredAssignees);
    this.stories$ = this.store.select(getStories);
    this.sprints$ = this.store.select(getSprintSummaries);
  }

  searchUsers(searchString: Object) {
    this.store.dispatch(new SearchAssigneesRequest(searchString));
  }

  createStory(story: Story) {
    this.store.dispatch(new CreateStoryRequest(story));
  }

  deleteStories(storiesIds: string[]) {
    this.store.dispatch(new DeleteStoryRequest({stories: storiesIds}));
  }

  moveToSprint(stories) {
    this.store.dispatch(new AddStoriesToSprintRequest(stories));
  }
}
