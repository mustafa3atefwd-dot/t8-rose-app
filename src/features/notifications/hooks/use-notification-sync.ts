'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { NOTIFICATIONS_QUERY_KEYS } from '../lib/constants/notifications.constants';

// Refetch the list and badge whenever the service worker relays an incoming push
export function useNotificationSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type !== 'NEW_NOTIFICATION') {
        return;
      }

      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEYS.all });
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, [queryClient]);
}
