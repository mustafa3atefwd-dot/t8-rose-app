import { apiRequest } from '@/shared/lib/utils/request.util';
import type { AdminProductsResponse, ProductMutationInput, ProductMutationResponse } from './types';

const jsonHeaders = { 'Content-Type': 'application/json' };

export async function getAdminProducts(params: { page?: number; limit?: number; search?: string; sortBy?: 'createdAt'; sortOrder?: 'asc' | 'desc' } = {}) {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.search) query.set('search', params.search);
  if (params.sortBy) query.set('sortBy', params.sortBy);
  if (params.sortOrder) query.set('sortOrder', params.sortOrder);
  return apiRequest<AdminProductsResponse>(`/api/products?${query.toString()}`);
}

export function getDeletedProducts(params: { page?: number; limit?: number } = {}) {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  return apiRequest<AdminProductsResponse>(`/api/products/deleted?${query.toString()}`);
}

export function deleteProduct(id: string) {
  return apiRequest<IApiMutationResponse>(`/api/products/${id}`, { method: 'DELETE' });
}

export function restoreProduct(id: string) {
  return apiRequest<IApiMutationResponse>(`/api/products/${id}/restore`, { method: 'PATCH' });
}

type IApiMutationResponse = {
  status: true;
  code: number;
  message?: string;
};
