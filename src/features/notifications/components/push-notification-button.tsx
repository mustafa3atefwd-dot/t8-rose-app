'use client';

import { usePushNotifications } from '../hooks/use-push-notifications';

export default function PushNotificationButton() {
  const { pushConfigured, loading } = usePushNotifications();

  if (loading) {
    return null;
  }

  if (!pushConfigured) {
    return null;
  }

  return (
    <button type="button">
      Enable Notifications
    </button>
  );
}