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

export interface ProjectDetails {
  id: string;
  name: string;
  description: string;
  users: ProjectUser[];
  creator: ProjectUser;
  createdAt: string;
}

export interface ProjectUser {
  _id: string;
  name: string;
  lastName: string;
}

export interface StoryStates {
  _id: string;
  state: string;
}

export interface UserID {
  user: string;
}

export interface UsersIds {
  users: string[];
}
