import { Check, Trash2 } from 'lucide-react';

type NotificationSettingsProps = {
  notificationId: string;
  openSettings: string | null;
  setOpenSettings: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function NotificationSettingsMenu({
  notificationId,
  openSettings,
}: NotificationSettingsProps) {
  if (openSettings !== notificationId) return null;

  return (
    <div className="absolute left-full top-0 ml-2 z-50 w-52 rounded-ds-xl bg-white text-ds-text-plain text-xs font-medium shadow-[0_4px_9px_0_#00000026]">
      <button className="flex w-full p-3 rounded-ds-xl items-center gap-2.5 hover:bg-gray-100 cursor-pointer">
        <Check className="size-4.5 text-zinc-500 dark:text-zinc-400" />
        <span>Mark as read</span>
      </button>

      <button className="flex w-full p-3 rounded-ds-xl items-center gap-2.5 hover:bg-gray-100 cursor-pointer">
        <Trash2 className="size-4.5 text-ds-text-danger" />
        <span>Delete notification</span>
      </button>
    </div>
  );
}