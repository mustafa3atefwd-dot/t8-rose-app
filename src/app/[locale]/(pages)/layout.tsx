import type { ReactNode } from 'react';

import { Footer } from '@/features/footer';
import { WishlistProvider } from '@/features/wishlist';
import Header from '@/shared/components/header-page';

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <WishlistProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </WishlistProvider>
  );
}
