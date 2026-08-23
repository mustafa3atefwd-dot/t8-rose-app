import { DashboardBreadcrumb, DashboardContainer, DashboardSidebar } from '@/features/dashboard/layout';
import { DashboardUserMenu } from '@/features/dashboard/components/dashboard-user-menu';

import { SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Loocale
  const locale = useLocale();

  // Check if locale is rtl
  const isRtl = locale === 'ar';

  return (
    <SidebarProvider>
      {/* Dashboard sidebar */}
      <DashboardSidebar />

      <div className="bg-ds-bg-subtle flex min-h-svh w-full flex-1 flex-col">
        {/* Header */}
        <header className="border-ds-border-muted bg-ds-bg-plain mb-4 flex h-17.5 shrink-0 items-center justify-between border-b px-4 md:hidden">
          {/* Logo & Breadcrumb Wrapper */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <Link href="/dashboard" aria-label="Go to dashboard" className="shrink-0">
              <Image src="/images/logo.svg" alt="Logo" width={60} height={57} fetchPriority="high" />
            </Link>

            {/* Breadcrumb */}
            <DashboardBreadcrumb />
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {/* Dashboard user menu */}
            <DashboardUserMenu />

            {/* Sidebar trigger */}
            <SidebarTrigger />
          </div>
        </header>

        <main className="bg-ds-bg-subtle flex-1">
          {/* Breadcrumb */}
          <DashboardContainer className="border-ds-border-muted bg-ds-bg-plain mb-5 hidden border-b py-6 md:block">
            <DashboardBreadcrumb />
          </DashboardContainer>

          <DashboardContainer>{children}</DashboardContainer>
        </main>
      </div>
    </SidebarProvider>
  );
}
