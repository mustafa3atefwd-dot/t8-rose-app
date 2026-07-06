import * as z from "zod";

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Your email is required")
        .pipe(z.email("Invalid email address")),
})

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;