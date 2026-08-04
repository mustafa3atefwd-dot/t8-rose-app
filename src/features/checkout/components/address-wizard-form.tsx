'use client';

import { useTranslations } from 'next-intl';
import { ProgressSteps } from '@/shared/components';
import { useAddressWizardForm, WIZARD_STEPS } from '../hooks';
import { Address } from '../lib/types';
import AddressStep1Fields from './address-step1-fields';
import AddressStep2Map from './address-step2-map';

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
      <ProgressSteps steps={WIZARD_STEPS} currentStep={currentStep} />

      <h3 className="text-base font-semibold">{currentStep === 'details' ? t('add.step1Title') : t('add.step2Title')}</h3>

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
