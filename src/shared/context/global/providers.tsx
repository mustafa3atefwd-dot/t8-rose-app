import React from 'react'
import ReactQueryProvider from './providers/react-query.provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from '@/shared/components/ui/sonner';
import NextAuthProvider from './providers/Next-Auth.provider';
import PushNotificationProvider from '@/features/notifications/components/push-notification-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <NextAuthProvider>
          <PushNotificationProvider />
            {children}
          <Toaster/>
      </NextAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
    </ReactQueryProvider>
  );
}
