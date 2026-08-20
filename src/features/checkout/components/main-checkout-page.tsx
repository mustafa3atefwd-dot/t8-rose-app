'use client';

import { useState } from 'react';
import { FormProvider } from 'react-hook-form';

import {
  CheckoutStepper,
  AddressBookModal,
  ShippingAddressForm,
  PaymentMethodForm,
} from '@/features/checkout/components';

import OrderSummary from '@/shared/components/order-summary';

import { CHECKOUT_STEPS, CHECKOUT_STEPS_LIST } from '@/features/checkout/lib/constants';
import { useCheckout } from '@/features/checkout/hooks';
import { IAddress } from '@/features/checkout/lib/types';

export default function CheckoutPage() {
  // Controls the address book modal independently from the checkout form.
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Checkout state and actions.
  const {
    form,
    currentStep,
    addresses,
    isAddressesLoading,
    isAddressesError,
    handleNextStep,
    handleBackStep,
    onSubmit,
    createOrderMutation,
  } = useCheckout();

  // Sync the selected address from the address book with the checkout form.
  const handleSelectAddress = (address: IAddress) => {
    form.setValue('addressId', address.id, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setIsAddressModalOpen(false);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Checkout page container */}
        <div className="container mx-auto max-w-6xl px-4 py-8">
          {/* Checkout page grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Checkout content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Checkout progress indicator */}
              <CheckoutStepper steps={CHECKOUT_STEPS_LIST} currentStep={currentStep} />

              {/* Shipping address step */}
              {currentStep === CHECKOUT_STEPS.SHIPPING && (
                <ShippingAddressForm
                  addresses={addresses}
                  isLoading={isAddressesLoading}
                  isError={isAddressesError}
                  onNext={handleNextStep}
                  onAddAddress={() => setIsAddressModalOpen(true)}
                />
              )}

              {/* Payment method step */}
              {currentStep === CHECKOUT_STEPS.PAYMENT && (
                <PaymentMethodForm isSubmitting={createOrderMutation.isPending} onBack={handleBackStep} />
              )}
            </div>

            {/* Order summary — same breakdown and coupon field as the cart,
                minus the checkout link, since this is the checkout page. */}
            <aside className="h-fit lg:sticky lg:top-8">
              <OrderSummary hideCheckoutButton />
            </aside>
          </div>
        </div>
      </form>

      {/* Address book is kept outside the shipping form
          to avoid mixing its form state with checkout state. */}
      <AddressBookModal
        open={isAddressModalOpen}
        onOpenChange={setIsAddressModalOpen}
        onSelectAddress={handleSelectAddress}
      />
    </FormProvider>
  );
}
