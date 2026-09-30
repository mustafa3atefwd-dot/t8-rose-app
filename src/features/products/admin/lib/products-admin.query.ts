import type { AdminProductsQueryParams } from './types';

/** Rows per page in the admin table. */
export const ADMIN_PRODUCTS_PAGE_SIZE = 12;

/** The admin table always lists newest first. */
export const ADMIN_PRODUCTS_SORT = { sortBy: 'createdAt', sortOrder: 'desc' } as const;

/**
 * React Query cache key for the admin list. Shared so the server-rendered first
 * page seeds the exact entry the client query reads from.
 */
export const adminProductsQueryKey = (page: number, search: string) => ['admin-products', page, search] as const;

/**
 * Serializes admin list filters into the backend's query-string shape. Shared by
 * the client API layer and the server fetcher so both sides request the same rows.
 */
export const buildAdminProductsQuery = (params: AdminProductsQueryParams = {}) => {
  const query = new URLSearchParams();

  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.search) query.set('search', params.search);
  if (params.sortBy) query.set('sortBy', params.sortBy);
  if (params.sortOrder) query.set('sortOrder', params.sortOrder);

  return query.toString();
};
