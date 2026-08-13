import type { ReactNode } from 'react';
import { AccountSidebar } from '@/features/account/layouts/account-sidebar';

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:flex-col lg:px-8 lg:py-12">
      <h1 className="text-ds-text-plain text-5xl capitalize font-bold">account settings</h1>
      <div className="flex items-stretch justify-start gap-6">
        <AccountSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  );
}
