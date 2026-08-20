'use server';
import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';
import { apiRequest } from '@/shared/lib/utils/request.util';
import { IPushStatusResponse } from '../types/push-status';

async function getAccessToken() {
  const token = await getNextAuthToken();
  if (!token) {
    throw new Error('Unauthorized');
  }
  return token;
}

// get push status
export async function getPushStatus(): Promise<IPushStatusResponse> {
  const token = await getAccessToken();

  // URL - /notifications/push-status
  const url = `${BACKEND_URL}/notifications/push-status`;

  // API Request
  const result = await apiRequest<IPushStatusResponse>(url, {
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
