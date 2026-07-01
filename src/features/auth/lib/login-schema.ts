import { z } from "zod";

export function createLoginSchema(messages: {
  required: string;
  invalidEmail: string;
}) {
  return z.object({
    email: z.string().min(1, messages.required).email(messages.invalidEmail),
    password: z.string().min(1, messages.required),
    rememberMe: z.boolean(),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
