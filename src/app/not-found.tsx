import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-full h-screen flex flex-col items-center justify-center">
        <div className='text-center py-10'>
            <h1 className="text-4xl font-bold text-red-400">404 - Not Found</h1>
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              Go back home
            </Link>
        </div>
      </body>
    </html>
  )
}
