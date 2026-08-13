'use client';

import { KeyRound, LogOut, UserRound } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';

export function AccountSidebar() {
  const t = useTranslations('account');
  return (
    <aside className="border-ds-border-muted bg-ds-bg-plain flex w-full shrink-0 flex-col rounded-2xl border p-3 shadow-sm lg:min-h-[520px] lg:w-64">
      <h1 className="text-ds-text-plain px-3 py-4 text-xl font-semibold">{t('sidebar.title')}</h1>
      <nav className="flex flex-col gap-1" aria-label={t('sidebar.navigation')}>
        <Link
          href="/account#profile"
          className="bg-ds-bg-primary-fade text-ds-text-primary flex items-center gap-3 rounded-lg px-3 py-3 font-medium"
        >
          <UserRound className="size-4.5" /> {t('sidebar.profile')}
        </Link>
        <Link
          href="/account#password"
          className="text-ds-text-default hover:bg-ds-bg-muted flex items-center gap-3 rounded-lg px-3 py-3"
        >
          <KeyRound className="size-4.5" /> {t('sidebar.password')}
        </Link>
      </nav>
      <Button
        variant="ghost"
        className="text-ds-text-danger hover:bg-ds-bg-danger-fade mt-3 justify-start gap-3 lg:mt-auto"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        <LogOut className="size-4.5" /> {t('sidebar.logout')}
      </Button>
    </aside>
  );
}
