import React from 'react'
import ReactQueryProvider from './providers/react-query-provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      {children}
      <ReactQueryDevtools initialIsOpen={false}/> 
    </ReactQueryProvider>
  )
}
