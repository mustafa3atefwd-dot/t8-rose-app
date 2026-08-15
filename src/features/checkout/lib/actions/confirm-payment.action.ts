import 'server-only';

import { apiRequest } from '@/shared/lib/utils/request.util';
import { getNextAuthToken } from '@/shared/lib/utils/auth.util';
import { BACKEND_URL } from '@/shared/lib/constants';
import type { IConfirmPaymentRequest } from '../types/payment';

/**
 * Confirms a payment.
 */
export const confirmPaymentAction = async (payload: IConfirmPaymentRequest) => {
  // Get Auth Token.
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  // Construct Request URL.
  const url = `${BACKEND_URL}/payments/confirm`;

  return apiRequest(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};
