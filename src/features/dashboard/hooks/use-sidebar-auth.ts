'use client';

import { useSession } from 'next-auth/react';

import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_DROPDOWN_ITEMS,
} from '@/features/dashboard/lib/constants/sidebar.constant';

import { UserRole } from '@/shared/lib/types/user';

export function useSidebarAuth() {
  // Get session from NextAuth
  const { data: session, status } = useSession();

  const user = session?.user;

  // Get user role
  const role = (session?.user?.role as UserRole) ?? 'USER';

  // Loading state while session is being fetched
  const isLoading = status === 'loading';

  // Admin and Super Admin share the same dashboard navigation
  const links = DASHBOARD_SIDEBAR_LINKS;

  // Admin and Super Admin share the same dropdown items
  const dropdownItems = DASHBOARD_SIDEBAR_DROPDOWN_ITEMS;

  return {
    user,
    role,
    links,
    dropdownItems,
    isLoading,
  };
}
