import { FilteredUsers, ProjectSummary } from './../../types/project';
import { Action } from '@ngrx/store';
import { Project } from '../../types';

export const PROJECT = {
  CREATE: {
    REQUEST: '[Project create] requested',
    SUCCESS: '[Project create] successful',
    ERROR: '[Project create] failed',
  },
  SUMMARY:  {
    REQUEST: '[Project summary] requested',
    SUCCESS: '[Project summary] successful',
    ERROR: '[Project summary] failed',
  },
};

export const SEARCH_USERS = {
  REQUEST: '[Search users] requested',
  SUCCESS: '[Search users] successful',
  ERROR: '[Search users] failed',
};

export class ProjectCreateRequest implements Action {
  type = PROJECT.CREATE.REQUEST;

  constructor(public payload: Project) { }
}

export class ProjectCreateSuccess implements Action {
  type = PROJECT.CREATE.SUCCESS;

  constructor() { }
}

export class ProjectCreateError implements Action {
  type = PROJECT.CREATE.ERROR;

  constructor(public payload: Error) { }
}

export class ProjectSummaryRequest implements Action {
  type = PROJECT.SUMMARY.REQUEST;

  constructor() { }
}

export class ProjectSummarySuccess implements Action {
  type = PROJECT.SUMMARY.SUCCESS;

  constructor(public payload: ProjectSummary[]) { }
}

export class ProjectSummaryError implements Action {
  type = PROJECT.SUMMARY.ERROR;

  constructor(public payload: Error) { }
}

export class SearchUsersRequest implements Action {
  type = SEARCH_USERS.REQUEST;

  constructor(public payload: Object) { }
}

export class SearchUsersSuccess implements Action {
  type = SEARCH_USERS.SUCCESS;

  constructor(public payload: FilteredUsers[]) { }
}

export class SearchUsersError implements Action {
  type = SEARCH_USERS.ERROR;

  constructor(public payload: Error) { }
}

export type ProjectActions =
ProjectCreateRequest | ProjectCreateSuccess | ProjectCreateError |
ProjectSummaryRequest | ProjectSummarySuccess | ProjectSummaryError |
SearchUsersRequest | SearchUsersSuccess | SearchUsersError;
