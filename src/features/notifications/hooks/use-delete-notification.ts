'use client';

import { removeNotification } from '../lib/services/notifications.service';
import { useNotificationMutation } from './use-notification-mutation';

export function useDeleteNotification() {
  return useNotificationMutation(removeNotification);
}
