import { z } from "zod";

/**
 * Validation schema for OTP verification step
 * Ensures valid email + 6-digit numeric code
 */
export const otpStepSchema = z.object({
  // Email must be valid format
  email: z.email("Invalid email"),

  // OTP must be exactly 6 digits (numbers only)
  code: z
    .string()
    .trim()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});
