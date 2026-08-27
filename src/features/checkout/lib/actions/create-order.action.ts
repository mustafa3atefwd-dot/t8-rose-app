import 'server-only';

import { apiRequest } from '@/shared/lib/utils/request.util';
import { getNextAuthToken } from '@/shared/lib/utils/auth.util';

import type { ICheckoutFormSchema } from '../types/schemas';
import { BACKEND_URL } from '@/shared/lib/constants';
import { ICreateOrderResponse } from '@/features/orders/lib/types';

/**
 * Creates a new order.
 */
export const createOrderAction = async (payload: ICheckoutFormSchema) => {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  // Construct Request URL
  const url = `${BACKEND_URL}/orders`;

  return apiRequest<ICreateOrderResponse>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};
