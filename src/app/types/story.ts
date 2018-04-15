
export interface Story {
  id?: string;
  creator?: string;
  code?: string;
  name: string;
  storyPoints: string;
  priority: string;
  assignee: string;
  description: string;
  selected?: boolean;
}

