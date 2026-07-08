export interface IUser {
  id: string; 
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | null;
  photo: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  createdAt: string;
  updatedAt: string;
}

interface LoginPayload {
  token: string;
  user: IUser;
}


export type LoginResponse = ApiResponse<LoginPayload>;