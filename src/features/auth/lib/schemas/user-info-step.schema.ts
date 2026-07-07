import { z } from "zod";
import { USER_GENDERS } from "../constants/user.constant";
import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js/max";

/**
 * Validation schema for user registration info step
 * Includes personal data + authentication credentials
 */
export const userInfoStepSchema = z
  .object({
    // ===== Basic identity fields =====

    email: z.email("Invalid email"),

    firstName: z.string().min(2, "First name must be at least 2 characters"),

    lastName: z.string().min(2, "Last name must be at least 2 characters"),

    username: z.string().min(2, "Username must be at least 2 characters"),

    // ===== Phone validation =====

phone: z
  .object({
    phone: z.string().trim(),
    country: z.string(),
  })
      .refine((val) => isValidPhoneNumber(val.phone), {
        message: "Invalid phone number format",
      })      
      .refine((val) => /^\+20(10|11|12|15)\d{8}$/.test(val.phone), {
        message: "Invalid Egyptian mobile number",
      }),

    gender: z
      .enum(USER_GENDERS, {
        error: () => "Please select a valid gender",
      })
      .optional(),

    // ===== Password rules =====
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),

    confirmPassword: z.string(),
  })

  // ===== Cross-field validation =====
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
