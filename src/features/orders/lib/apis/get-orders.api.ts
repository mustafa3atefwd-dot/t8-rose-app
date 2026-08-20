'use server';

import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { apiRequest } from '@/shared/lib/utils/request.util';
import { getNextAuthToken } from '@/shared/lib/utils/auth.util';
import { IGetOrdersParams } from '../types';
import { IOrdersResponse } from '../types/order';
import { buildQueryParams } from '@/shared/lib/utils/query.util';

export async function getAllOrders(params: IGetOrdersParams) {
  // Get Auth Token
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  // Build Query Params
  const queryParams = buildQueryParams(params);

  // Build URL
  const url = `${BACKEND_URL}/orders?${queryParams}`;

  // API Request
  const result = await apiRequest<IOrdersResponse>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
}
