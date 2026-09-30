'use client';

import { memo } from 'react';
import Image from 'next/image';
import { usePathname } from '@/i18n/navigation';
import { useSidebarAuth } from '@/features/dashboard/hooks/use-sidebar-auth';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar';
import { cn } from '@/shared/lib/utils';

import { DashboardUserMenu } from '../components/dashboard-user-menu';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { isNavLinkActive } from '@/shared/lib/utils/is-nav-link-active';
import { Button } from '@/shared/components/ui/button';
import { Flower } from 'lucide-react';

function DashboardSidebar() {
  // Loocale
  const locale = useLocale();

  // Translations
  const t = useTranslations('dashboard.sidebar');

  // Pathname
  const pathname = usePathname();

  // Get navigation links
  const { links } = useSidebarAuth();

  // Check if locale is rtl
  const isRtl = locale === 'ar';

  return (
    <Sidebar dir={isRtl ? 'rtl' : 'ltr'} side={isRtl ? 'right' : 'left'} className="bg-ds-bg-plain ltr:font-nunito">
      {/* ===== Sidebar Header (logo & app name) ===== */}
      <SidebarHeader className="px-4 pt-6 pb-4 md:px-8 md:pt-9 md:pb-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard" aria-label="Go to dashboard">
              <Image
                src="/images/logo.svg"
                fetchPriority="high"
                alt="Logo"
                width={120}
                height={112}
                className="mx-auto"
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ===== Sidebar Content (Navigation Links) ===== */}
      <SidebarContent className="px-4 md:px-8">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Button className="font-inter mb-6 h-12.5 w-full font-semibold md:text-base">
                <Link href="/" className="flex items-center gap-2">
                  <Flower className="size-5 shrink-0 md:size-6" />
                  {t('previewWebsite')}
                </Link>
              </Button>
            </SidebarMenuItem>

            {links.map((link) => {
              const Icon = link.icon;

              // Check if current route matches link
              const isActive = isNavLinkActive(link.href, pathname);

              return (
                <SidebarMenuItem key={link.href}>
                  <Link
                    href={link.href}
                    data-active={isActive}
                    className={cn(
                      'rounded-ds-xl mb-3 flex h-fit items-center gap-2.5 p-3 text-base font-bold',
                      'transition-colors duration-200 ease-in-out',
                      'text-ds-text-plain',
                      'hover:text-ds-text-plain/90',
                      'data-active:bg-ds-bg-primary-fade data-active:text-ds-text-primary',
                      'hover:bg-ds-bg-primary-fade/75',
                      'md:mb-4 md:p-3.5 md:text-lg'
                    )}
                  >
                    <Icon className="size-5 shrink-0 md:size-6" />
                    <span>{t(link.labelKey)}</span>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* ===== Sidebar Footer (User info & Dropdown) ===== */}
      <SidebarFooter className="px-4 md:px-8">
        <SidebarMenu>
          <SidebarMenuItem className="border-ds-border-muted border-t pt-4">
            <DashboardUserMenu showUserInfo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default memo(DashboardSidebar);
