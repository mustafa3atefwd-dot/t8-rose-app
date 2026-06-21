import React from 'react'
import { ReactQueryProviders } from './providers/react-query.providers'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { NextIntlClientProvider } from 'next-intl'
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProviders>
      
      <TanStackDevtools config={{defaultOpen: false}} />
      
      <NextIntlClientProvider>
        {children}
      </NextIntlClientProvider>

    </ReactQueryProviders>
  )
}
