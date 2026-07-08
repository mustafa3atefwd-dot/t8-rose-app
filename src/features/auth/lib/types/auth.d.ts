import { REGISTER_STEPS } from "../constants/user.constant";

/**
 * Derived type from REGISTER_STEPS constant
 * Ensures register step stays in sync with allowed values
 */
export type RegisterStep = (typeof REGISTER_STEPS)[keyof typeof REGISTER_STEPS];