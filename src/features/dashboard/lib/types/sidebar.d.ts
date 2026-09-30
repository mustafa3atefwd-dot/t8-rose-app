import { LucideIcon } from 'lucide-react';

// Sidebar Link Interface
export interface ISidebarLink {
  labelKey: string;
  href: string;
  icon: LucideIcon;
  onClick?: () => void;
}

// Sidebar Dropdown Item Interface
export type ISidebarDropdownItem = {
  labelKey: string;
  href?: string;
  icon: LucideIcon;
  variant?: 'default' | 'destructive';
  action?: 'link' | 'logout';
};
