'use client';

import { Link, useRouter } from '@/i18n/navigation';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Popover } from '@base-ui/react/popover';
import { LoginForm } from './login-form';
import { Button } from '@/shared/components/ui/button';

export function LoginPopover() {
  const router = useRouter();
  const t = useTranslations('home.header');

  return (
    <Popover.Root>
      {/* Set openOnHover and delays on Trigger instead of Root */}
      <Popover.Trigger
        openOnHover
        delay={150}
        closeDelay={200}
        onClick={() => router.push('/login')}
        className="hover:text-maroon-600 flex cursor-pointer items-center gap-1.5 p-2 text-sm font-medium text-zinc-700 transition-colors dark:text-zinc-200"
      >
        <User className="h-5 w-5" />
        <span>{t('login')}</span>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner side="bottom" align="end" sideOffset={12} className="z-50">
          <Popover.Popup className="z-50 w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            {/* Header Tabs */}
            <div className="flex w-full items-center border-b border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
              <Button
                type="button"
                className="bg-maroon-600 dark:bg-ds-bg-primary-saturated dark:text-ds-bg-plain flex-1 rounded-none px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors"
              >
                {t('login')}
              </Button>
              <Link
                href="/register"
                className="dark:bg-ds-bg-default flex-1 rounded-none bg-white px-4 py-2.5 text-center text-sm font-semibold text-zinc-600 transition-colors hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                {t('register')}
              </Link>
            </div>

            {/* Form */}
            <div className="p-4">
              <LoginForm />
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
