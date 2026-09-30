'use client';

import { useQuery } from '@tanstack/react-query';

import { NOTIFICATIONS_PAGE_SIZE, NOTIFICATIONS_QUERY_KEYS } from '../lib/constants/notifications.constants';
import { fetchNotifications } from '../lib/services/notifications.service';

export function useGetNotifications(page = 1) {
  const params = { page, limit: NOTIFICATIONS_PAGE_SIZE };

  return useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEYS.list(params),
    queryFn: () => fetchNotifications(params),
    select: (response) => (response.status ? response.payload : undefined),
  });
}
