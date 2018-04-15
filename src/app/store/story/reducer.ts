import { assoc } from 'ramda';
import { FilteredUsers } from './../../types/project';
import { SEARCH_ASSIGNEES, STORY } from './actions';
import { Story } from '../../types/story';


export interface StoryState {
  filteredUsers: FilteredUsers[];
  stories: Story[];
}

export const InitialStoryState: StoryState = {
  filteredUsers: [],
  stories: [],
};

export function reducer(state = InitialStoryState, action) {
  switch (action.type) {
    case SEARCH_ASSIGNEES.SUCCESS:
      return assoc('filteredUsers', action.payload, state);
    case STORY.CREATE.SUCCESS:
      return assoc('stories', [...state.stories, ...action.payload], state);
    case STORY.LOAD.SUCCESS:
      return assoc('stories', action.payload, state);
  }
  return state;
}
