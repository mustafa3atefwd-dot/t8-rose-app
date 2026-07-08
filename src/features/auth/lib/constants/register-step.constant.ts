import { RegisterStep } from '../types/auth';

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
 * Application user register step order
 */
export const REGISTER_STEP_ORDER: Record<RegisterStep, number> = {
  [REGISTER_STEPS.email]: 0,
  [REGISTER_STEPS.otp]: 1,
  [REGISTER_STEPS.userInfo]: 2,
  [REGISTER_STEPS.password]: 3,
} as const;
