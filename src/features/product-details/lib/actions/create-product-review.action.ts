import 'server-only';

import { apiRequest } from '@/shared/lib/utils/request.util';
import { BACKEND_URL } from '@/shared/lib/constants';
import { IReviewSchema } from '@/features/product-details/lib/types';
import { ICreateProductReviewResponse } from '@/features/product-details/lib/types';
import { getNextAuthToken } from '@/shared/lib/utils/auth.util';

/**
 * Creates a review for a product.
 */
export const createProductReviewAction = async (payload: IReviewSchema) => {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  // Construct Request URL
  const url = `${BACKEND_URL}/reviews`;

  return apiRequest<ICreateProductReviewResponse>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};
