import { FilteredUsers,
  ProjectSummary,
  ProjectDetails,
  UserID,
  UsersIds
} from './../../types/project';
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
  DETAILS: {
    REQUEST: '[Project details] requested',
    SUCCESS: '[Project details] successful',
    ERROR: '[Project details] failed',
  }
};

export const SEARCH_USERS = {
  REQUEST: '[Search users] requested',
  SUCCESS: '[Search users] successful',
  ERROR: '[Search users] failed',
};

export const REMOVE_USER = {
  REQUEST: '[Remove user] requested',
  SUCCESS: '[Remove user] successful',
  ERROR: '[Remove user] failed',
};

export const ADD_USERS = {
  REQUEST: '[Add users] requested',
  SUCCESS: '[Add users] successful',
  ERROR: '[Add users] failed',
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

export class ProjectDetailsRequest implements Action {
  type = PROJECT.DETAILS.REQUEST;

  constructor() { }
}

export class ProjectDetailsSuccess implements Action {
  type = PROJECT.DETAILS.SUCCESS;

  constructor(public payload: ProjectDetails) { }
}

export class ProjectDetailsError implements Action {
  type = PROJECT.DETAILS.ERROR;

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

export class RemoveUserRequest implements Action {
  type = REMOVE_USER.REQUEST;

  constructor(public payload: UserID) { }
}

export class RemoveUserSuccess implements Action {
  type = REMOVE_USER.SUCCESS;

  constructor(public payload: ProjectDetails) { }
}

export class RemoveUserError implements Action {
  type = REMOVE_USER.ERROR;

  constructor(public payload: Error) { }
}

export class AddUsersRequest implements Action {
  type = ADD_USERS.REQUEST;

  constructor(public payload: UsersIds) { }
}

export class AddUsersSuccess implements Action {
  type = ADD_USERS.SUCCESS;

  constructor(public payload: ProjectDetails) { }
}

export class AddUsersError implements Action {
  type = ADD_USERS.ERROR;

  constructor(public payload: Error) { }
}

export type ProjectActions =
ProjectCreateRequest | ProjectCreateSuccess | ProjectCreateError |
ProjectSummaryRequest | ProjectSummarySuccess | ProjectSummaryError |
ProjectDetailsRequest | ProjectDetailsSuccess | ProjectDetailsError |
SearchUsersRequest | SearchUsersSuccess | SearchUsersError |
RemoveUserRequest | RemoveUserSuccess | RemoveUserError |
AddUsersRequest | AddUsersSuccess | AddUsersError;
