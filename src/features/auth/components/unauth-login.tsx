'use client';

import { useSession } from 'next-auth/react';
import { Skeleton } from '@/shared/components/ui/skeleton';
import UserDropdown from './user-dropdown';
import { LoginPopover } from './login-popover';


export default function UnAuthenticatedLogin() {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    return (
      <div className="border-ds-border-soft flex h-13 items-center border-r px-2 whitespace-nowrap">
        <LoginPopover />
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="border-ds-border-soft flex h-13 items-center gap-1.5 border-r p-4">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-4 w-14" />
      </div>
    );
  }

  return (
    <div className="mt-2">
      <UserDropdown />
    </div>
  );
}