import { UserProfile } from './profile';
export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSignUP {
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

export interface UserProfile {
  name: string;
  lastName: string;
  email: string;
  birthYear?: number;
  gender?: 'male' | 'female';
  location?: string;
  phone: string;
  occupation?: string;
}

export interface AuthenticationToken {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: string;
}
export interface UserWithToken {
  token: AuthenticationToken;
  user: UserProfile;
}
