'use client';

import { Bell, BellRing, Loader2, Send } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { usePushNotifications } from '../hooks/use-push-notifications';

export function PushNotifications() {
  const { pushStatus, isLoading, enablePush, isEnabling, enableError, testPush, isTesting, testPushError } =
    usePushNotifications();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="size-4 animate-spin" />

        <span className="text-sm">Checking notifications...</span>
      </div>
    );
  }

  /**
   * Push isn't configured on backend.
   *
   * Don't show anything to the user.
   */
  if (!pushStatus?.pushConfigured) {
    return null;
  }

  const isSubscribed = pushStatus.subscriptionCount > 0;

  return (
    <div className="space-y-4">
      {!isSubscribed ? (
        <div className="space-y-2">
          <Button type="button" onClick={() => enablePush()} disabled={isEnabling}>
            {isEnabling ? <Loader2 className="animate-spin" /> : <Bell />}

            {isEnabling ? 'Enabling...' : 'Enable notifications'}
          </Button>

          {enableError && (
            <p className="text-destructive text-sm">
              {enableError instanceof Error ? enableError.message : 'Failed to enable notifications.'}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <BellRing className="size-4" />

            <span>Push notifications are enabled.</span>
          </div>

          <Button type="button" variant="outline" onClick={() => testPush()} disabled={isTesting}>
            {isTesting ? <Loader2 className="animate-spin" /> : <Send />}

            {isTesting ? 'Sending...' : 'Send test notification'}
          </Button>

          {testPushError && (
            <p className="text-destructive text-sm">
              {testPushError instanceof Error ? testPushError.message : 'Failed to send test notification.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
