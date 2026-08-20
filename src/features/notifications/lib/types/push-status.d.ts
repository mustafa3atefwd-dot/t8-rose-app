import { IApiResponse } from '@/shared/lib/types/api';
import { IDocumentFields } from '@/shared/lib/types/base';

/**
 * Push Status Types
 * @description Types for push status
 */
export interface IPushStatusPayload {
  pushConfigured: boolean;
  subscriptionCount: number;
  unreadCount: number;
}

export type IPushStatusResponse = IApiResponse<IPushStatusPayload>;

/**
 * VAPID Public Key Types
 * @description Types for VAPID public key
 */
export interface IVapidPublicKeyPayload {
  publicKey: string;
}

export type IVapidPublicKeyResponse = IApiResponse<IVapidPublicKeyPayload>;

/**
 * Subscription Types
 * @description Types for push subscription
 */
interface Keys {
  p256dh: string;
  auth: string;
}

export interface IPushSubscribeRequest {
  endpoint: string;
  keys: Keys;
}

export interface ISubscription extends Keys, IDocumentFields {
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
 * Test Push Types
 * @description Types for test push
 */
export interface ITestPushPayload {
  message: string;
  subscriptionCount: number;
}

export type ITestPushResponse = IApiResponse<ITestPushPayload>;

/**
 * Unread Count Types
 * @description Types for unread count
 */
export interface IUnreadCountPayload {
  unreadCount: number;
}

export type IUnreadCountResponse = IApiResponse<IUnreadCountPayload>;
