'use server';

import { apiRequest } from '@/shared/lib/utils/request.util';

import type { IApiResponse } from '@/shared/lib/types/api';
import type { IProduct } from '@/features/products/lib/types';
import { ProductMutationInput } from '../lib/types';

import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'http://localhost:3000';

export async function createProductAction(input: ProductMutationInput): Promise<IApiResponse<IProduct>> {
  const token = await getNextAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  return apiRequest<IApiResponse<IProduct>>(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(input),
  });
}

export async function updateProductAction({
  id,
  input,
}: {
  id: string;
  input: Partial<ProductMutationInput>;
}): Promise<IApiResponse<IProduct>> {
  const token = await getNextAuthToken();
  if (!token) {
    throw new Error('Authentication required');
  }
  return apiRequest<IApiResponse<IProduct>>(`${API_BASE_URL}/products/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(input),
  });
}
