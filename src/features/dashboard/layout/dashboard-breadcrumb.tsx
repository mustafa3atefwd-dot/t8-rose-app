'use client';

import { usePathname } from 'next/navigation';
import { AppBreadcrumb } from '@/shared/layout';
import { getDashboardBreadcrumbItems } from '@/features/dashboard/lib/constants/breadcrumb.config';

export default function DashboardBreadcrumb() {
  // Get current route path
  const pathname = usePathname();

  // Get breadcrumb items based on current route path
  const items = getDashboardBreadcrumbItems(pathname);

  return <AppBreadcrumb items={items} />;
}
