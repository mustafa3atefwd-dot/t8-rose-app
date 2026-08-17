import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import type { ICheckoutFormSchema } from '../lib/types/schemas';
import { PAYMENT_METHOD } from '../lib/constants';
import { toast } from '@/shared/components/ui/toast';
import { ICreateOrderResponse } from '@/features/orders/lib/types';

export function useCreateOrder() {
  // Navigation
  const router = useRouter();

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

    onSuccess: (data, values) => {
      // Cash on Delivery
      if (values.paymentMethod === PAYMENT_METHOD.CASH) {
        toast.success(t('messages.orderCreated'));
        router.push('/orders');
        return;
      }

      // Credit Card
      if (values.paymentMethod === PAYMENT_METHOD.CARD) {
        const checkoutUrl = data?.payload?.checkout?.checkoutUrl;

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

      // Payment initialization error
      toast.error(t('messages.orderFailed'));
    },
  });

  // Submit handler
  function onSubmit(values: ICheckoutFormSchema) {
    mutation.mutate(values);
  }

  return {
    mutation,
    onSubmit,
  };
}
