import { Document } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  DENTIST = "DENTIST",
  ASSISTANT = "ASSISTANT",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
