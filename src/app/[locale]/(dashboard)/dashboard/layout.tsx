import { DashboardBreadcrumb, DashboardContainer, DashboardSidebar } from '@/features/dashboard/layout';
import { DashboardUserMenu } from '@/features/dashboard/components/dashboard-user-menu';

import { SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { unauthorized } from 'next/navigation';
import DashboardMobileBottomNav from '@/features/dashboard/layout/dashboard-mobile-bottom-nav';
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = null;
  // if (!user) return unauthorized();

  return (
    <SidebarProvider>
      {/* Dashboard sidebar */}
      <DashboardSidebar />

      <div className="bg-ds-bg-subtle flex min-h-svh w-full flex-1 flex-col">
        {/* Mobile Header */}
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

        <main className="bg-ds-bg-subtle flex flex-1 flex-col">
          {/* Desktop Breadcrumb */}
          <DashboardContainer className="border-ds-border-muted bg-ds-bg-plain mb-5 hidden border-b py-6 md:block">
            <DashboardBreadcrumb />
          </DashboardContainer>

          <DashboardContainer className="flex-1">{children}</DashboardContainer>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <DashboardMobileBottomNav />
    </SidebarProvider>
  );
}
