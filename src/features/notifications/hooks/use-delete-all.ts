'use client';

import { removeAllNotifications } from '../lib/services/notifications.service';
import { useNotificationMutation } from './use-notification-mutation';

export function useDeleteAll() {
  return useNotificationMutation(removeAllNotifications);
}
