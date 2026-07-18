import { Check, Trash } from 'lucide-react';

type NotificationSettingsProps = {
  notificationId: string;
  openSettings: string | null;
  setOpenSettings: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function DropmenuNotificationSettings({
  notificationId,
  openSettings,
}: NotificationSettingsProps) {
  if (openSettings !== notificationId) return null;

  return (
    <div className="absolute left-full top-0 ml-2 z-50 w-52 rounded-ds-xl bg-white p-3 shadow-lg">
      <button className="flex w-full items-center gap-2.5 rounded-md py-2 hover:bg-gray-100">
        <Check className="size-4" />
        <span>Mark as read</span>
      </button>

      <button className="flex w-full items-center gap-2.5 rounded-md py-2 hover:bg-gray-100">
        <Trash className="size-4" />
        <span>Delete notification</span>
      </button>
    </div>
  );
}