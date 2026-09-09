'use client';

import { signOut } from 'next-auth/react';
import { EllipsisVertical } from 'lucide-react';

import { useSidebarAuth } from '@/features/dashboard/hooks/use-sidebar-auth';
import { UserAvatar } from '@/shared/components/user-avatar';
import { cn } from '@/shared/lib/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface IDashboardUserMenuProps {
  showUserInfo?: boolean;
}

export function DashboardUserMenu({ showUserInfo = false }: IDashboardUserMenuProps) {
  // Translation
  const t = useTranslations('dashboard.userMenu');

  // Get user data and dropdown items from sidebar auth
  const { user, dropdownItems } = useSidebarAuth();

  // Get user full name or username
  const userName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username;

  return (
    <DropdownMenu>
      {/* Dropdown menu trigger */}
      <DropdownMenuTrigger
        className={cn(
          'flex cursor-pointer items-center rounded-md transition',
          showUserInfo ? 'hover:bg-ds-bg-secondary-fade w-full gap-2.5 p-2' : 'hover:bg-ds-bg-secondary-fade p-1'
        )}
      >
        {/* User avatar */}
        <UserAvatar size={showUserInfo ? 'md' : 'sm'} />

        {/* Show user info if showUserInfo is true */}
        {showUserInfo && (
          <>
            {/* User name and email */}
            <div className="flex min-w-0 flex-1 flex-col items-start leading-tight">
              <span className="text-ds-text-plain truncate text-sm font-bold">{userName}</span>

              <span className="text-ds-text-muted truncate text-xs font-semibold">{user?.email}</span>
            </div>

            {/* Ellipsis icon */}
            <EllipsisVertical className="text-ds-text-muted ms-auto size-4.5 shrink-0" />
          </>
        )}
      </DropdownMenuTrigger>

      {/* Dropdown menu content */}
      <DropdownMenuContent align="end" className="text-ds-text-plain border-ds-border-subtle w-56 rounded-xl">
        {/* User name */}
        <DropdownMenuItem
          disabled
          className="text-ds-text-primary py-1.5 text-sm font-semibold data-disabled:opacity-100"
        >
          {userName}
        </DropdownMenuItem>

        {dropdownItems.map((item, index) => {
          // Get icon from item
          const Icon = item.icon;

          // Logout action
          if (item.action === 'logout') {
            return (
              <DropdownMenuItem key={index} variant="destructive" onClick={() => signOut({ callbackUrl: '/login' })}>
                <Icon className="size-4" />
                {t(item.labelKey)}
              </DropdownMenuItem>
            );
          }

          // Render other dropdown items as links
          return (
            <DropdownMenuItem key={index}>
              <Link href={item.href ?? '#'} className="flex w-full items-center gap-2 text-sm">
                <Icon className="size-4" />
                {t(item.labelKey)}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
