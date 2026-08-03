import React from 'react'
import ReactQueryProvider from './providers/react-query.provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from '@/shared/components/ui/sonner';
import NextAuthProvider from './providers/Next-Auth.provider';
import GuestSyncProvider from './providers/guest-sync-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider>
        <ThemeProvider>
          <NextAuthProvider>
            <GuestSyncProvider>
              {children}
              <Toaster/>
            </GuestSyncProvider>
          </NextAuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
