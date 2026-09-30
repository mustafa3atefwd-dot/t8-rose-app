'use client';

import { patchNotificationRead } from '../lib/services/notifications.service';
import { useNotificationMutation } from './use-notification-mutation';

export function useUpdateNotification() {
  return useNotificationMutation(patchNotificationRead);
}
