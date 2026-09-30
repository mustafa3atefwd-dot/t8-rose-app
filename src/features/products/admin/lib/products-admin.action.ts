'use server';

import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';
import { apiRequest } from '@/shared/lib/utils/request.util';
import type { IProduct } from '@/features/products/lib/types';
import type {
  ProductAckResponse,
  ProductActionResult,
  ProductMutationInput,
  ProductMutationResponse,
} from './types';

/**
 * Runs a product mutation against the backend with the caller's access token.
 *
 * Failures are normalized into a serializable result rather than thrown: a
 * Server Action error reaches the browser as an opaque digest in production, so
 * throwing would replace the backend's validation message with a useless string.
 */
async function runProductMutation<TPayload>(
  mutate: (token: string) => Promise<TPayload>,
): Promise<ProductActionResult<TPayload>> {
  try {
    const token = await getNextAuthToken();
    if (!token) return { status: false, message: 'Unauthorized' };

    const payload = await mutate(token);
    return { status: true, payload };
  } catch (error) {
    return { status: false, message: error instanceof Error ? error.message : 'Request failed' };
  }
}

function jsonHeaders(token: string) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export async function createProductAction(
  input: ProductMutationInput,
): Promise<ProductActionResult<IProduct | undefined>> {
  return runProductMutation(async (token) => {
    const response = await apiRequest<ProductMutationResponse>(`${BACKEND_URL}/products`, {
      method: 'POST',
      headers: jsonHeaders(token),
      body: JSON.stringify(input),
    });

    return response.payload?.product;
  });
}

export async function updateProductAction(
  id: string,
  input: Partial<ProductMutationInput>,
): Promise<ProductActionResult<IProduct | undefined>> {
  return runProductMutation(async (token) => {
    const response = await apiRequest<ProductMutationResponse>(
      `${BACKEND_URL}/products/${encodeURIComponent(id)}`,
      {
        method: 'PATCH',
        headers: jsonHeaders(token),
        body: JSON.stringify(input),
      },
    );

    return response.payload?.product;
  });
}

export async function deleteProductAction(id: string): Promise<ProductActionResult> {
  return runProductMutation(async (token) => {
    await apiRequest<ProductAckResponse>(`${BACKEND_URL}/products/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  });
}
