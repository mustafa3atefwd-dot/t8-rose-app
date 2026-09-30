import { IApiResponse } from '@/shared/lib/types/api';
import { IDocumentFields } from '@/shared/lib/types/base';

/**
 * Notification
 * @description Shape of a single notification — GET /notifications
 */
export type NotificationType = 'ORDER' | 'PROMOTION' | (string & {});

export interface INotification extends IDocumentFields {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link: string;
}

export interface IPaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * List
 * @description GET /notifications
 */
export interface IGetNotificationsParams {
  page?: number;
  limit?: number;
}

export interface INotificationsPayload {
  data: INotification[];
  metadata: IPaginationMetadata;
}

export type INotificationsResponse = IApiResponse<INotificationsPayload>;

/**
 * Create
 * @description POST /notifications
 */
export type ICreateNotificationRequest = Pick<INotification, 'type' | 'title' | 'message'> &
  Partial<Pick<INotification, 'userId' | 'link'>>;

export interface INotificationPayload {
  notification: INotification;
}

export type INotificationResponse = IApiResponse<INotificationPayload>;

/**
 * Unread count
 * @description GET /notifications/unread-count
 */
export interface IUnreadCountPayload {
  unreadCount: number;
}

export type IUnreadCountResponse = IApiResponse<IUnreadCountPayload>;

/**
 * Push status
 * @description GET /notifications/push-status
 */
export interface IPushStatusPayload {
  pushConfigured: boolean;
  subscriptionCount: number;
  unreadCount: number;
}

export type IPushStatusResponse = IApiResponse<IPushStatusPayload>;

/**
 * VAPID public key
 * @description GET /notifications/vapid-public-key
 */
export interface IVapidPublicKeyPayload {
  publicKey: string;
}

export type IVapidPublicKeyResponse = IApiResponse<IVapidPublicKeyPayload>;

/**
 * Push subscriptions
 * @description POST | DELETE /notifications/subscriptions
 */
interface IPushKeys {
  p256dh: string;
  auth: string;
}

export interface IPushSubscribeRequest {
  endpoint: string;
  keys: IPushKeys;
}

export interface IPushUnsubscribeRequest {
  endpoint: string;
}

export interface ISubscription extends IPushKeys, IDocumentFields {
  id: string;
  userId: string;
  endpoint: string;
  endpointHash: string;
}

export interface IPushSubscribePayload {
  subscription: ISubscription;
}

export type IPushSubscribeResponse = IApiResponse<IPushSubscribePayload>;

/**
 * Test push
 * @description POST /notifications/test-push
 */
export interface ITestPushPayload {
  message: string;
  subscriptionCount: number;
}

export type ITestPushResponse = IApiResponse<ITestPushPayload>;
