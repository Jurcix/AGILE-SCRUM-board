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
