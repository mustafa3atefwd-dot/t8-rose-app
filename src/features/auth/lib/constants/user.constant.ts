/**
 * Application user roles (RBAC)
 * Used for authorization and access control across the app
 */
export const USER_ROLES = {
  user: "USER",
  admin: "ADMIN",
  superAdmin: "SUPER_ADMIN",
} as const;

/**
 * Application user genders
*/
export const USER_GENDERS = {
  male: "MALE",
  female: "FEMALE",
} as const;

/**
 * Application user register steps
 */
export const REGISTER_STEPS = {
  email: "EMAIL",
  otp: "OTP",
  userInfo: "USER_INFO",
  password: "PASSWORD",
} as const;