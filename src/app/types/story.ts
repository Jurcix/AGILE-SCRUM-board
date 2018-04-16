
export interface Story {
  id?: string;
  creator?: StoryAssignee;
  code?: string;
  name: string;
  storyPoints: string;
  priority: string;
  assignee: StoryAssignee;
  description: string;
  selected?: boolean;
}

export interface StoryAssignee {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

