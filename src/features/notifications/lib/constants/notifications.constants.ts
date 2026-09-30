import { IGetNotificationsParams } from '../types/notifications';

export const NOTIFICATIONS_PAGE_SIZE = 20;

// Every key is nested under `all`, so invalidating `all` refreshes the list, count and push status together
export const NOTIFICATIONS_QUERY_KEYS = {
  all: ['notifications'] as const,
  list: (params: IGetNotificationsParams) => [...NOTIFICATIONS_QUERY_KEYS.all, 'list', params] as const,
  unreadCount: () => [...NOTIFICATIONS_QUERY_KEYS.all, 'unread-count'] as const,
  pushStatus: () => [...NOTIFICATIONS_QUERY_KEYS.all, 'push-status'] as const,
  browserSubscription: () => [...NOTIFICATIONS_QUERY_KEYS.all, 'browser-subscription'] as const,
};
