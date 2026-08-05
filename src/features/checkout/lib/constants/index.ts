export const ADDRESSES_QUERY_KEY = ['addresses'] as const;

export type CheckoutStep = 'address' | 'payment';
export const CHECKOUT_STEPS: CheckoutStep[] = ['address', 'payment'];
