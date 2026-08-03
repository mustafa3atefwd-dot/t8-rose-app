'use client';

import { useQuery } from '@tanstack/react-query';
import { NotificationsResponse } from '../lib/types/notifications';

export function useGetNotifications() {
  return useQuery<NotificationsResponse>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await fetch('/api/notifications');

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      return response.json();
    },
  });
}