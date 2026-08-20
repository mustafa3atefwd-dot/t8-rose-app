'use client';

import { Check, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useUpdateNotification } from '../hooks/use-update-notification';
import { useDeleteNotification } from '../hooks/use-delete-notification';

import { cn } from '@/shared/lib/utils';

type NotificationSettingsProps = {
  notificationId: string;
  notificationIsRead: boolean;
  openSettings: string | null;
  setOpenSettings: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  buttonRef: HTMLButtonElement | null;
};

export default function NotificationSettingsMenu({
  notificationId,
  notificationIsRead,
  openSettings,
  setOpenSettings,
  buttonRef,
}: NotificationSettingsProps) {
  const t = useTranslations('notifications');

  const {
    mutate: updateNotification,
    isPending: isUpdatingNotification,
  } = useUpdateNotification();

  const {
    mutate: deleteNotification,
    isPending: isDeletingNotification,
  } = useDeleteNotification();

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (openSettings !== notificationId || !buttonRef) {
      return;
    }

    const updatePosition = () => {
      const rect = buttonRef.getBoundingClientRect();

      const menuWidth = window.innerWidth < 640 ? 192 : 208;

      const gap = 8;
      const screenPadding = 8;

      const isRTL =
        document.documentElement.dir === 'rtl';

      /**
       * Desktop:
       *
       * RTL:
       * Settings menu → left of notification button
       *
       * LTR:
       * Settings menu → right of notification button
       */
      let left = isRTL
        ? rect.left - menuWidth - gap
        : rect.right + gap;

      /**
       * If menu goes outside the screen,
       * move it inside the viewport.
       */
      left = Math.max(
        screenPadding,
        Math.min(
          left,
          window.innerWidth -
            menuWidth -
            screenPadding,
        ),
      );

      /**
       * Put the menu aligned with the top
       * of the Ellipsis button.
       */
      let top = rect.top;

      /**
       * Prevent the menu from going below viewport.
       */
      const estimatedMenuHeight = 100;

      if (
        top + estimatedMenuHeight >
        window.innerHeight - screenPadding
      ) {
        top =
          window.innerHeight -
          estimatedMenuHeight -
          screenPadding;
      }

      /**
       * Prevent going above viewport.
       */
      top = Math.max(screenPadding, top);

      setPosition({
        top,
        left,
      });
    };

    updatePosition();

    window.addEventListener(
      'resize',
      updatePosition,
    );

    window.addEventListener(
      'scroll',
      updatePosition,
      true,
    );

    return () => {
      window.removeEventListener(
        'resize',
        updatePosition,
      );

      window.removeEventListener(
        'scroll',
        updatePosition,
        true,
      );
    };
  }, [
    openSettings,
    notificationId,
    buttonRef,
  ]);

  if (openSettings !== notificationId) {
    return null;
  }

  return (
    <div
      role="menu"
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
      }}
      className="
        rounded-ds-xl
        border-ds-border-soft
        bg-ds-bg-plain
        text-ds-text-plain
        z-[60]
        w-48
        overflow-hidden
        border
        text-sm
        font-medium
        shadow-[0_8px_30px_0_#00000026]

        sm:w-52
      "
    >
      {/* Mark as read */}
      <button
        type="button"
        disabled={
          isDeletingNotification ||
          isUpdatingNotification
        }
        onClick={() => {
          updateNotification(notificationId);
          setOpenSettings(null);
        }}
        role="menuitem"
        className={cn(
          'hover:bg-ds-bg-muted flex w-full cursor-pointer items-center gap-2.5 p-3 text-start transition-colors',
          notificationIsRead &&
            'text-ds-text-muted',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
      >
        <Check
          className={cn(
            'size-4.5 text-zinc-500 dark:text-zinc-400',
            notificationIsRead &&
              'text-ds-text-muted',
          )}
        />

        <span>{t('markRead')}</span>
      </button>

      {/* Delete */}
      <button
        type="button"
        disabled={
          isDeletingNotification ||
          isUpdatingNotification
        }
        onClick={() => {
          deleteNotification(notificationId);
          setOpenSettings(null);
        }}
        role="menuitem"
        className="
          hover:bg-ds-bg-muted
          border-ds-border-soft
          flex
          w-full
          cursor-pointer
          items-center
          gap-2.5
          border-t
          p-3
          text-start
          transition-colors
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <Trash2 className="text-ds-text-danger size-4.5" />

        <span>{t('delete')}</span>
      </button>
    </div>
  );
}