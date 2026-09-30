import { apiRequest } from '@/shared/lib/utils/request.util';
import { buildAdminProductsQuery } from './products-admin.query';
import type { AdminProductsQueryParams, AdminProductsResponse, ProductAckResponse } from './types';

// Reads go through the route handler so the backend URL and access token stay
// server-side. Mutations live in `products-admin.action.ts` as Server Actions.

export function getAdminProducts(params: AdminProductsQueryParams = {}) {
  return apiRequest<AdminProductsResponse>(`/api/products?${buildAdminProductsQuery(params)}`);
}

export function getDeletedProducts(params: Pick<AdminProductsQueryParams, 'page' | 'limit'> = {}) {
  return apiRequest<AdminProductsResponse>(`/api/products/deleted?${buildAdminProductsQuery(params)}`);
}

export function restoreProduct(id: string) {
  return apiRequest<ProductAckResponse>(`/api/products/${id}/restore`, { method: 'PATCH' });
}
