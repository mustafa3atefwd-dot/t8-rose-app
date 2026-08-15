'use client';

import { FormProvider } from 'react-hook-form';

import { CheckoutStepper } from '@/features/checkout/components/checkout-stepper';
import { ShippingAddressForm } from './shipping-address-form';
import { PaymentMethodForm } from './payment-method-form';

import { CHECKOUT_STEPS, CHECKOUT_STEPS_LIST } from '../lib/constants';

import { useCheckout } from '../hooks/use-checkout';

export default function CheckoutPage() {
  // Custom checkout hook
  const {
    form,
    currentStep,
    addresses,
    isAddressesLoading,
    isAddressesError,
    handleNextStep,
    onSubmit,
    createOrderMutation,
  } = useCheckout();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Checkout page container */}
        <div className="container mx-auto max-w-6xl px-4 py-8">
          {/* Checkout page grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Checkout content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Checkout stepper */}
              <CheckoutStepper steps={CHECKOUT_STEPS_LIST} currentStep={currentStep} />

              {/* Shipping address form */}
              {currentStep === CHECKOUT_STEPS.SHIPPING && (
                <ShippingAddressForm
                  addresses={addresses}
                  isLoading={isAddressesLoading}
                  isError={isAddressesError}
                  onNext={handleNextStep}
                />
              )}

              {/* Payment method form */}
              {currentStep === CHECKOUT_STEPS.PAYMENT && (
                <PaymentMethodForm isSubmitting={createOrderMutation.isPending} />
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
