import { ShoppingBag } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Link } from '@/i18n/navigation';

function OrdersEmpty() {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center rounded-xl p-4 text-center md:p-6 xl:p-8">
      {/* Icon */}
      <div
        aria-hidden="true"
        className="bg-ds-bg-muted text-ds-text-soft mb-6 flex size-20 items-center justify-center rounded-full"
      >
        <ShoppingBag className="size-9" />
      </div>

      {/* Content */}
      <h2 className="text-ds-text-plain text-2xl font-bold sm:text-3xl">You haven&apos;t placed any orders yet</h2>

      <p className="text-ds-text-soft mt-3 max-w-md text-sm leading-6 sm:text-base">
        Once you place an order, you&apos;ll be able to track and manage it right here.
      </p>

      {/* Action */}
      <Button asChild className="mt-6">
        <Link href="/products">Start Shopping</Link>
      </Button>
    </div>
  );
}

export default OrdersEmpty;