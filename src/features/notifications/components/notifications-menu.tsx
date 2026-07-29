'use client';

import {
  Bell,
  BellOff,
  BrushCleaning,
  CheckCheck,
  EllipsisVertical,
} from 'lucide-react';
import { useGetNotifications } from '../hooks/use-get-notifications';
import React, { useState } from 'react';
import NotificationSettingsMenu from './notification-settings-menu';
import { Badge } from '@/shared/components/ui/badge';
import HeaderBadge from '@/shared/components/header-badge';

export default function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState<string | null>(null);
  const { data } = useGetNotifications();
  const hasNotifications = (data?.payload?.data?.length ?? 0) > 0;

  return (
    <div className="relative">
      {/* Trigger */}
      <button className='relative' type="button" onClick={() => setOpen((prev) => !prev)}>
        <Bell />
        <HeaderBadge count={77}/>
      </button>

      {open && (
        <div className="absolute -left-75 z-50 mt-2 w-84 overflow-visible rounded-xl shadow-[0_4px_9px_0_#00000026]">
          {/* Header */}
          <div className="bg-ds-bg-primary-saturated text-ds-text-inverse rounded-t-xl p-4 text-xl font-bold">
            Notifications
            {hasNotifications && (<span> {data?.payload.metadata.total}</span>)}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-4 text-ds-text-plain text-xs font-semibold">
            <button
              disabled={!hasNotifications}
              type="button"
              className="flex items-center justify-center gap-1.5 disabled:text-zinc-400 disabled:dark:text-zinc-500"
            >
              {hasNotifications? <BrushCleaning className="size-4.5 text-zinc-500 dark:text-zinc-400" /> : <BrushCleaning className="size-4.5 text-zinc-400 dark:text-zinc-500" />}
              <span>Clear all notifications</span>
            </button>

            <button
               disabled={!hasNotifications}
              type="button"
              className="flex items-center justify-center gap-1.5 disabled:text-zinc-400 disabled:dark:text-zinc-500"
            >
              {hasNotifications? <CheckCheck className="size-3.75 text-zinc-500 dark:text-zinc-400" /> : <BrushCleaning className="size-4.5 text-zinc-400 dark:text-zinc-500" />}
              <span>Mark all as read</span>
            </button>
          </div>

          {/* Notifications */}
          {!hasNotifications? (
            <div className='h-56 flex justify-center items-center border-t border-zinc-300 dark:border-zinc-600'>
              <div className='text-zinc-500 dark:text-zinc-400 flex flex-col items-center gap-2.5'>
                <BellOff className='size-12.5'/>
                <p className='font-medium text-sm'>No notifications to display.</p>
              </div>
            </div>
          ) : 
            
             data?.payload.data.map((notification) => (
            <React.Fragment key={notification.id}>
              <div className="flex flex-col px-4 pt-4.5 pb-4 border-t border-zinc-300 hover:bg-zinc-200 dark:border-zinc-600 dark:hover:bg-zinc-900">
                <div className="flex w-full items-start justify-between">
                  <h5 className="text-ds-text-plain text-base font-semibold">
                    {notification.title}
                  </h5>

                  <div className="relative">
                    <button
                      className='cursor-pointer'
                      type="button"
                      onClick={() =>
                        setOpenSettings((prev) =>
                          prev === notification.id
                            ? null
                            : notification.id
                        )
                      }
                    >
                      <EllipsisVertical className="text-ds-text-muted hover:text-zinc-500 size-5" />
                    </button>

                    <NotificationSettingsMenu
                      notificationId={notification.id}
                      openSettings={openSettings}
                      setOpenSettings={setOpenSettings}
                    />
                  </div>
                </div>

                <p className="line-clamp-3 text-xs text-zinc-500 dark:text-zinc-400">
                  {notification.message}
                </p>
              </div>
            </React.Fragment>
          ))}

          
        </div>
      )}
    </div>
  );
}