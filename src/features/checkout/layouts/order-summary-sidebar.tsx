'use client';

import { usePathname } from '@/i18n/navigation';
import OrderSummary from '@/shared/components/order-summary';

export default function OrderSummarySidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-ds-border-soft h-fit border-t pt-7 lg:sticky lg:top-8 lg:border-t-0 lg:pt-0">
      <OrderSummary hideCheckoutButton={pathname === '/checkout'} />
    </aside>
  );
}
