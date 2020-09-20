export interface UserInterface {
  username: string;
  password: string;
  email?: string;
  role: UserRole;
}

export enum UserRole {
  ANGEL,
  DONOR,
  REQUESTER,
}

export function stringToUserRole(s: string): UserRole {
  switch (s.toLowerCase()) {
    case 'donor':
      return UserRole.DONOR;
    case 'angel':
      return UserRole.ANGEL;
    case 'requester':
      return UserRole.REQUESTER;
    default:
  }

  return UserRole.DONOR;
}
