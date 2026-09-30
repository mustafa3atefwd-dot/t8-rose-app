import 'server-only';

import { apiRequest } from '@/shared/lib/utils/request.util';
import { getNextAuthToken } from '@/shared/lib/utils/auth.util';

import { BACKEND_URL } from '@/shared/lib/constants';
import type {
  ICheckoutSessionStatusResponse,
  ICreateCheckoutSessionResponse,
} from '../types/payment';

const CHECKOUT_SESSION_URL = `${BACKEND_URL}/payments/checkout-session`;

/**
 * Authorization header for the signed-in user, or null when there is no
 * session — payment endpoints are never callable anonymously.
 */
async function getAuthHeader() {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  return token ? `Bearer ${token}` : null;
}

/**
 * Opens (or reuses) the Stripe Checkout session for an order and returns the
 * URL to send the buyer to.
 */
export const createCheckoutSessionAction = async (
  orderId: string,
  redirects?: { successUrl?: string; cancelUrl?: string }
) => {
  const authorization = await getAuthHeader();
  if (!authorization) throw new Error('Unauthorized');

  return apiRequest<ICreateCheckoutSessionResponse>(CHECKOUT_SESSION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    body: JSON.stringify({
      orderId,
      ...(redirects?.successUrl ? { successUrl: redirects.successUrl } : {}),
      ...(redirects?.cancelUrl ? { cancelUrl: redirects.cancelUrl } : {}),
    }),
  });
};

/**
 * Reads the payment/session status for a checkout session, so the app can
 * confirm an order actually got paid after Stripe redirects the user back.
 */
export const getCheckoutSessionStatusAction = async (sessionId: string) => {
  const authorization = await getAuthHeader();
  if (!authorization) throw new Error('Unauthorized');

  // The API names this query parameter `session_id` — it is the `cs_...` value
  // Stripe appends to the success URL.
  const url = `${CHECKOUT_SESSION_URL}?session_id=${encodeURIComponent(sessionId)}`;

  return apiRequest<ICheckoutSessionStatusResponse>(url, {
    method: 'GET',
    headers: {
      Authorization: authorization,
    },
  });
};
