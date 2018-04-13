import { FilteredUsers } from './../../types/project';
import { ProjectActions, SEARCH_USERS } from './actions';
import { merge, assoc } from 'ramda';

export interface ProjectState {
  filteredUsers: FilteredUsers[];
}

export const InitialProjectState: ProjectState = {
  filteredUsers: [],
};

export function reducer(state = InitialProjectState, action: any): ProjectState {
 switch (action.type) {
   case SEARCH_USERS.SUCCESS:
    return assoc('filteredUsers', action.payload, state);
 }
 return state;
}
