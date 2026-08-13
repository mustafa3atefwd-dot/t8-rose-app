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
        className="flex items-center gap-1.5 p-2  text-sm font-medium text-zinc-700 hover:text-maroon-600 dark:text-zinc-200 cursor-pointer transition-colors"
      >
        <User className="h-5 w-5" />
        <span>{t('login')}</span>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner side="bottom" align="end" sideOffset={12} className="z-50">
          <Popover.Popup className="w-sm p-4 z-50 gap-4 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:bg-zinc-900 dark:border-zinc-800">
            {/* Header Tabs */}
            <div className="flex w-full border-b border-zinc-200 bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700">
              <Button
                type="button"
                className="flex-1 bg-maroon-600 dark:bg-ds-bg-primary-saturated py-3.5 px-4 text-center text-sm font-semibold text-white dark:text-ds-bg-plain"
              >
                Login
              </Button>
              <Button
                type="button"
                onClick={() => router.push('/auth/register')}
                className="flex-1 py-3.5 px-4 text-center text-sm bg-white dark:bg-ds-bg-default font-semibold text-zinc-600 hover:bg-zinc-200/60 transition-colors dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Register
              </Button>
            </div>

            {/* Form */}
            <div className="p-4 ">
              <LoginForm />
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}