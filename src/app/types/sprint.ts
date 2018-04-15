import { StoryStates } from './project';

export interface SprintSummary {
  id: string;
  indicator: number;
  time: {
    days: number
  };
  stories: StoryStates[];
  sprintStartDate: string;
}

export interface Sprints {
  sprintTime: {
    days: number;
  };
  sprintCount: number;
}
