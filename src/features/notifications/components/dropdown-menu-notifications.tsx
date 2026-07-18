'use client';

import {
  Bell,
  BrushCleaning,
  CheckCheck,
  EllipsisVertical,
} from 'lucide-react';
import { useGetNotifications } from '../hooks/use-get-notifications';
import React, { useState } from 'react';
import DropmenuNotificationSettings from './dropmenu-notification-settings';

export default function DropdownMenuNotifications() {
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState<string | null>(null);

  const { data } = useGetNotifications();

  return (
    <div className="relative">
      {/* Trigger */}
      <button type="button" onClick={() => setOpen((prev) => !prev)}>
        <Bell />
      </button>

      {open && (
        <div className="absolute right-50 z-50 mt-2 w-84 overflow-visible rounded-xl border bg-white shadow-lg">
          {/* Header */}
          <div className="bg-ds-bg-primary-saturated text-ds-text-inverse rounded-t-xl p-4 text-xl font-bold">
            Notifications
            <span> ({data?.payload.metadata.total ?? 0})</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-4">
            <button
              type="button"
              className="flex items-center justify-center gap-1.5"
            >
              <BrushCleaning className="size-4.5" />
              <span>Clear all notifications</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-1.5"
            >
              <CheckCheck className="size-3.5" />
              <span>Mark all as read</span>
            </button>
          </div>

          {/* Notifications */}
          {data?.payload.data.map((notification) => (
            <React.Fragment key={notification.id}>
              <hr className="border-ds-border m-0" />

              <div className="flex flex-col px-4 pt-4.5 pb-4">
                <div className="flex w-full items-start justify-between">
                  <h5 className="text-ds-text-plain text-base font-semibold">
                    {notification.title}
                  </h5>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSettings((prev) =>
                          prev === notification.id
                            ? null
                            : notification.id
                        )
                      }
                    >
                      <EllipsisVertical className="text-ds-text-muted size-5" />
                    </button>

                    <DropmenuNotificationSettings
                      notificationId={notification.id}
                      openSettings={openSettings}
                      setOpenSettings={setOpenSettings}
                    />
                  </div>
                </div>

                <p className="line-clamp-3">
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