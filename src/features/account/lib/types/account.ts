import type { IUser, UserGender } from '@/shared/lib/types/user';

export type ApiResponse<T = unknown> = {
  status: boolean;
  code?: number;
  message?: string;
  payload?: T;
  errors?: Array<{ message: string }>;
};

export type UploadPayload = { url: string };

// Fields the profile mutation submits, beyond what the validated form collects.
export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: UserGender | null;
  photo: string | null;
  originalEmail: string;
}

export interface UpdateProfileResult {
  user: IUser;
  emailChangePending: boolean;
}

export interface ConfirmEmailPayload {
  email: string;
  code: string;
}

export interface ChangePasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
