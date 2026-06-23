import React from 'react'
import ReactQueryProvider from './providers/react-query.provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextIntlClientProvider } from 'next-intl'



export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ReactQueryDevtools initialIsOpen={false}/> 
      <NextIntlClientProvider>
          {children}
      </NextIntlClientProvider>
    </ReactQueryProvider>
  )
}
