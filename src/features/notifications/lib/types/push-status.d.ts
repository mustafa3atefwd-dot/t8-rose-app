import { IApiResponse } from '@/shared/lib/types/api';

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
 * Push Subscription Types
 * @description Types for push subscription
 */
export interface IPushSubscriptionPayload {
  endpoint: string;
  expirationTime?: number | null;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export type IPushSubscriptionResponse = IApiResponse<IPushSubscriptionPayload>;

/**
 * Subscription Types
 * @description Types for subscription
 */
export interface ISubscription {
  id: string;
  userId: string;
  endpoint: string;
  endpointHash: string;
  p256dh: string;
  auth: string;
  createdAt: string;
  updatedAt: string;
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
