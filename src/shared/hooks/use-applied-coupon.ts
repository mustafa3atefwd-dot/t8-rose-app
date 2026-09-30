'use client';

import { useSyncExternalStore } from 'react';
import { createGuestStore } from '../lib/utils/guest-storage.util';

const APPLIED_COUPON_KEY = 'applied_coupon_code';

// The applied coupon has to outlive the cart page: it is entered there but
// only consumed when the order is submitted from /checkout. Keeping it in
// component state loses it on navigation, so it lives in the same
// localStorage-backed store the guest cart uses — which also keeps the cart
// and checkout summaries showing the same coupon.
//
// The store is array-shaped, so a single code is held as a one-element array.
const couponStore = createGuestStore<string>(APPLIED_COUPON_KEY);

export function useAppliedCoupon() {
  const codes = useSyncExternalStore(
    couponStore.subscribe,
    couponStore.getSnapshot,
    couponStore.getServerSnapshot
  );

  return {
    couponCode: codes[0] ?? '',
    applyCoupon: (code: string) => couponStore.save([code]),
    clearCoupon: () => couponStore.save([]),
  };
}
