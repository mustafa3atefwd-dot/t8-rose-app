'use client';

import { patchAllNotificationsRead } from '../lib/services/notifications.service';
import { useNotificationMutation } from './use-notification-mutation';

export function useMarkAllRead() {
  return useNotificationMutation(patchAllNotificationsRead);
}
