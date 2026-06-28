import React from 'react'
import { ReactQueryProviders } from './providers/react-query.providers'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextIntlClientProvider } from 'next-intl'
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProviders>
      
      <ReactQueryDevtools initialIsOpen={true} />
      
      <NextIntlClientProvider>
        {children}
      </NextIntlClientProvider>

    </ReactQueryProviders>
  )
}
