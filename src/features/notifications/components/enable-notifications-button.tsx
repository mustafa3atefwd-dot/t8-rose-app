'use client';

import { Bell, BellRing, Loader2 } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { usePushNotifications } from '../hooks/use-push-notifications';

export function EnablePushButton() {
  const { pushStatus, isLoading, isError, error, enablePush, isEnabling, enableError } = usePushNotifications();

  /**
   * Checking push status from backend
   */
  if (isLoading) {
    return (
      <Button type="button" disabled className="w-full">
        <Loader2 className="size-4 animate-spin" />
        Checking notifications...
      </Button>
    );
  }

  /**
   * Failed to get push status
   */
  if (isError) {
    console.error('Failed to get push status:', error);

    return <p className="text-destructive text-xs">Failed to check notification status.</p>;
  }

  /**
   * Backend doesn't support Web Push
   *
   * pushConfigured === false
   */
  if (!pushStatus?.pushConfigured) {
    return null;
  }

  /**
   * Already subscribed
   */
  if (pushStatus.subscriptionCount > 0) {
    return (
      <div className="flex items-center gap-2">
        <BellRing className="size-4" />

        <span className="text-xs font-medium">Push notifications enabled</span>
      </div>
    );
  }

  /**
   * Not subscribed yet
   */
  return (
    <div className="space-y-2">
      <Button type="button" onClick={() => enablePush()} disabled={isEnabling} className="w-full">
        {isEnabling ? <Loader2 className="size-4 animate-spin" /> : <Bell className="size-4" />}

        {isEnabling ? 'Enabling...' : 'Enable notifications'}
      </Button>

      {enableError && (
        <p className="text-destructive text-xs">
          {enableError instanceof Error ? enableError.message : 'Failed to enable notifications.'}
        </p>
      )}
    </div>
  );
}
