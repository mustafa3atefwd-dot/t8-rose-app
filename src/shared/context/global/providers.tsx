import React from 'react'
import ReactQueryProvider from './providers/react-query.provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from '@/shared/components/ui/sonner';
import NextAuthProvider from './providers/next-auth.provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider>
        <ThemeProvider>
          <NextAuthProvider>
        {children}
        <Toaster/>
        </NextAuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
