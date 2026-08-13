import type { ReactNode } from 'react';
import { AccountSidebar } from '@/features/account/layouts/account-sidebar';

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:px-8 lg:py-12">
      <AccountSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </main>
  );
}
