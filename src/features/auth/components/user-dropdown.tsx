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

export default function UserDropdown() {
  // Translation
  const t = useTranslations('homeHeader.userMenu');

  // Context
  const { data: session } = useSession();

  // Functions
  const handleLogout = () => signOut({ callbackUrl: '/login' });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-1">
        <div className="flex flex-col items-start justify-center -space-y-2">
          <span className="text-ds-text-soft text-xs font-normal">{t('welcome')}</span>
          <h3 className="text-ds-bg-primary-saturated text-base font-medium">{session?.user.firstName}</h3>
        </div>
        <ChevronDown className="text-ds-text-soft mt-1 size-4.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-0 shadow-[0_4px_9px_0_#00000026]">
        <DropdownMenuGroup className="p-1.25">
          <DropdownMenuLabel className="text-ds-bg-primary-saturated px-2 py-1.5 text-sm font-semibold">
            {session?.user.username}
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-0" />
        <DropdownMenuItem>
          <Link href="/account" className="flex items-center gap-2">
            <User className="size-4" />
            <span className="text-sm font-medium">{t('account')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/" className="flex items-center gap-2">
            <MapPinHouse className="size-4" />
            <span className="text-sm font-medium">{t('addresses')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/" className="flex items-center gap-2">
            <ScrollText className="size-4" />
            <span className="text-sm font-medium">{t('order')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-0" />
        <DropdownMenuItem>
          <Link href="/" className="flex items-center gap-2">
            <Settings className="size-4" />
            <span className="text-sm font-medium">{t('dashboard')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-0" />
        <DropdownMenuItem>
          <button type="button" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="size-4" />
            <span className="text-sm font-medium">{t('logout')}</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
