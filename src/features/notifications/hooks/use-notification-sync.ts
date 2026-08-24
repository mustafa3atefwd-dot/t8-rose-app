'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

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

      console.log(
        'New notification received:',
        event.data.notification
      );

      // Refresh notifications list
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });

      // Refresh unread count
      queryClient.invalidateQueries({
        queryKey: ['notifications', 'unread-count'],
      });
    };

    navigator.serviceWorker.addEventListener(
      'message',
      handleMessage
    );

    return () => {
      navigator.serviceWorker.removeEventListener(
        'message',
        handleMessage
      );
    };
  }, [queryClient]);
}