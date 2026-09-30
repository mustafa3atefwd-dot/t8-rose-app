/**
 * Application user register steps
 */
export const REGISTER_STEPS = {
  email: 'EMAIL',
  otp: 'OTP',
  userInfo: 'USER_INFO',
  password: 'PASSWORD',
} as const;

/**
 * Ordinal position of each register step, used to derive navigation direction
 */
export const REGISTER_STEP_ORDER: Record<(typeof REGISTER_STEPS)[keyof typeof REGISTER_STEPS], number> = {
  [REGISTER_STEPS.email]: 0,
  [REGISTER_STEPS.otp]: 1,
  [REGISTER_STEPS.userInfo]: 2,
  [REGISTER_STEPS.password]: 3,
};
