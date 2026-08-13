import type { IUser } from '@/shared/lib/types/user';

export type ApiResponse<T = unknown> = {
  status: boolean;
  code?: number;
  message?: string;
  payload?: T;
  errors?: Array<{ message: string }>;
};

export type ProfileForm = Pick<IUser, 'firstName' | 'lastName' | 'email' | 'phone' | 'gender' | 'photo'>;
export type PasswordForm = { currentPassword: string; newPassword: string; confirmPassword: string };
export type UploadPayload = { url: string };
