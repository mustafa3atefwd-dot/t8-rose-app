'use server';
import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';
import { apiRequest } from '@/shared/lib/utils/request.util';
import {
  IPushStatusResponse,
  IPushSubscribeRequest,
  IPushSubscribeResponse,
  ITestPushResponse,
  IUnreadCountResponse,
  IVapidPublicKeyResponse,
} from '../types/push-status';
import { IApiResponse } from '@/shared/lib/types/api';

async function getAccessToken() {
  const token = await getNextAuthToken();
  if (!token) {
    throw new Error('Unauthorized');
  }
  return token;
}

/**
 * Get push status
 * @description Get push status
 * @returns Promise<IPushStatusResponse>
 */
export async function getPushStatus() {
  // Get token
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

  // Handle error
  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
}

/**
 * Get VAPID public key
 * @description Get VAPID public key
 * @returns Promise<IVapidPublicKeyResponse>
 */
export async function getVapidPublicKey() {
  // Get token
  const token = await getAccessToken();

  // URL - /notifications/vapid-public-key
  const url = `${BACKEND_URL}/notifications/vapid-public-key`;

  // API Request
  const result = await apiRequest<IVapidPublicKeyResponse>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // Handle error
  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
}

/**
 * Create push subscription
 * @description Create push subscription
 * @returns Promise<IPushSubscribeResponse>
 */
export async function createPushSubscription(data: IPushSubscribeRequest) {
  // Get token
  const token = await getAccessToken();

  // URL - /notifications/subscriptions
  const url = `${BACKEND_URL}/notifications/subscriptions`;

  // API Request
  const result = await apiRequest<IPushSubscribeResponse>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  // Handle error
  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
}

/**
 * Delete push subscription
 * @description Delete push subscription
 * @returns Promise<IApiResponse>
 */
export async function deletePushSubscription(endpoint: string) {
  // Get token
  const token = await getAccessToken();

  // URL - /notifications/subscriptions
  const url = `${BACKEND_URL}/notifications/subscriptions`;

  // API Request
  const result = await apiRequest<IApiResponse>(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ endpoint }),
  });

  // Handle error
  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
}

/**
 * Send test push
 * @description Send test push
 * @returns Promise<ITestPushResponse>
 */
export async function sendTestPush() {
  // Get token
  const token = await getAccessToken();

  // URL - /notifications/test-push
  const url = `${BACKEND_URL}/notifications/test-push`;

  // API Request
  const result = await apiRequest<ITestPushResponse>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // Handle error
  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
}

/**
 * Get unread count
 * @description Get unread count
 * @returns Promise<IUnreadCountResponse>
 */
export async function getUnreadCount() {
  // Get token
  const token = await getAccessToken();

  // URL - /notifications/unread-count
  const url = `${BACKEND_URL}/notifications/unread-count`;

  // API Request
  const result = await apiRequest<IUnreadCountResponse>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // Handle error
  if (!result.status) {
    throw new Error(result.message);
  }

  return result;
}
