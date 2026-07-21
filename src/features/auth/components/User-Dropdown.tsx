'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup
} from '@/shared/components/ui/dropdown-menu';
import { ChevronDown, LogOut, MapPinHouse, ScrollText, Settings, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function UserDropdown() {
  const t = useTranslations('homeHeader.userMenu');
  const {status, data:session} = useSession();
  const handleLogout = async () => {
  await signOut({
    callbackUrl: '/login',
  });
};
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={'flex items-center gap-1 cursor-pointer'}>
        <div className='flex flex-col items-start justify-center -space-y-2 cursor-pointer'>
            <span className='text-zinc-500 text-xs font-normal'>Hello</span>
            <h3 className='text-ds-bg-primary-saturated font-medium text-base'>{session?.user.firstName}</h3>
        </div>
        <ChevronDown className='text-zinc-500 size-4.5 mt-1'/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 shadow-[0_4px_9px_0_#00000026] border-0">
        <DropdownMenuGroup className={'p-1.25'}>
          <DropdownMenuLabel className={'text-ds-bg-primary-saturated font-semibold text-sm py-1.5 px-2'}>
             {session?.user.username}
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className={'my-0'}/>
        <DropdownMenuItem>
          <Link href={'/'} className='text-zinc-700 dark:text-zinc-100 flex items-center gap-2'>
           <User className='size-4'/>
           <span className='font-medium text-sm'>{t('account')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={'/'} className='text-zinc-700 dark:text-zinc-100 flex items-center gap-2'>
           <MapPinHouse className='size-4'/>
           <span className='font-medium text-sm'>{t('addresses')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={'/'} className='text-zinc-700 dark:text-zinc-100 flex items-center gap-2'>
           <ScrollText className='size-4'/>
           <span className='font-medium text-sm'>{t('order')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className={'my-0'}/>
        <DropdownMenuItem>
          <Link href={'/'} className='text-zinc-700 dark:text-zinc-100 flex items-center gap-2'>
           <Settings className='size-4'/>
           <span className='font-medium text-sm'>{t('dashboard')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className={'my-0'}/>
        <DropdownMenuItem>
          <button onClick={handleLogout} className='text-zinc-700 dark:text-zinc-100 flex items-center gap-2'>
           <LogOut className='size-4'/>
           <span className='font-medium text-sm'>{t('logout')}</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}