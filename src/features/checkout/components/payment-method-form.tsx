'use client';

import Image from 'next/image';
import { Loader2, MoveRight } from 'lucide-react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { FormError } from '@/shared/components';

import type { ICheckoutFormSchema } from '../lib/types/schemas';
import { CheckoutStepHeading } from './checkout-step-heading';
import { PaymentMethodOption } from './payment-method-option';
import { PAYMENT_METHODS_CONFIG } from '../lib/constants';

interface IPaymentMethodFormProps {
  isSubmitting: boolean;
}

export function PaymentMethodForm({ isSubmitting }: IPaymentMethodFormProps) {
  // Translations
  const t = useTranslations('checkout');

  // Form context
  const { control } = useFormContext<ICheckoutFormSchema>();

  // Form state
  const { errors } = useFormState({
    control,
  });

  return (
    <fieldset disabled={isSubmitting} className="space-y-6">
      {/* Step title */}
      <CheckoutStepHeading title={t('payment.title')} />

      {/* Payment method selection */}
      <Controller
        name="paymentMethod"
        control={control}
        render={({ field }) => (
          <div className="grid gap-6 md:grid-cols-2">
            {PAYMENT_METHODS_CONFIG.map((method) => (
              <PaymentMethodOption
                key={method.value}
                id={method.value}
                name={field.name}
                value={method.value}
                checked={field.value === method.value}
                onChange={field.onChange}
                title={t(method.titleKey)}
                description={t(method.descriptionKey)}
                icon={
                  <Image
                    src={method.iconSrc}
                    alt=""
                    width={195}
                    height={195}
                    sizes="(max-width: 640px) 96px, (max-width: 1024px) 140px, 195px"
                    className="h-24 w-24 md:h-32 md:w-32 xl:h-48.75 xl:w-48.75"
                  />
                }
              />
            ))}
          </div>
        )}
      />

      {/* Payment method validation error */}
      {errors.paymentMethod && <FormError message={errors.paymentMethod.message} />}

      {/* Place order button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="flex w-40 items-center justify-center gap-2">
          {/* Place order button text */}
          {isSubmitting ? t('actions.placingOrder') : t('actions.placeOrder')}

          {/* Place order button icon */}
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoveRight className="h-4 w-4" />}
        </Button>
      </div>
    </fieldset>
  );
}
