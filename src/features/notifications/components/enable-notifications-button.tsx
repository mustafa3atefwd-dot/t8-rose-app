'use client';

import { Bell, BellOff, BellRing, Loader2, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';

import { usePushNotifications } from '../hooks/use-push-notifications';

export function EnablePushButton() {
  const t = useTranslations('notifications.push');

  const {
    pushSupported,
    pushConfigured,
    isSubscribed,
    isLoading,
    isError,
    enablePush,
    isEnabling,
    disablePush,
    isDisabling,
    testPush,
    isTesting,
  } = usePushNotifications();

  // Nothing to offer when the browser or backend can't do Web Push
  if (!pushSupported || isError || (!isLoading && !pushConfigured)) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="text-ds-text-muted flex items-center gap-2 border-t border-zinc-300 p-4 text-xs dark:border-zinc-600">
        <Loader2 className="size-4 animate-spin" />
        {t('checking')}
      </div>
    );
  }

  if (!isSubscribed) {
    return (
      <div className="border-t border-zinc-300 p-4 dark:border-zinc-600">
        <Button type="button" onClick={() => enablePush()} disabled={isEnabling} className="w-full">
          {isEnabling ? <Loader2 className="size-4 animate-spin" /> : <Bell className="size-4" />}
          {isEnabling ? t('enabling') : t('enable')}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 border-t border-zinc-300 p-4 dark:border-zinc-600">
      <span className="flex items-center gap-2 text-xs font-medium">
        <BellRing className="size-4" />
        {t('enabled')}
      </span>

      <div className="flex items-center gap-1">
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label={t('test')}
          title={t('test')}
          onClick={() => testPush()}
          disabled={isTesting}
        >
          {isTesting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        </Button>

        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label={t('disable')}
          title={t('disable')}
          onClick={() => disablePush()}
          disabled={isDisabling}
        >
          {isDisabling ? <Loader2 className="size-4 animate-spin" /> : <BellOff className="size-4" />}
        </Button>
      </div>
    </div>
  );
}
