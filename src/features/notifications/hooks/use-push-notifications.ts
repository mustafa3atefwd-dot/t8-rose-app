'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createPushSubscription,
  getPushStatus,
  getVapidPublicKey,
  sendTestPush,
} from '@/features/notifications/lib/apis/push-status.api';

import { isPushSupported, subscribeToPush } from '@/features/notifications/lib/utils/push.util';

const PUSH_STATUS_QUERY_KEY = ['notifications', 'push-status'];

export function usePushNotifications() {
  const queryClient = useQueryClient();

  /**
   * Check browser support
   */
  const pushSupported = isPushSupported();

  /**
   * Get push status from backend
   */
  const pushStatusQuery = useQuery({
    queryKey: PUSH_STATUS_QUERY_KEY,

    queryFn: async () => {
      console.log('Fetching push status...');

      const result = await getPushStatus();

      console.log('Push status response:', result);

      return result;
    },

    enabled: pushSupported,

    staleTime: 30_000,
  });

  /**
   * Enable push
   */
  const enablePushMutation = useMutation({
    mutationFn: async () => {
      console.log('Starting push subscription...');

      /**
       * 1. Request browser permission
       */
      const permission = await Notification.requestPermission();

      console.log('Notification permission:', permission);

      if (permission !== 'granted') {
        throw new Error(`Notification permission: ${permission}`);
      }

      /**
       * 2. Get VAPID public key
       */
      console.log('Getting VAPID public key...');

      const vapidResponse = await getVapidPublicKey();

      console.log('VAPID response:', vapidResponse);

      const publicKey = vapidResponse.payload?.publicKey;

      if (!publicKey) {
        throw new Error('VAPID public key is not available.');
      }

      /**
       * 3. Create browser subscription
       */
      console.log('Creating browser push subscription...');

      const subscription = await subscribeToPush(publicKey);

      console.log('Browser subscription:', subscription);

      /**
       * 4. Save subscription in backend
       */
      console.log('Saving subscription to backend...');

      const result = await createPushSubscription(subscription);

      console.log('Subscription saved:', result);

      return result;
    },

    onSuccess: async () => {
      console.log('Push subscription completed successfully.');

      await queryClient.invalidateQueries({
        queryKey: PUSH_STATUS_QUERY_KEY,
      });
    },
  });

  /**
   * Test push
   */
  const testPushMutation = useMutation({
    mutationFn: async () => {
      console.log('Sending test push...');

      const result = await sendTestPush();

      console.log('Test push response:', result);

      return result;
    },
  });

  return {
    /**
     * Browser
     */
    pushSupported,

    /**
     * Backend status
     */
    pushStatus: pushStatusQuery.data?.payload,

    isLoading: pushStatusQuery.isLoading,

    isError: pushStatusQuery.isError,

    error: pushStatusQuery.error,

    refetchPushStatus: pushStatusQuery.refetch,

    /**
     * Enable push
     */
    enablePush: enablePushMutation.mutateAsync,

    isEnabling: enablePushMutation.isPending,

    enableError: enablePushMutation.error,

    /**
     * Test push
     */
    testPush: testPushMutation.mutateAsync,

    isTesting: testPushMutation.isPending,

    testPushError: testPushMutation.error,
  };
}
