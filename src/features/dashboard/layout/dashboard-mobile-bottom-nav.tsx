'use client';

import { memo } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Flower, Plus } from 'lucide-react';

import { useSidebarAuth } from '@/features/dashboard/hooks/use-sidebar-auth';
import { isNavLinkActive } from '@/shared/lib/utils/is-nav-link-active';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';

function DashboardMobileBottomNav() {
  const pathname = usePathname();
  const t = useTranslations('dashboard.sidebar');
  const { links } = useSidebarAuth();

  return (
    <nav
      aria-label="Dashboard navigation"
      className="border-ds-border-muted bg-ds-bg-plain fixed inset-x-0 bottom-0 z-50 border-t p-4 md:hidden"
    >
      <div className="relative grid h-16 grid-cols-4 gap-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = isNavLinkActive(link.href, pathname);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex min-w-0 flex-col items-center justify-center gap-1',
                'rounded-lg px-3 py-1.5',
                'text-xs font-medium',
                'transition-colors duration-200',
                'focus-visible:ring-2 focus-visible:outline-none',
                'focus-visible:ring-ds-text-primary focus-visible:ring-inset',
                isActive ? 'bg-ds-bg-primary-fade text-ds-text-primary' : 'text-ds-text-plain'
              )}
            >
              <Icon aria-hidden="true" className="size-5" strokeWidth={isActive ? 2.25 : 1.8} />

              <span
                className={cn(
                  'text-ds-text-plain font-nunito text-sm leading-none font-bold',
                  isActive && 'text-ds-text-primary'
                )}
              >
                {t(link.labelKey)}
              </span>
            </Link>
          );
        })}

        {/* Center Floating Action Button */}
        <Button
          type="button"
          className="border-ds-bg-subtle focus-visible:ring-ds-text-primary absolute top-0 left-1/2 -mt-4 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 text-ds-text-inverse shadow-md"
        >
          <Flower aria-hidden="true" className="size-6" />
        </Button>
      </div>
    </nav>
  );
}

export default memo(DashboardMobileBottomNav);
