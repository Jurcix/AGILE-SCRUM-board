import { Story } from './../../types/story';
import { Action } from '@ngrx/store';
import { FilteredUsers } from '../../types';

export const SEARCH_ASSIGNEES = {
  REQUEST: '[Search assignees] requested',
  SUCCESS: '[Search assignees] successful',
  ERROR: '[Search assignees] failed',
};

export const STORY = {
  CREATE: {
    REQUEST: '[Story create request] requested',
    SUCCESS: '[Story create success] successful',
    ERROR: '[Story create error] failed',
  },
  LOAD: {
    REQUEST: '[Story load request] requested',
    SUCCESS: '[Story load success] successful',
    ERROR: '[Story load error] failed',
  },
  DELETE: {
    REQUEST: '[Story delete request] requested',
    SUCCESS: '[Story delete success] successful',
    ERROR: '[Story delete error] failed',
  }
};

export class SearchAssigneesRequest implements Action {
  type = SEARCH_ASSIGNEES.REQUEST;

  constructor(public payload: Object) { }
}

export class SearchAssigneesSuccess implements Action {
  type = SEARCH_ASSIGNEES.SUCCESS;

  constructor(public payload: FilteredUsers[]) { }
}

export class SearchAssigneesError implements Action {
  type = SEARCH_ASSIGNEES.ERROR;

  constructor(public payload: Error) { }
}

export class CreateStoryRequest implements Action {
  type = STORY.CREATE.REQUEST;

  constructor(public payload: Story) { }
}

export class CreateStorySuccess implements Action {
  type = STORY.CREATE.SUCCESS;

  constructor(public payload: Story) { }
}

export class CreateStoryError implements Action {
  type = STORY.CREATE.ERROR;

  constructor(public payload: Error) { }
}

export class LoadStoryRequest implements Action {
  type = STORY.LOAD.REQUEST;

  constructor() { }
}

export class LoadStorySuccess implements Action {
  type = STORY.LOAD.SUCCESS;

  constructor(public payload: Story[]) { }
}

export class LoadStoryError implements Action {
  type = STORY.LOAD.ERROR;

  constructor(public payload: Error) { }
}

export class DeleteStoryRequest implements Action {
  type = STORY.DELETE.REQUEST;

  constructor(public payload: { stories: string[] }) { }
}

export class DeleteStorySuccess implements Action {
  type = STORY.DELETE.SUCCESS;

  constructor() { }
}

export class DeleteStoryError implements Action {
  type = STORY.DELETE.ERROR;

  constructor(public payload: Error) { }
}

export type StoryActions =
SearchAssigneesRequest | SearchAssigneesSuccess | SearchAssigneesError |
CreateStoryRequest | CreateStorySuccess | CreateStoryError |
LoadStoryRequest | LoadStorySuccess | LoadStoryError |
DeleteStoryRequest | DeleteStorySuccess | DeleteStoryError;
