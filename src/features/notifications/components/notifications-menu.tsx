'use client';

import {
  Bell,
  BellOff,
  BrushCleaning,
  CheckCheck,
  EllipsisVertical,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

import { useNotificationSync } from '../hooks/use-notification-sync';
import { useGetNotifications } from '../hooks/use-get-notifications';
import { useMarkAllRead } from '../hooks/use-mark-all-read';
import { useDeleteAll } from '../hooks/use-delete-all';
import { useUnreadCount } from '../hooks/use-unread-count';

import NotificationSettingsMenu from './notification-settings-menu';
import { EnablePushButton } from './enable-notifications-button';

import HeaderBadge from '@/shared/components/header-badge';
import { cn } from '@/shared/lib/utils';

export default function NotificationsMenu() {
  const t = useTranslations('notifications');

  useNotificationSync();

  const menuRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState<string | null>(null);

  const { data } = useGetNotifications();

  const hasNotifications = (data?.payload?.data?.length ?? 0) > 0;

  const { data: unreadData } = useUnreadCount();

  const unreadCount = unreadData?.payload?.unreadCount ?? 0;

  const {
    mutate: updateNotifications,
    isPending: isUpdatingNotifications,
  } = useMarkAllRead();

  const {
    mutate: deleteNotifications,
    isPending: isDeletingNotifications,
  } = useDeleteAll();

  // Refs لكل زرار Ellipsis
  const settingsButtonRefs = useRef<
    Record<string, HTMLButtonElement | null>
  >({});

  /**
   * Close menus when clicking outside
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // لو الضغط داخل Notifications Menu
      if (menuRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
      setOpenSettings(null);
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Close settings menu when notifications menu closes
   */
  useEffect(() => {
    if (!open) {
      setOpenSettings(null);
    }
  }, [open]);

  return (
    <div className="relative flex items-center">
      {/* Trigger */}
      <button
        aria-label={t('title')}
        aria-expanded={open}
        className="hover:bg-ds-bg-muted relative flex size-9 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent transition-colors"
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setOpenSettings(null);
        }}
      >
        <Bell className="size-5" />

        {unreadCount > 0 && <HeaderBadge count={unreadCount} />}
      </button>

      {open && (
        <div
          ref={menuRef}
          className="
            bg-ds-bg-plain
            border-ds-border-soft
            absolute
            end-0
            top-full
            z-50
            mt-2
            w-84
            overflow-y-auto
            rounded-xl
            border
            shadow-[0_8px_30px_0_#00000026]

            max-sm:fixed
            max-sm:inset-x-3
            max-sm:top-18
            max-sm:mt-0
            max-sm:max-h-[calc(100dvh-5.5rem)]
            max-sm:w-auto
          "
        >
          {/* Header */}
          <div className="bg-ds-bg-primary-saturated text-ds-text-inverse rounded-t-xl p-4 text-xl font-bold">
            {t('title')}

            {hasNotifications && (
              <span> {data?.payload?.metadata?.total}</span>
            )}
          </div>

          {/* Actions */}
          <div className="text-ds-text-plain flex items-center justify-between p-4 text-xs font-semibold">
            {/* Clear all */}
            <button
              onClick={() => deleteNotifications()}
              disabled={!hasNotifications || isDeletingNotifications}
              type="button"
              className="flex cursor-pointer items-center justify-center gap-1.5 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:dark:text-zinc-500"
            >
              <BrushCleaning
                className={cn(
                  'size-4.5',
                  hasNotifications
                    ? 'text-zinc-500 dark:text-zinc-400'
                    : 'text-zinc-400 dark:text-zinc-500',
                )}
              />

              <span>{t('clearAll')}</span>
            </button>

            {/* Mark all read */}
            <button
              onClick={() => updateNotifications()}
              disabled={!hasNotifications || isUpdatingNotifications}
              type="button"
              className="flex cursor-pointer items-center justify-center gap-1.5 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:dark:text-zinc-500"
            >
              <CheckCheck
                className={cn(
                  'size-4',
                  hasNotifications
                    ? 'text-zinc-500 dark:text-zinc-400'
                    : 'text-zinc-400 dark:text-zinc-500',
                )}
              />

              <span>{t('markAllRead')}</span>
            </button>
          </div>

          {/* Push Notifications */}
          <EnablePushButton />

          {/* Notifications */}
          {!hasNotifications ? (
            <div className="flex h-56 items-center justify-center border-t border-zinc-300 dark:border-zinc-600">
              <div className="flex flex-col items-center gap-2.5 text-zinc-500 dark:text-zinc-400">
                <BellOff className="size-12.5" />

                <p className="text-sm font-medium">
                  {t('empty')}
                </p>
              </div>
            </div>
          ) : (
            data?.payload?.data.map((notification) => (
              <React.Fragment key={notification.id}>
                <div
                  className={cn(
                    'flex flex-col border-t border-zinc-300 px-4 pt-4.5 pb-4 hover:bg-zinc-200 dark:border-zinc-600 dark:hover:bg-zinc-900',
                    notification.isRead &&
                      'bg-zinc-200 dark:bg-zinc-800',
                  )}
                >
                  <div className="flex w-full items-start justify-between gap-3">
                    <h5 className="text-ds-text-plain min-w-0 flex-1 text-base font-semibold">
                      {notification.title}
                    </h5>

                    <div className="shrink-0">
                      <button
                        aria-label={t('settings')}
                        aria-expanded={
                          openSettings === notification.id
                        }
                        ref={(element) => {
                          settingsButtonRefs.current[
                            notification.id
                          ] = element;
                        }}
                        className="hover:bg-ds-bg-muted flex size-8 cursor-pointer items-center justify-center rounded-lg transition-colors"
                        type="button"
                        onClick={() =>
                          setOpenSettings((prev) =>
                            prev === notification.id
                              ? null
                              : notification.id,
                          )
                        }
                      >
                        <EllipsisVertical className="text-ds-text-muted size-5 hover:text-zinc-500" />
                      </button>

                      <NotificationSettingsMenu
                        notificationId={notification.id}
                        notificationIsRead={notification.isRead}
                        openSettings={openSettings}
                        setOpenSettings={setOpenSettings}
                        buttonRef={
                          settingsButtonRefs.current[
                            notification.id
                          ]
                        }
                      />
                    </div>
                  </div>

                  <p className="line-clamp-3 text-xs text-zinc-500 dark:text-zinc-400">
                    {notification.message}
                  </p>
                </div>
              </React.Fragment>
            ))
          )}
        </div>
      )}
    </div>
  );
}