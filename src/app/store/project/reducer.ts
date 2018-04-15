import { FilteredUsers, ProjectSummary, ProjectDetails } from './../../types/project';
import { ProjectActions, SEARCH_USERS, PROJECT, ADD_USERS } from './actions';
import { merge, assoc } from 'ramda';

export interface ProjectState {
  filteredUsers: FilteredUsers[];
  projectsSummary: ProjectSummary[];
  projectDetails: ProjectDetails;
}

export const InitialProjectState: ProjectState = {
  filteredUsers: [],
  projectsSummary: [],
  projectDetails: {
    id: '',
    name: '',
    description: '',
    users: [],
    creator: {
      _id: '',
      name: '',
      lastName: '',
    },
    createdAt: '',
  },
};

export function reducer(state = InitialProjectState, action: any): ProjectState {
 switch (action.type) {
   case SEARCH_USERS.SUCCESS:
    return assoc('filteredUsers', action.payload, state);
  case PROJECT.SUMMARY.SUCCESS:
    return assoc('projectsSummary', action.payload, state);
  case PROJECT.DETAILS.SUCCESS:
    return assoc('projectDetails', action.payload, state);
    case ADD_USERS.SUCCESS:
    return assoc('projectDetails', action.payload, state);
  }
 return state;
}

