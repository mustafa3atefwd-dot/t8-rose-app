import 'server-only';

import { apiRequest } from '@/shared/lib/utils/request.util';
import { getNextAuthToken } from '@/shared/lib/utils/auth.util';
import { BACKEND_URL } from '@/shared/lib/constants';
import { ICreatePaymentIntentRequest } from '@/features/orders/lib/types';

/**
 * Creates a payment intent.
 */
export const createPaymentIntentAction = async (payload: ICreatePaymentIntentRequest) => {
  // Get Auth Token.
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  // Construct Request URL.
  const url = `${BACKEND_URL}/payments/create-intent`;

  return apiRequest(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};
