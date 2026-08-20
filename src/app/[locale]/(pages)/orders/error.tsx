'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface OrdersErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function OrdersError({ error, reset }: OrdersErrorProps) {
  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-15.5">
      <div className="container">
        <h1 className="text-ds-text-plain mb-6 text-2xl font-bold lg:text-3xl xl:text-5xl">Orders</h1>

        <div className="flex min-h-100 flex-col items-center justify-center rounded-xl p-4 text-center md:p-6 lg:p-8">
          {/* Icon */}
          <div
            aria-hidden="true"
            className="mb-6 flex size-20 items-center justify-center rounded-full bg-red-50 text-red-500"
          >
            <AlertCircle className="size-9" />
          </div>

          {/* Content */}
          <h2 className="text-ds-text-plain text-2xl font-bold sm:text-3xl">Failed to load orders</h2>

          <p className="text-ds-text-soft mt-3 max-w-md text-sm leading-6 sm:text-base">
            We couldn&apos;t load your orders right now. Please try again.
          </p>

          {/* Retry */}
          <Button type="button" onClick={reset} className="mt-6">
            <RefreshCw className="size-4" />
            Try Again
          </Button>
        </div>
      </div>
    </section>
  );
}
