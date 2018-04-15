import { Action } from '@ngrx/store';
import { SprintSummary, Sprints } from './../../types/sprint';

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

export type SprintActions =
SprintListRequest | SprintListSuccess | SprintListError;
