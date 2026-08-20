export const BACKEND_URL = process.env.BACKEND_URL;

// Server-only vars are never inlined into client bundles — anything fetched
// from a 'use client' component must go through this public URL instead.
export const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Absolute origin this app is served from, for URLs a third party has to send
 * the user back to (e.g. the Stripe success redirect).
 *
 * Falls back to the live origin because a missing env var would otherwise be
 * interpolated as the literal string "undefined" and shipped to the payment
 * provider as `undefined/orders`.
 */
export const getAppOrigin = (): string => {
  const configured = process.env.NEXT_PUBLIC_APP_URL;
  if (configured) return configured.replace(/\/$/, '');

  return typeof window === 'undefined' ? '' : window.location.origin;
};

export const HEADERS = {
  jsonBody: {
    'Content-Type': 'application/json',
  },
};
