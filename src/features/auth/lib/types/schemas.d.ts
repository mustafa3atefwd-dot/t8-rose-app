import { z } from 'zod';
import { emailStepSchema } from '../schemas/email-step.schema';
import { otpStepSchema } from '../schemas/otp-step.schema';
import { userInfoStepSchema } from '../schemas/user-info-step.schema';

export type IEmailStepSchema = z.infer<ReturnType<typeof emailStepSchema>>;
export type IOtpStepSchema = z.infer<ReturnType<typeof otpStepSchema>>;
export type IUserInfoStepSchema = z.infer<ReturnType<typeof userInfoStepSchema>>;
