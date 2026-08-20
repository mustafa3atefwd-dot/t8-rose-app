'use client';

import { usePathname } from '@/i18n/navigation';
import OrderSummary from '@/shared/components/order-summary';

export default function OrderSummarySidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-fit lg:sticky lg:top-8">
      <OrderSummary hideCheckoutButton={pathname === '/checkout'} />
    </aside>
  );
}
