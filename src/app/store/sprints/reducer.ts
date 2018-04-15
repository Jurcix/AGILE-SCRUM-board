import { SprintSummary } from './../../types/sprint';
import { SPRINT } from './actions';
import { merge, assoc } from 'ramda';

export interface SprintsState {
  sprintsSummaries: SprintSummary[];
}

export const InitialSprintsState: SprintsState = {
  sprintsSummaries: []
};

export function reducer(state = InitialSprintsState, action: any): SprintsState {
 switch (action.type) {
    case SPRINT.LIST.SUCCESS:
    case SPRINT.CREATE.SUCCESS: {
      return assoc('sprintsSummaries', [...state.sprintsSummaries, ...action.payload], state);
    }
  }
 return state;
}
