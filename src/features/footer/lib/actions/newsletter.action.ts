'use server';

import { BACKEND_URL, HEADERS } from '@/shared/lib/constants/api.constant';

export type NewsletterSubscriptionResult = 'subscribed' | 'already-subscribed';

export async function subscribeToNewsletter(email: string): Promise<NewsletterSubscriptionResult> {
  if (!BACKEND_URL) {
    throw new Error('The backend URL is not configured');
  }

  const response = await fetch(`${BACKEND_URL}/subscriptions`, {
    method: 'POST',
    headers: HEADERS.jsonBody,
    body: JSON.stringify({ email }),
  });

  if (response.status === 409) {
    return 'already-subscribed';
  }

  if (!response.ok) {
    throw new Error('Newsletter subscription failed');
  }

  return 'subscribed';
}
