'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { NOTIFICATIONS_QUERY_KEYS } from '../lib/constants/notifications.constants';
import {
  fetchPushStatus,
  fetchVapidPublicKey,
  postPushSubscription,
  postTestPush,
  removePushSubscription,
} from '../lib/services/notifications.service';
import { getBrowserPushSubscription, isPushSupported, subscribeToPush } from '../lib/utils/push.util';

export function usePushNotifications() {
  const t = useTranslations('notifications.push');
  const queryClient = useQueryClient();

  const pushSupported = isPushSupported();

  const refreshPushState = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEYS.pushStatus() }),
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEYS.browserSubscription() }),
    ]);

  const pushStatusQuery = useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEYS.pushStatus(),
    queryFn: fetchPushStatus,
    select: (response) => (response.status ? response.payload : undefined),
    enabled: pushSupported,
    staleTime: 30_000,
  });

  // Backend `subscriptionCount` includes the user's other browsers, so check this one directly
  const browserSubscriptionQuery = useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEYS.browserSubscription(),
    queryFn: async () => (await getBrowserPushSubscription()) !== null,
    enabled: pushSupported,
  });

  const enablePushMutation = useMutation({
    mutationFn: async () => {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        throw new Error(t('permissionDenied'));
      }

      const vapidResponse = await fetchVapidPublicKey();
      const publicKey = vapidResponse.status ? vapidResponse.payload?.publicKey : undefined;

      if (!publicKey) {
        throw new Error(t('unavailable'));
      }

      const subscription = await subscribeToPush(publicKey);

      return postPushSubscription(subscription);
    },
    onSuccess: async () => {
      toast.success(t('enabledToast'));
      await refreshPushState();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const disablePushMutation = useMutation({
    mutationFn: async () => {
      const subscription = await getBrowserPushSubscription();

      if (!subscription) return;

      await removePushSubscription({ endpoint: subscription.endpoint });
      await subscription.unsubscribe();
    },
    onSuccess: async () => {
      toast.success(t('disabledToast'));
      await refreshPushState();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const testPushMutation = useMutation({
    mutationFn: postTestPush,
    onSuccess: () => toast.success(t('testSent')),
    onError: (error: Error) => toast.error(error.message),
  });

  const pushStatus = pushStatusQuery.data;

  return {
    pushSupported,
    pushConfigured: pushStatus?.pushConfigured ?? false,
    isSubscribed: Boolean(browserSubscriptionQuery.data) && (pushStatus?.subscriptionCount ?? 0) > 0,
    isLoading: pushStatusQuery.isLoading || browserSubscriptionQuery.isLoading,
    isError: pushStatusQuery.isError,

    enablePush: enablePushMutation.mutate,
    isEnabling: enablePushMutation.isPending,

    disablePush: disablePushMutation.mutate,
    isDisabling: disablePushMutation.isPending,

    testPush: testPushMutation.mutate,
    isTesting: testPushMutation.isPending,
  };
}
