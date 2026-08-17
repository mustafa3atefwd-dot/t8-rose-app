'use client';

import { MoveRight, Plus } from 'lucide-react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { FormError } from '@/shared/components';

import { CheckoutStepHeading, AddressOption, EmptyAddressState } from '@/features/checkout/components';
import { IAddress, ICheckoutFormSchema } from '@/features/checkout/lib/types';

interface IShippingAddressFormProps {
  onNext: () => void;
  onAddAddress: () => void;
  isLoading: boolean;
  isError: boolean;
  addresses: IAddress[] | undefined;
}

export default function ShippingAddressForm({
  addresses,
  isLoading,
  isError,
  onNext,
  onAddAddress,
}: IShippingAddressFormProps) {
  // Translations
  const t = useTranslations('checkout');

  // Form context
  const { control, setValue } = useFormContext<ICheckoutFormSchema>();

  // Form state
  const { errors } = useFormState({
    control,
  });

  // Modal state

  // Handle address selection from modal
  const handleSelectAddress = (address: IAddress | string) => {
    const addressId = typeof address === 'string' ? address : address.id;

    if (addressId) {
      setValue('addressId', addressId, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-24 animate-pulse rounded-2xl bg-zinc-100" />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return <p className="text-sm text-red-600">{t('shipping.error')}</p>;
  }

  // Empty state
  if (!addresses?.length) {
    return <EmptyAddressState onAddAddress={onAddAddress} />;
  }

  return (
    <>
      <fieldset>
        {/* Step heading */}
        <CheckoutStepHeading title={t('shipping.title')} />

        {/* Address options */}
        <Controller
          name="addressId"
          control={control}
          render={({ field }) => (
            <div className="mt-6 space-y-3">
              {addresses.map((address) => (
                <AddressOption
                  key={address.id}
                  id={address.id}
                  title={address.title}
                  street={address.street}
                  city={address.city}
                  phone={address.phone}
                  checked={field.value === address.id}
                  onChange={() => field.onChange(address.id)}
                />
              ))}
            </div>
          )}
        />

        {/* Address validation error */}
        {errors.addressId && <FormError message={errors.addressId.message} />}

        {/* Add Address Divider */}
        <div className="before:bg-ds-bg-soft text-ds-text-soft relative flex items-center gap-4 py-4.5 text-center text-lg font-semibold before:absolute before:top-1/2 before:h-px before:w-full before:translate-x-0 before:-translate-y-1/2">
          <span className="bg-ds-bg-plain z-5 mx-auto px-4">OR</span>
        </div>

        {/* Add Address Action */}
        <Button
          type="button"
          onClick={onAddAddress}
          className="text-maroon-600 dark:bg-ds-bg-primary dark:hover:bg-ds-bg-primary-faint flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-medium transition-colors hover:bg-red-100 dark:text-zinc-800"
        >
          <Plus className="h-4 w-4" />
          {t('actions.addAddress', { defaultValue: 'Add a new address' })}
        </Button>

        {/* Next button */}
        <div className="flex justify-end pt-10">
          <Button
            type="button"
            onClick={onNext}
            className="bg-maroon-600 hover:bg-maroon-700 flex w-40 items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium text-white transition-colors"
          >
            {t('actions.next')}
            <MoveRight className="size-4 rtl:rotate-180" />
          </Button>
        </div>
      </fieldset>
    </>
  );
}
