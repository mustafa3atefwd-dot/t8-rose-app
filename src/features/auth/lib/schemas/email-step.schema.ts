import { z } from "zod";

/**
 * Validation schema for email step (used in auth flows)
 * Ensures email is required and properly formatted
 */
export const emailStepSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
});
