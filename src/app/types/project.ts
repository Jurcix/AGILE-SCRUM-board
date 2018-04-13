export interface Project {
  code: string;
  name: string;
  startDate: string;
  users: string[];
  description: string;
}

export interface FilteredUsers {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

export interface ProjectSummary {
  id: string;
  name: string;
  stories: StoryStates[];
  sprints: number;
}

export interface StoryStates {
  _id: string;
  state: string;
}
