'use client';
import { useSession } from 'next-auth/react';
import NotificationsMenu from './notifications-menu';
export default function NotificationsBell() {
    const {status} = useSession();

  return status == 'authenticated' && <NotificationsMenu/>;
}
