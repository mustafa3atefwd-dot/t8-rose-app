'use client';

import { Lock, LogOut, UserRoundPen } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';

export function AccountSidebar() {
  const t = useTranslations('account');
  return (
    <aside className="border-ds-border-muted bg-ds-bg-subtle flex w-full shrink-0 flex-col justify-between rounded-2xl border p-2 sm:p-3 lg:sticky lg:top-24 lg:w-64">
      <nav className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1" aria-label={t('sidebar.navigation')}>
        <Link
          href="/account#profile"
          className="bg-ds-bg-inverse text-ds-text-subtle flex items-center gap-3 rounded-lg px-3 py-3 font-medium"
        >
          <UserRoundPen className="size-6" /> {t('sidebar.profile')}
        </Link>
        <Link
          href=""
          className="text-ds-text-default hover:bg-ds-bg-muted flex items-center gap-3 rounded-lg px-3 py-3"
        >
          <Lock className="size-6" /> {t('sidebar.password')}
        </Link>
      </nav>
      <Button
        variant="ghost"
        className="bg-ds-bg-muted text-ds-text-danger hover:bg-ds-bg-danger-fade mt-2 w-full justify-start gap-3 sm:mt-3"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        <LogOut className="size-5 rotate-180" /> {t('sidebar.logout')}
      </Button>
    </aside>
  );
}
