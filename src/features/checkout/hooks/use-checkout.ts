import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { ICheckoutFormSchema } from '../lib/types/schemas';
import type { CheckoutStep } from '../lib/types/checkout';

import { createCheckoutSchema } from '../lib/schemas/checkout.schema';
import { CHECKOUT_STEPS, PAYMENT_METHOD } from '../lib/constants';

import { useShippingAddresses } from './use-shipping-addresses';
import { useCreateOrder } from './use-create-order';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCart } from '@/shared/hooks/use-cart';

export function useCheckout() {
  // Router
  const router = useRouter();

  // State
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CHECKOUT_STEPS.SHIPPING);

  // Translations
  const t = useTranslations('checkout');

  // Cart
  const { cartItems, isLoading: isCartLoading } = useCart();

  // Redirect if cart is empty
  useEffect(() => {
    if (!isCartLoading && cartItems.length === 0) {
      router.replace('/cart');
    }
  }, [isCartLoading, cartItems.length, router]);

  // Validation schema
  const schema = useMemo(() => createCheckoutSchema(t), [t]);

  // Form
  const form = useForm<ICheckoutFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      addressId: '',
      paymentMethod: PAYMENT_METHOD.CASH,
      couponCode: '',
      notes: '',
      successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/orders`,
    },
    mode: 'onChange',
  });

  // Shipping addresses
  const {
    addresses,
    isLoading: isAddressesLoading,
    isError: isAddressesError,
    handleNextStep,
  } = useShippingAddresses({
    methods: form,
    setCurrentStep,
  });

  // Create order
  const { mutation: createOrderMutation, onSubmit } = useCreateOrder();

  return {
    form,

    currentStep,

    addresses,
    isAddressesLoading,
    isAddressesError,

    handleNextStep,

    onSubmit,
    createOrderMutation,

    isCartLoading,
    cartItems,
  };
}
