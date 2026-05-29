import type { UserRole } from "../users/user.types.js";

export interface RegisterUserInfo {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginUserInfo {
  email: string;
  password: string;
}
