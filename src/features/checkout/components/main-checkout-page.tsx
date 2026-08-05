'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckoutStepper } from '@/features/checkout/components/checkout-stepper';
import { ShippingAddressForm } from './address-selection-form';


export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const handleNextStep = (addressId: string) => {
    setSelectedAddressId(addressId);
    console.log('Proceeding to Step 2 with Address ID:', addressId);
    // When teammate finishes Step 2:
    // router.push(`/checkout/step-2?addressId=${addressId}`);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="space-y-6 lg:col-span-2">
          <CheckoutStepper currentStep={1} totalSteps={2} />

          <h2 className="text-2xl font-bold text-zinc-900">{t('step1Title', { defaultValue: 'Shipping Address' })}</h2>

          <ShippingAddressForm onNext={handleNextStep} />
        </div>

        {/* Placeholder Summary Panel */}
      </div>
    </div>
  );
}
