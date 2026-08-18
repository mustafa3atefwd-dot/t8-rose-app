import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { ICheckoutFormSchema } from '../lib/types/schemas';
import type { CheckoutStep } from '../lib/types/checkout';

import { createCheckoutSchema } from '../lib/schemas/checkout.schema';
import { CHECKOUT_STEPS, PAYMENT_METHOD } from '../lib/constants';

import { useShippingAddresses } from './use-shipping-addresses';
import { useCreateOrder } from './use-create-order';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useCart } from '@/shared/hooks/use-cart';
import { useAppliedCoupon } from '@/shared/hooks/use-applied-coupon';
import { getAppOrigin } from '@/shared/lib/constants';

export function useCheckout() {
  // Router
  const router = useRouter();

  // State
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CHECKOUT_STEPS.SHIPPING);

  // Translations
  const t = useTranslations('checkout');

  // Cart
  const { cartItems, isCartReady } = useCart();

  // Coupon applied from the order summary
  const { couponCode: appliedCouponCode } = useAppliedCoupon();

  // There is nothing to check out with an empty cart, and the order API would
  // reject the submission anyway — send the user back to the cart instead.
  //
  // Gated on `isCartReady`, not on a loading flag: the cart starts out as an
  // empty array before the session and server cart resolve, so redirecting on
  // "empty" alone bounces every logged-in user straight back to /cart.
  useEffect(() => {
    if (isCartReady && cartItems.length === 0) {
      router.replace('/cart');
    }
  }, [isCartReady, cartItems.length, router]);

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
      successUrl: `${getAppOrigin()}/orders`,
      cancelUrl: `${getAppOrigin()}/checkout`,
    },
    mode: 'onChange',
  });

  // The coupon is applied in the order summary, which sits outside this form,
  // so mirror it onto the form before submit — otherwise the order goes out
  // with an empty `couponCode` and the discount is never claimed.
  useEffect(() => {
    form.setValue('couponCode', appliedCouponCode);
  }, [appliedCouponCode, form]);

  // Shipping addresses
  const {
    addresses,
    isLoading: isAddressesLoading,
    isError: isAddressesError,
    handleNextStep,
    handleBackStep,
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
    handleBackStep,

    onSubmit,
    createOrderMutation,

    isCartReady,
    cartItems,
  };
}
