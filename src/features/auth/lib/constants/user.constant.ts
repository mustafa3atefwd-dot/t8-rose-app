import { MapPinHouse, ScrollText, Settings, User } from 'lucide-react';

/**
 * Application user roles (RBAC)
 * Used for authorization and access control across the app
 */
export const USER_ROLES = {
  user: 'USER',
  admin: 'ADMIN',
  superAdmin: 'SUPER_ADMIN',
} as const;

/**
 * Application user genders
 */
export const USER_GENDERS = {
  male: 'MALE',
  female: 'FEMALE',
} as const;

export const USER_MENU_LINKS = [
  { key: 'account', href: '/profile', icon: User, adminOnly: false, separated: false },
  { key: 'addresses', href: '/checkout', icon: MapPinHouse, adminOnly: false, separated: false },
  { key: 'order', href: '/orders', icon: ScrollText, adminOnly: false, separated: false },
  { key: 'dashboard', href: '/dashboard', icon: Settings, adminOnly: true, separated: true },
] as const;
