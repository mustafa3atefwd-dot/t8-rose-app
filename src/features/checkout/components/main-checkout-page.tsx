'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { ShippingAddressForm } from './address-selection-form';
import CheckoutStepper from './checkout-stepper';

// 1. Define steps array
const CHECKOUT_STEPS: CheckoutStep[] = ['address', 'payment', 'confirmation'];
type CheckoutStep = 'address' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  
  // 2. Add state for current step
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const handleNextStep = (addressId: string) => {
    setSelectedAddressId(addressId);
    setCurrentStep('payment'); // Advance stepper to next step
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="space-y-6 lg:col-span-2">
          {/* 3. Pass steps and currentStep props */}
          <CheckoutStepper steps={CHECKOUT_STEPS} currentStep={currentStep} />

          <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white">
            {t('step1Title', { defaultValue: 'Shipping Address' })}
          </h2>

          {currentStep === 'address' && (
            <ShippingAddressForm onNext={handleNextStep} />
          )}
        </div>
      </div>
    </div>
  );
}