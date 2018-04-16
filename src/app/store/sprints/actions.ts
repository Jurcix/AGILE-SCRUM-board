import { Action } from '@ngrx/store';
import { SprintSummary, Sprints } from './../../types/sprint';
import { Story } from '../../types/story';

export const SPRINT = {
  LIST: {
    REQUEST: '[Sprint list] requested',
    SUCCESS: '[Sprint list] successful',
    ERROR: '[Sprint list] failed',
  },
  CREATE: {
    REQUEST: '[Sprint create] requested',
    SUCCESS: '[Sprint create] successful',
    ERROR: '[Sprint create] failed',
  },
  ADD_STORIES: {
    REQUEST: '[Sprint add stories] requested',
    SUCCESS: '[Sprint add stories] successful',
    ERROR: '[Sprint add stories] failed',
  }
};


export class SprintListRequest implements Action {
  type = SPRINT.LIST.REQUEST;

  constructor() { }
}

export class SprintListSuccess implements Action {
  type = SPRINT.LIST.SUCCESS;

  constructor(public payload: SprintSummary[]) { }
}

export class SprintListError implements Action {
  type = SPRINT.LIST.ERROR;

  constructor(public payload: Error) { }
}

export class SprintCreatetRequest implements Action {
  type = SPRINT.CREATE.REQUEST;

  constructor(public payload: Sprints) { }
}

export class SprintCreateSuccess implements Action {
  type = SPRINT.CREATE.SUCCESS;

  constructor(public payload: SprintSummary[]) { }
}

export class SprintCreateError implements Action {
  type = SPRINT.CREATE.ERROR;

  constructor(public payload: Error) { }
}

export class AddStoriesToSprintRequest implements Action {
  type = SPRINT.ADD_STORIES.REQUEST;

  constructor(public payload: { stories: Story[], indicator: number }) { }
}

export class AddStoriesToSprintSuccess implements Action {
  type = SPRINT.ADD_STORIES.SUCCESS;

  constructor(public payload: SprintSummary) { }
}

export class AddStoriesToSprintError implements Action {
  type = SPRINT.ADD_STORIES.ERROR;

  constructor(public payload: Error) { }
}

export type SprintActions =
SprintListRequest | SprintListSuccess | SprintListError |
AddStoriesToSprintRequest | AddStoriesToSprintSuccess | AddStoriesToSprintError;
