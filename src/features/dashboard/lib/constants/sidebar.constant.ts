import { LayoutDashboard, Package, LogOut, ClipboardList, CalendarHeart, User } from 'lucide-react';
import { ISidebarLink, ISidebarDropdownItem } from '@/features/dashboard/lib/types/sidebar';

// Dashboard Sidebar Navigation Links
export const DASHBOARD_SIDEBAR_LINKS: ISidebarLink[] = [
  {
    labelKey: 'overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    labelKey: 'categories',
    href: '/dashboard/categories',
    icon: ClipboardList,
  },
  {
    labelKey: 'occasions',
    href: '/dashboard/occasions',
    icon: CalendarHeart,
  },
  {
    labelKey: 'products',
    href: '/dashboard/products',
    icon: Package,
  },
];

// Dashboard Sidebar Dropdown Items
export const DASHBOARD_SIDEBAR_DROPDOWN_ITEMS: ISidebarDropdownItem[] = [
  {
    labelKey: 'account',
    href: '/account',
    icon: User,
    action: 'link',
  },
  {
    labelKey: 'logout',
    icon: LogOut,
    action: 'logout',
  },
];
