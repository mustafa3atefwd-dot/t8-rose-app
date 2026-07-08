import { IDocumentFields } from "@/shared/lib/types/base";
import { USER_ROLES, USER_GENDERS } from "../../../features/auth/lib/constants/user.constant";

/**
 * Derived type from USER_ROLES constant
 * Ensures role stays in sync with allowed values
 */
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];


/**
 * Derived type from USER_GENDERS constant
 * Ensures gender stays in sync with allowed values
 */
export type UserGender = (typeof USER_GENDERS)[keyof typeof USER_GENDERS];

/**
 * Core user entity model used across the app
 */
export interface IUser extends IDocumentFields {
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
}