'use client';

import { Fragment } from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '@/shared/components/ui/dropdown-menu';
import { ChevronDown, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { USER_MENU_LINKS, USER_ROLES } from '../lib/constants/user.constant';

export default function UserDropdown() {
  // Translation
  const t = useTranslations('home.header.userMenu');

  // Context
  const { data: session } = useSession();
  const isAdmin = session?.user.role === USER_ROLES.admin || session?.user.role === USER_ROLES.superAdmin;
  const menuLinks = USER_MENU_LINKS.filter((item) => !item.adminOnly || isAdmin);

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
        {menuLinks.map(({ key, href, icon: Icon, separated }) => (
          <Fragment key={key}>
            {separated && <DropdownMenuSeparator className="my-0" />}
            <DropdownMenuItem>
              <Link href={href} className="flex size-full items-center gap-2">
                <Icon className="size-4" aria-hidden="true" />
                <span className="text-sm font-medium">{t(key)}</span>
              </Link>
            </DropdownMenuItem>
          </Fragment>
        ))}
        <DropdownMenuSeparator className="my-0" />
        <DropdownMenuItem>
          <button type="button" onClick={handleLogout} className="flex size-full items-center gap-2">
            <LogOut className="size-4" />
            <span className="text-sm font-medium">{t('logout')}</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
