import { z } from 'zod';

interface NewsletterValidationMessages {
  required: string;
  invalid: string;
}

export function createNewsletterSchema(messages: NewsletterValidationMessages) {
  return z.object({
    email: z.string().trim().min(1, messages.required).email(messages.invalid),
  });
}

export type NewsletterFormValues = z.infer<ReturnType<typeof createNewsletterSchema>>;
