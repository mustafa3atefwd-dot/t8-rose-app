export const BACKEND_URL = process.env.BACKEND_URL;

// Server-only vars are never inlined into client bundles — anything fetched
// from a 'use client' component must go through this public URL instead.
export const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const HEADERS = {
  jsonBody: {
    'Content-Type': 'application/json',
  },
};
