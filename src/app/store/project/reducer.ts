import { FilteredUsers, ProjectSummary } from './../../types/project';
import { ProjectActions, SEARCH_USERS, PROJECT } from './actions';
import { merge, assoc } from 'ramda';

export interface ProjectState {
  filteredUsers: FilteredUsers[];
  projectsSummary: ProjectSummary[];
}

export const InitialProjectState: ProjectState = {
  filteredUsers: [],
  projectsSummary: [],
};

export function reducer(state = InitialProjectState, action: any): ProjectState {
 switch (action.type) {
   case SEARCH_USERS.SUCCESS:
    return assoc('filteredUsers', action.payload, state);
  case (PROJECT.SUMMARY.SUCCESS):
    return assoc('projectsSummary', action.payload, state);
  }
 return state;
}

