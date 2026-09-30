import { IApiResponse } from '@/shared/lib/types/api';
import { HEADERS } from '@/shared/lib/constants/api.constant';
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
 * Client-side calls to the `/api/notifications/*` route handlers,
 * which attach the session token and proxy to the backend.
 */
const BASE_PATH = '/api/notifications';

export function fetchNotifications({ page, limit }: IGetNotificationsParams = {}) {
  const searchParams = new URLSearchParams();
  if (page) searchParams.set('page', String(page));
  if (limit) searchParams.set('limit', String(limit));

  return apiRequest<INotificationsResponse>(`${BASE_PATH}?${searchParams}`);
}

export function postNotification(body: ICreateNotificationRequest) {
  return apiRequest<INotificationResponse>(BASE_PATH, {
    method: 'POST',
    headers: HEADERS.jsonBody,
    body: JSON.stringify(body),
  });
}

export function patchNotificationRead(notificationId: string) {
  return apiRequest<INotificationResponse>(`${BASE_PATH}/${notificationId}`, { method: 'PATCH' });
}

export function removeNotification(notificationId: string) {
  return apiRequest<IApiResponse>(`${BASE_PATH}/${notificationId}`, { method: 'DELETE' });
}

export function patchAllNotificationsRead() {
  return apiRequest<IApiResponse>(`${BASE_PATH}/mark-all-read`, { method: 'PATCH' });
}

export function removeAllNotifications() {
  return apiRequest<IApiResponse>(`${BASE_PATH}/clear-all`, { method: 'DELETE' });
}

export function fetchUnreadCount() {
  return apiRequest<IUnreadCountResponse>(`${BASE_PATH}/unread-count`);
}

export function fetchPushStatus() {
  return apiRequest<IPushStatusResponse>(`${BASE_PATH}/push-status`);
}

export function postTestPush() {
  return apiRequest<ITestPushResponse>(`${BASE_PATH}/test-push`, { method: 'POST' });
}

export function fetchVapidPublicKey() {
  return apiRequest<IVapidPublicKeyResponse>(`${BASE_PATH}/vapid-public-key`);
}

export function postPushSubscription(body: IPushSubscribeRequest) {
  return apiRequest<IPushSubscribeResponse>(`${BASE_PATH}/subscriptions`, {
    method: 'POST',
    headers: HEADERS.jsonBody,
    body: JSON.stringify(body),
  });
}

export function removePushSubscription(body: IPushUnsubscribeRequest) {
  return apiRequest<IApiResponse>(`${BASE_PATH}/subscriptions`, {
    method: 'DELETE',
    headers: HEADERS.jsonBody,
    body: JSON.stringify(body),
  });
}
