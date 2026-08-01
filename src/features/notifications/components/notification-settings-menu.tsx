import { Check, Trash2 } from 'lucide-react';
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
}: NotificationSettingsProps) {
  const { mutate: updateNotification, isPending: isUpdatingNotification } = useUpdateNotification();
  const { mutate: deleteNotification, isPending: isDeletingNotification } = useDeleteNotification();
  if (openSettings !== notificationId) return null;

  return (
    <div
      ref={settingsRef}
      className="rounded-ds-xl text-ds-text-plain absolute top-0 left-full z-50 ml-2 w-52 bg-white text-sm font-medium shadow-[0_4px_9px_0_#00000026] dark:bg-zinc-700"
    >
      <button
        disabled={isDeletingNotification || isUpdatingNotification}
        onClick={() => updateNotification(notificationId)}
        className={cn(
          'rounded-ds-xl flex w-full cursor-pointer items-center gap-2.5 p-3 hover:bg-gray-100 dark:hover:bg-zinc-900',
          notificationIsRead && 'text-ds-text-muted'
        )}
      >
        <Check
          className={cn('size-4.5 text-zinc-500 dark:text-zinc-400', notificationIsRead && 'text-ds-text-muted')}
        />
        <span>Mark as read</span>
      </button>

      <button
        disabled={isDeletingNotification || isUpdatingNotification}
        onClick={() => deleteNotification(notificationId)}
        className="rounded-ds-xl flex w-full cursor-pointer items-center gap-2.5 p-3 hover:bg-gray-100 dark:hover:bg-zinc-900"
      >
        <Trash2 className="text-ds-text-danger size-4.5" />
        <span>Delete notification</span>
      </button>
    </div>
  );
}
