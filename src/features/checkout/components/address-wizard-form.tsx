'use client';

import { useTranslations } from 'next-intl';
import { useAddressWizardForm, WIZARD_STEPS } from '../hooks';
import { Address } from '../lib/types';
import AddressStep1Fields from './address-step1-fields';
import AddressStep2Map from './address-step2-map';
import CheckoutStepper from './checkout-stepper';
import { ArrowLeft } from 'lucide-react';

interface IAddressWizardFormProps {
  mode: 'create' | 'edit';
  address?: Address;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddressWizardForm({ mode, address, onSuccess, onCancel }: IAddressWizardFormProps) {
  const t = useTranslations('address');
  const { form, currentStep, goNext, goBack, setPosition, onSubmit, isPending, pinError } = useAddressWizardForm({
    mode,
    address,
    onSuccess,
  });

  return (
    <div className="flex flex-col gap-4">
      <CheckoutStepper steps={WIZARD_STEPS} currentStep={currentStep} />

      <h3 className="text-ds-bg-primary-saturated text-base font-semibold">
        {currentStep === 'details' ? (
          t('add.step1Title')
        ) : (
          <div className="flex items-center gap-2">
            <button type="button" onClick={goBack} aria-label={t('back')} className="cursor-pointer">
              <ArrowLeft className="text-white bg-ds-bg-primary rounded-full p-1" />
            </button>
            {t('add.step2Title')}
          </div>
        )}
      </h3>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {currentStep === 'details' ? (
          <AddressStep1Fields form={form} onNext={goNext} onCancel={onCancel} />
        ) : (
          <AddressStep2Map
            form={form}
            onBack={goBack}
            onPositionChange={setPosition}
            isPending={isPending}
            pinError={pinError}
            submitLabel={mode === 'create' ? t('addAddress') : t('saveChanges')}
          />
        )}
      </form>
    </div>
  );
}
