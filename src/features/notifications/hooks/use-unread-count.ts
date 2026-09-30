'use client';

import { useQuery } from '@tanstack/react-query';

import { NOTIFICATIONS_QUERY_KEYS } from '../lib/constants/notifications.constants';
import { fetchUnreadCount } from '../lib/services/notifications.service';

export function useUnreadCount() {
  return useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEYS.unreadCount(),
    queryFn: fetchUnreadCount,
    select: (response) => (response.status ? (response.payload?.unreadCount ?? 0) : 0),
    refetchInterval: 30_000,
    staleTime: 10_000,
  });
}
