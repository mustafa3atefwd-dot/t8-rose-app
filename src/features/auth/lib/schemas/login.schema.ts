import { z } from 'zod';

export function loginSchema(messages: { required: string }) {
  return z.object({
    username: z.string().min(1, messages.required),
    password: z.string().min(1, messages.required),
    rememberMe: z.boolean(),
  });
}

export type LoginSchema = z.infer<ReturnType<typeof loginSchema>>;
