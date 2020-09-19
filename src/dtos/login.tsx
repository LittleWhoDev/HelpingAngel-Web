import { UserRole } from '@/api/user';

export interface RegisterDTO {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  role: UserRole;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface SuccessDTO {
  username: string;
  role: UserRole;
  token?: string;
}
