'use client';

import { Link } from '@/i18n/navigation';
import { User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/shared/components/ui/skeleton';
import UserDropdown from './user-dropdown';

export default function UnAuthenticatedLogin() {
  const t = useTranslations('home.header');
  const { status } = useSession();
  if (status === 'unauthenticated') {
    return (
      <div className="border-ds-border-soft flex h-13 items-center gap-1.5 border-r p-4 whitespace-nowrap">
        <User />
        <Link href={'auth/login'}>{t('login')}</Link>
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
    <>
      {/* dropdwon menw */}
      <div className="mt-2">
        <UserDropdown />
      </div>
    </>
  );
}
