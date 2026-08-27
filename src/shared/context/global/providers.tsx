import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TooltipProvider } from '@/shared/components/ui/tooltip';
import { NextIntlClientProvider } from 'next-intl';
import { WishlistProvider } from '@/features/wishlist/context/wishlist-provider';
import { Toaster } from '@/shared/components/ui/sonner';
import ReactQueryProvider from './providers/react-query.provider';
import { ThemeProvider } from './providers/theme-provider';
import NextAuthProvider from './providers/Next-Auth.provider';
import GuestSyncProvider from './providers/guest-sync-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider>
        <ThemeProvider>
          <TooltipProvider>
            <NextAuthProvider>
              <WishlistProvider>
                <GuestSyncProvider>
                  {children}
                  <Toaster />
                </GuestSyncProvider>
              </WishlistProvider>
            </NextAuthProvider>
          </TooltipProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </ThemeProvider>
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
