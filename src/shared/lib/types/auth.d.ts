import { UserGender, UserRole } from "./user";

export interface IUser {
  id: string; 
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  gender: UserGender | null;
  photo: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

interface LoginPayload {
  token: string;
  user: IUser;
}


export type LoginResponse = ApiResponse<LoginPayload>;