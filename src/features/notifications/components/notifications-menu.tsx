'use client';

import { Bell, BellOff, BrushCleaning, CheckCheck, EllipsisVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useGetNotifications } from '../hooks/use-get-notifications';
import NotificationSettingsMenu from './notification-settings-menu';
import HeaderBadge from '@/shared/components/header-badge';
import { cn } from '@/shared/lib/utils';
import { useMarkAllRead } from '../hooks/use-mark-all-read';
import { useDeleteAll } from '../hooks/use-delete-all';
import React, { useEffect, useRef, useState } from 'react';

export default function NotificationsMenu() {
  const t = useTranslations('notifications');
  const menuRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState<string | null>(null);
  const { data } = useGetNotifications();
  const hasNotifications = (data?.payload?.data?.length ?? 0) > 0;
  const notificationsCount = data?.payload.data.length ?? 0;
  const { mutate: updateNotifications, isPending: isUpdatingNotifications } = useMarkAllRead();
  const { mutate: deleteNotifications, isPending: isDeletingNotifications } = useDeleteAll();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (openSettings && settingsRef.current && !settingsRef.current.contains(target)) {
        setOpenSettings(null);
        return;
      }

      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openSettings]);

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        className="relative flex cursor-pointer items-center justify-center border-none bg-transparent p-0"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Bell  />
        {notificationsCount > 0 && <HeaderBadge count={notificationsCount} />}
      </button>
      {open && (
        <div
          ref={menuRef}
          className="bg-ds-bg-plain absolute ltr:right-2 rtl:left-2 z-50 mt-2 w-84 overflow-visible rounded-xl shadow-[0_4px_9px_0_#00000026]"
        >
          {/* Header */}
          <div className="bg-ds-bg-primary-saturated text-ds-text-inverse rounded-t-xl p-4 text-xl font-bold">
            {t('title')}
            {hasNotifications && <span> {data?.payload.metadata.total}</span>}
          </div>

          {/* Actions */}
          <div className="text-ds-text-plain flex items-center justify-between p-4 text-xs font-semibold">
            <button
              onClick={() => deleteNotifications()}
              disabled={!hasNotifications || isDeletingNotifications}
              type="button"
              className="flex cursor-pointer items-center justify-center gap-1.5 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:dark:text-zinc-500"
            >
              {hasNotifications ? (
                <BrushCleaning className="size-4.5 text-zinc-500 dark:text-zinc-400" />
              ) : (
                <BrushCleaning className="size-4.5 text-zinc-400 dark:text-zinc-500" />
              )}
              <span>{t('clearAll')}</span>
            </button>

            <button
              onClick={() => updateNotifications()}
              disabled={!hasNotifications || isUpdatingNotifications}
              type="button"
              className="flex cursor-pointer items-center justify-center gap-1.5 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:dark:text-zinc-500"
            >
              {hasNotifications ? (
                <CheckCheck className="size-3.75 text-zinc-500 dark:text-zinc-400" />
              ) : (
                <BrushCleaning className="size-4.5 text-zinc-400 dark:text-zinc-500" />
              )}
              <span>{t('markAllRead')}</span>
            </button>
          </div>

          {/* Notifications */}
          {!hasNotifications ? (
            <div className="flex h-56 items-center justify-center border-t border-zinc-300 dark:border-zinc-600">
              <div className="flex flex-col items-center gap-2.5 text-zinc-500 dark:text-zinc-400">
                <BellOff className="size-12.5" />
                <p className="text-sm font-medium">{t('empty')}</p>
              </div>
            </div>
          ) : (
            data?.payload.data.map((notification) => (
              <React.Fragment key={notification.id}>
                <div
                  className={cn(
                    'flex flex-col border-t border-zinc-300 px-4 pt-4.5 pb-4 hover:bg-zinc-200 dark:border-zinc-600 dark:hover:bg-zinc-900',
                    notification.isRead && 'bg-zinc-200 dark:bg-zinc-800'
                  )}
                >
                  <div className="flex w-full items-start justify-between">
                    <h5 className="text-ds-text-plain text-base font-semibold">{notification.title}</h5>

                    <div className="relative">
                      <button
                        className="cursor-pointer"
                        type="button"
                        onClick={() => setOpenSettings((prev) => (prev === notification.id ? null : notification.id))}
                      >
                        <EllipsisVertical className="text-ds-text-muted size-5 hover:text-zinc-500" />
                      </button>

                      <NotificationSettingsMenu
                        settingsRef={settingsRef}
                        notificationId={notification.id}
                        notificationIsRead={notification.isRead}
                        openSettings={openSettings}
                        setOpenSettings={setOpenSettings}
                      />
                    </div>
                  </div>

                  <p className="line-clamp-3 text-xs text-zinc-500 dark:text-zinc-400">{notification.message}</p>
                </div>
              </React.Fragment>
            ))
          )}
        </div>
      )}
    </div>
  );
}
