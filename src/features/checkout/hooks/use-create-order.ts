import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import type { ICheckoutFormSchema } from '../lib/types/schemas';
import { PAYMENT_METHOD } from '../lib/constants';
import { toast } from '@/shared/components/ui/toast';
import { ICreateOrderResponse, ICreateCheckoutSessionResponse } from '@/features/orders/lib/types';
import { useAppliedCoupon } from '@/shared/hooks/use-applied-coupon';
import { getAppOrigin } from '@/shared/lib/constants';

/**
 * Opens a Stripe Checkout session for an order and returns its URL, or null
 * when one could not be started.
 */
async function startCheckoutSession(orderId: string | undefined): Promise<string | null> {
  if (!orderId) return null;

  try {
    const origin = getAppOrigin();

    const response = await fetch('/api/payments/checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        successUrl: `${origin}/orders`,
        cancelUrl: `${origin}/checkout`,
      }),
    });

    const data: ICreateCheckoutSessionResponse = await response.json();

    if (!response.ok || !data.status) return null;

    return data.payload?.checkoutUrl ?? null;
  } catch {
    return null;
  }
}

export function useCreateOrder() {
  // Navigation
  const router = useRouter();

  // Query client
  const queryClient = useQueryClient();

  // Applied coupon
  const { clearCoupon } = useAppliedCoupon();

  // Translations
  const t = useTranslations('checkout');

  // Mutation
  const mutation = useMutation({
    mutationFn: async (values: ICheckoutFormSchema) => {
      // Create order API call
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      // Parse response data
      const data: ICreateOrderResponse = await response.json();

      // Check if order created successfully
      if (!response.ok || !data.status) {
        throw new Error(data.message || t('messages.orderFailed'));
      }

      // Return order data
      return data;
    },

    onSuccess: async (data, values) => {
      // The server consumed the cart when it created the order, so drop the
      // cached copy — otherwise the cart badge and /cart keep showing the
      // items the user just bought.
      queryClient.invalidateQueries({ queryKey: ['cart'] });

      // The coupon was spent on this order; leaving it in the shared store
      // would silently re-apply it to the next one.
      clearCoupon();

      // Cash on Delivery
      if (values.paymentMethod === PAYMENT_METHOD.CASH) {
        toast.success(t('messages.orderCreated'));
        router.push('/orders');
        return;
      }

      // Credit Card
      if (values.paymentMethod === PAYMENT_METHOD.CARD) {
        // The order response only carries a session when the backend opened
        // one eagerly. Otherwise the session has to be requested for the new
        // order — treating a missing one as failure strands the buyer on a
        // paid-for order they can never pay for.
        const checkoutUrl =
          data?.payload?.checkout?.checkoutUrl ?? (await startCheckoutSession(data?.payload?.order?.id));

        if (!checkoutUrl) {
          toast.error(t('messages.paymentInitializationFailed'));
          return;
        }

        // Redirect to payment gateway
        window.location.assign(checkoutUrl);
      }
    },

    // Error handler
    onError: (error) => {
      // Cart empty error
      if (error.message === 'Your cart is empty.') {
        toast.error(t('messages.cartEmpty'));
        return;
      }

      // Anything else: show what the backend actually said. A generic message
      // here makes a rejected payload and an expired session look identical.
      toast.error(error.message || t('messages.orderFailed'));
    },
  });

  // Submit handler
  function onSubmit(values: ICheckoutFormSchema) {
    // `couponCode` and `notes` are optional, but react-hook-form initialises
    // them to '' — sending an empty coupon code asks the backend to resolve a
    // coupon that does not exist. Drop them unless the user filled them in.
    const { couponCode, notes, successUrl, cancelUrl, ...rest } = values;

    // The API documents successUrl/cancelUrl as CREDIT_CARD-only, so a cash
    // order must not carry them.
    const isCardPayment = values.paymentMethod === PAYMENT_METHOD.CARD;

    mutation.mutate({
      ...rest,
      ...(couponCode?.trim() ? { couponCode: couponCode.trim() } : {}),
      ...(notes?.trim() ? { notes: notes.trim() } : {}),
      ...(isCardPayment && successUrl ? { successUrl } : {}),
      ...(isCardPayment && cancelUrl ? { cancelUrl } : {}),
    });
  }

  return {
    mutation,
    onSubmit,
  };
}
