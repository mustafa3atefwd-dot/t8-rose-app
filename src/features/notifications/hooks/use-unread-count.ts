'use client';

import { useQuery } from '@tanstack/react-query';

interface UnreadCountResponse {
  status: boolean;
  code: number;
  payload: {
    unreadCount: number;
  };
}

export function useUnreadCount() {
  return useQuery<UnreadCountResponse>({
    queryKey: ['notifications', 'unread-count'],

    queryFn: async () => {
      const response = await fetch('/api/notifications/unread-count');

      if (!response.ok) {
        throw new Error('Failed to fetch unread count');
      }

      return response.json();
    },

    refetchInterval: 30_000,

    staleTime: 10_000,
  });
}
