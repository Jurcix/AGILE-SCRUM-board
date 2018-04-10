export interface UserLogin {
  email: string;
  password: string;
}

export interface UserProfile {
  name: string;
  lastName: string;
  email: string;
  birthYear?: number;
  gender?: 'male' | 'female';
  location?: string;
  phone: string;
  occupation?: string;
  password: string;
  confirmPassword: string;
}
