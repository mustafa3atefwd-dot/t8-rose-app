'use client';

import { MutationFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { NOTIFICATIONS_QUERY_KEYS } from '../lib/constants/notifications.constants';

// Shared behaviour for list mutations: refresh every notifications query, surface failures as a toast
export function useNotificationMutation<TData, TVariables = void>(mutationFn: MutationFunction<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEYS.all }),
    onError: (error: Error) => toast.error(error.message),
  });
}
