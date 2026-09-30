'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { cn } from '@/shared/lib/utils';
import { Skeleton } from '@/shared/components/ui/skeleton';

import { AVATAR_SIZE_CLASSES } from '@/shared/lib/constants/user-avatar.constant';
import { getAvatarColor, getUserInitial } from '@/shared/lib/utils/user-avatar.util';

interface IUserAvatarProps {
  size?: keyof typeof AVATAR_SIZE_CLASSES;
  className?: string;
}

export function UserAvatar({ size = 'md', className }: IUserAvatarProps) {
  // Get session data
  const { data: session, status } = useSession();

  // Get avatar size class
  const sizeClass = AVATAR_SIZE_CLASSES[size];

  // Loading state
  if (status === 'loading') {
    return <Skeleton className={cn('shrink-0 rounded-full', sizeClass, className)} />;
  }

  // Get user data
  const user = session?.user;

  // Get user initial
  const initial = getUserInitial(user?.firstName, user?.lastName, user?.username);

  // Get avatar color
  const avatarColor = getAvatarColor(user?.id);

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-bold text-white',
        sizeClass,
        avatarColor,
        className
      )}
    >
      {/* User photo if available */}
      {user?.photo ? (
        <Image src={user.photo} alt={user.username ?? 'User'} fill sizes="48px" className="object-cover" />
      ) : (
        // User initial if photo is not available
        <span aria-hidden="true">{initial}</span>
      )}
    </div>
  );
}
