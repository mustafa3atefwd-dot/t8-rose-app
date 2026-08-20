'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '@/shared/components/ui/dropdown-menu';
import { ChevronDown, LogOut, MapPinHouse, ScrollText, Settings, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { USER_ROLES } from '@/features/auth/lib/constants/user.constant';

export default function UserDropdown({ compact = false }: { compact?: boolean }) {
  const t = useTranslations('home.header.userMenu');
  const { data: session } = useSession();
  const isAdmin = session?.user.role === USER_ROLES.admin || session?.user.role === USER_ROLES.superAdmin;
  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/login',
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={compact ? t('account') : undefined}
        className={
          compact
            ? 'hover:bg-ds-bg-muted flex size-9 cursor-pointer items-center justify-center rounded-lg'
            : 'flex cursor-pointer items-center gap-1'
        }
      >
        {compact ? (
          <User className="size-5" />
        ) : (
          <>
            <div className="flex cursor-pointer flex-col items-start justify-center -space-y-2">
              <span className="text-xs font-normal text-zinc-500">{t('welcome')}</span>
              <h3 className="text-ds-bg-primary-saturated text-base font-medium">{session?.user.firstName}</h3>
            </div>
            <ChevronDown className="mt-1 size-4.5 text-zinc-500" />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-0 shadow-[0_4px_9px_0_#00000026]">
        <DropdownMenuGroup className={'p-1.25'}>
          <DropdownMenuLabel className={'text-ds-bg-primary-saturated px-2 py-1.5 text-sm font-semibold'}>
            {session?.user.username}
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className={'my-0'} />
        <DropdownMenuItem>
          <Link href="/profile" className="flex items-center gap-2 text-zinc-700 dark:text-zinc-100">
            <User className="size-4" />
            <span className="text-sm font-medium">{t('account')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/addresses" className="flex items-center gap-2 text-zinc-700 dark:text-zinc-100">
            <MapPinHouse className="size-4" />
            <span className="text-sm font-medium">{t('addresses')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/orders" className="flex items-center gap-2 text-zinc-700 dark:text-zinc-100">
            <ScrollText className="size-4" />
            <span className="text-sm font-medium">{t('order')}</span>
          </Link>
        </DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuSeparator className="my-0" />
            <DropdownMenuItem>
              <Link href="/dashboard" className="flex items-center gap-2 text-zinc-700 dark:text-zinc-100">
                <Settings className="size-4" />
                <span className="text-sm font-medium">{t('dashboard')}</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator className={'my-0'} />
        <DropdownMenuItem>
          <button onClick={handleLogout} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-100">
            <LogOut className="size-4" />
            <span className="text-sm font-medium">{t('logout')}</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
