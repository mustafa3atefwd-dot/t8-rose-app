import React from 'react'
import ReactQueryProvider from './providers/react-query.provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider>
        <ThemeProvider>
        {children}
        <Toaster  />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
      </NextIntlClientProvider>
     
    </ReactQueryProvider>
  );
}
