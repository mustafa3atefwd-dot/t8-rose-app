'use client';

import { MoveRight } from 'lucide-react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { FormError } from '@/shared/components';

import { AddressOption } from './address-option';
import { CheckoutStepHeading } from './checkout-step-heading';
import { EmptyAddressState } from './empty-address-state';
import { IAddress, ICheckoutFormSchema } from '@/features/checkout/lib/types';

interface IShippingAddressFormProps {
  onNext: () => void;
  isLoading: boolean;
  isError: boolean;
  addresses: IAddress[] | undefined;
}

export function ShippingAddressForm({ addresses, isLoading, isError, onNext }: IShippingAddressFormProps) {
  // Translations
  const t = useTranslations('checkout');

  // Form context
  const { control } = useFormContext<ICheckoutFormSchema>();

  // Form state
  const { errors } = useFormState({
    control,
  });

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
    return <EmptyAddressState />;
  }

  return (
    <fieldset className="space-y-4">
      {/* Step heading */}
      <CheckoutStepHeading title={t('shipping.title')} />

      {/* Address options */}
      <Controller
        name="addressId"
        control={control}
        render={({ field }) => (
          <div className="space-y-3">
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

      {/* Next button */}
      <div className="flex justify-end pt-4">
        <Button
          type="button"
          onClick={onNext}
          className="bg-maroon-600 hover:bg-maroon-700 flex w-40 items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium text-white transition-colors"
        >
          {/* Text */}
          {t('actions.next')}

          {/* Icon */}
          <MoveRight className="h-4 w-4" />
        </Button>
      </div>
    </fieldset>
  );
}
