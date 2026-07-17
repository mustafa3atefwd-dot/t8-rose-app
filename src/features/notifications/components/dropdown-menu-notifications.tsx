'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Bell, BrushCleaning, CheckCheck, EllipsisVertical } from 'lucide-react';
import { useGetNotifications } from '../hooks/use-get-notifications';
import React from 'react';

export default function DropdownMenuNotifications() {
  const {data} = useGetNotifications();
  console.log(data?.payload.data);
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Bell />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-84">
          <DropdownMenuGroup>
            <DropdownMenuLabel className={'bg-ds-bg-primary-saturated text-ds-text-inverse p-4 text-xl font-bold'}>
              Notifications
              <span> ({data?.payload.metadata.total})</span>
            </DropdownMenuLabel>
            <DropdownMenuLabel className={'flex items-center justify-between'}>
              <button type="button" className="flex items-center justify-center gap-1.5">
                <BrushCleaning className="size-4.5" />
                <span>Clear all notifications</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-1.5">
                <CheckCheck className="size-3.75" />
                <span>Mark all as read</span>
              </button>
            </DropdownMenuLabel>
            {data?.payload?.data?.map((notification) => (
              <React.Fragment key={notification.id}> 
              <DropdownMenuSeparator className={'m-0'} />

            <DropdownMenuItem className={'flex h-full flex-col pt-4.5 pb-4'}>
              {/* notification */}
              {/* header */}
              <div className="flex w-full items-center justify-between">
                <h5 className="text-ds-text-plain text-base font-semibold">{notification.title}</h5>
                <EllipsisVertical className="text-ds-text-muted size-5" />
              </div>
              <p className="line-clamp-3">
                {notification.message}
              </p>
            </DropdownMenuItem>
              </React.Fragment>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
