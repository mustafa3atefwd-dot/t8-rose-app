'use client';

import { useSession } from 'next-auth/react';

import NotificationsMenu from './notifications-menu';

// Notifications are per-user, so only mount the menu (and its queries) for signed-in users
export default function NotificationsBell() {
  const { status } = useSession();

  if (status !== 'authenticated') {
    return null;
  }

  return <NotificationsMenu />;
}
