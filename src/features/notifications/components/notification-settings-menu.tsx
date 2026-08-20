'use client';

import { Check, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useUpdateNotification } from '../hooks/use-update-notification';
import { cn } from '@/shared/lib/utils';
import { useDeleteNotification } from '../hooks/use-delete-notification';

type NotificationSettingsProps = {
  settingsRef: React.RefObject<HTMLDivElement | null>;
  notificationId: string;
  notificationIsRead: boolean;
  openSettings: string | null;
  setOpenSettings: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function NotificationSettingsMenu({
  settingsRef,
  notificationId,
  notificationIsRead,
  openSettings,
  setOpenSettings,
}: NotificationSettingsProps) {
  const t = useTranslations('notifications');
  const { mutate: updateNotification, isPending: isUpdatingNotification } = useUpdateNotification();
  const { mutate: deleteNotification, isPending: isDeletingNotification } = useDeleteNotification();
  if (openSettings !== notificationId) return null;

  return (
    <div
      ref={settingsRef}
      role="menu"
      className="rounded-ds-xl border-ds-border-soft bg-ds-bg-plain text-ds-text-plain absolute end-0 top-full z-60 mt-1.5 w-48 overflow-hidden border text-sm font-medium shadow-[0_8px_30px_0_#00000026] sm:w-52"
    >
      <button
        disabled={isDeletingNotification || isUpdatingNotification}
        onClick={() => {
          updateNotification(notificationId);
          setOpenSettings(null);
        }}
        role="menuitem"
        className={cn(
          'hover:bg-ds-bg-muted flex w-full cursor-pointer items-center gap-2.5 p-3 text-start transition-colors',
          notificationIsRead && 'text-ds-text-muted'
        )}
      >
        <Check
          className={cn('size-4.5 text-zinc-500 dark:text-zinc-400', notificationIsRead && 'text-ds-text-muted')}
        />
        <span>{t('markRead')}</span>
      </button>

      <button
        disabled={isDeletingNotification || isUpdatingNotification}
        onClick={() => {
          deleteNotification(notificationId);
          setOpenSettings(null);
        }}
        role="menuitem"
        className="hover:bg-ds-bg-muted border-ds-border-soft flex w-full cursor-pointer items-center gap-2.5 border-t p-3 text-start transition-colors"
      >
        <Trash2 className="text-ds-text-danger size-4.5" />
        <span>{t('delete')}</span>
      </button>
    </div>
  );
}
