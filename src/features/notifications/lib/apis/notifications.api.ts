import 'server-only';

import { IApiResponse } from '@/shared/lib/types/api';
import { BACKEND_URL, HEADERS } from '@/shared/lib/constants/api.constant';
import { ApiError } from '@/shared/lib/utils/error.util';
import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';
import { apiRequest } from '@/shared/lib/utils/request.util';

import {
  ICreateNotificationRequest,
  IGetNotificationsParams,
  INotificationResponse,
  INotificationsResponse,
  IPushStatusResponse,
  IPushSubscribeRequest,
  IPushSubscribeResponse,
  IPushUnsubscribeRequest,
  ITestPushResponse,
  IUnreadCountResponse,
  IVapidPublicKeyResponse,
} from '../types/notifications';

/**
 * Authenticated request to the backend `/notifications` resource.
 * Throws a 401 ApiError when there is no session so route handlers can forward it.
 */
async function notificationsRequest<TResponse>(path: string, init: RequestInit = {}) {
  const token = await getNextAuthToken();

  if (!token) {
    throw new ApiError('Unauthorized', 401);
  }

  return apiRequest<TResponse>(`${BACKEND_URL}/notifications${path}`, {
    ...init,
    headers: {
      ...HEADERS.jsonBody,
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
}

// GET /notifications
export function getNotifications({ page = 1, limit = 20 }: IGetNotificationsParams = {}) {
  const searchParams = new URLSearchParams({ page: String(page), limit: String(limit) });

  return notificationsRequest<INotificationsResponse>(`?${searchParams}`);
}

// POST /notifications
export function createNotification(body: ICreateNotificationRequest) {
  return notificationsRequest<INotificationResponse>('', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

// PATCH /notifications/{id}
export function markNotificationRead(notificationId: string) {
  return notificationsRequest<INotificationResponse>(`/${notificationId}`, {
    method: 'PATCH',
    body: JSON.stringify({ isRead: true }),
  });
}

// DELETE /notifications/{id}
export function deleteNotification(notificationId: string) {
  return notificationsRequest<IApiResponse>(`/${notificationId}`, { method: 'DELETE' });
}

// PATCH /notifications/mark-all-read
export function markAllNotificationsRead() {
  return notificationsRequest<IApiResponse>('/mark-all-read', { method: 'PATCH' });
}

// DELETE /notifications/clear-all
export function clearAllNotifications() {
  return notificationsRequest<IApiResponse>('/clear-all', { method: 'DELETE' });
}

// GET /notifications/unread-count
export function getUnreadCount() {
  return notificationsRequest<IUnreadCountResponse>('/unread-count');
}

// GET /notifications/push-status
export function getPushStatus() {
  return notificationsRequest<IPushStatusResponse>('/push-status');
}

// POST /notifications/test-push
export function sendTestPush() {
  return notificationsRequest<ITestPushResponse>('/test-push', { method: 'POST' });
}

// GET /notifications/vapid-public-key
export function getVapidPublicKey() {
  return notificationsRequest<IVapidPublicKeyResponse>('/vapid-public-key');
}

// POST /notifications/subscriptions
export function createPushSubscription(body: IPushSubscribeRequest) {
  return notificationsRequest<IPushSubscribeResponse>('/subscriptions', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

// DELETE /notifications/subscriptions
export function deletePushSubscription(body: IPushUnsubscribeRequest) {
  return notificationsRequest<IApiResponse>('/subscriptions', {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
}
