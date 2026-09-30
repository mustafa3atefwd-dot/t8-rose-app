import 'server-only';

import { BACKEND_URL } from '@/shared/lib/constants';
import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';
import { apiRequest } from '@/shared/lib/utils/request.util';
import type { ISuccessResponse } from '@/shared/lib/types/api';
import type { IUser } from '@/shared/lib/types/user';

/**
 * Reads the signed-in user's profile directly from the backend, for use in
 * Server Components. Returns null when there is no valid session, so callers
 * can redirect instead of rendering the page.
 */
export async function getAccountProfile(): Promise<IUser | null> {
  const token = await getNextAuthToken();
  if (!token) return null;

  const response = await apiRequest<ISuccessResponse<{ user: IUser }>>(`${BACKEND_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  return response.payload?.user ?? null;
}
