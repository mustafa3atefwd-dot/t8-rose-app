import 'server-only';

import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';
import { apiRequest } from '@/shared/lib/utils/request.util';
import { ADMIN_PRODUCTS_PAGE_SIZE, ADMIN_PRODUCTS_SORT, buildAdminProductsQuery } from './products-admin.query';
import type { AdminProductsResponse } from './types';

/**
 * First page of the admin product list, fetched while the dashboard page renders
 * so the table paints rows instead of a skeleton. Paging and search still run on
 * the client through `/api/products`.
 *
 * Returns `undefined` when the list can't be prefetched — the client query then
 * fetches it on mount, which is the pre-existing behaviour.
 */
export async function getInitialAdminProducts(): Promise<AdminProductsResponse | undefined> {
  const token = await getNextAuthToken();
  if (!token) return undefined;

  const query = buildAdminProductsQuery({ page: 1, limit: ADMIN_PRODUCTS_PAGE_SIZE, ...ADMIN_PRODUCTS_SORT });

  try {
    return await apiRequest<AdminProductsResponse>(`${BACKEND_URL}/products?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
  } catch {
    return undefined;
  }
}
