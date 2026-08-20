'use client';

import { usePushStatus } from '../hooks/use-push-status';

export default function EnableNotificationsButton() {
  const { data: pushStatusData, isLoading } = usePushStatus();

  const enablePush = async () => {
    try {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        return;
      }

      const registration = await navigator.serviceWorker.register('/sw.js');

      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.error('Failed to enable push notifications:', error);
    }
  };

  if (isLoading) {
    return null;
  }

  if (pushStatusData?.payload.pushConfigured) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={enablePush}
      className="bg-yellow-500 p-6"
    >
      Enable Notifications
    </button>
  );
}