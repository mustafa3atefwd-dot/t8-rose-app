import * as z from 'zod';

// step1
export const forgotPasswordStep1Schema = z.object({
  email: z.string().min(1, 'Your email is required').pipe(z.email('Please enter a valid email address')),
});

export type TForgotPasswordStep1Schema = z.infer<typeof forgotPasswordStep1Schema>;

// step3
export const forgotPasswordStep3Schema = z
  .object({
    newPassword: z
      .string()
      .nonempty('New password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(/[@$!%*?&^#()_\-+=]/, 'Password must contain at least one special character'),
    confirmPassword: z.string().nonempty('Your confirm password is required'),
    token: z.string(),
  })
  .refine(
    (obj) => {
      return obj.newPassword === obj.confirmPassword;
    },
    {
      error: 'Confirm Password must match New Password',
      path: ['confirmPassword'],
    }
  );

export type TForgotPasswordStep3Schema = z.infer<typeof forgotPasswordStep3Schema>;
