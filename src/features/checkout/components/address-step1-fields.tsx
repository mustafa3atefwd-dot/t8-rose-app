'use client';

import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { FormField, PhoneFormField } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import { AddressSchema } from '../lib/schemas';

interface IAddressStep1FieldsProps {
  form: UseFormReturn<AddressSchema>;
  onNext: () => void;
  onCancel: () => void;
}

export default function AddressStep1Fields({ form, onNext }: IAddressStep1FieldsProps) {
  const t = useTranslations('address');

  return (
    <div className="flex flex-col gap-4">
      <FormField name="title" control={form.control} label={t('title')} placeholder={t('titlePlaceholder')} />
      <FormField name="city" control={form.control} label={t('city')} placeholder={t('cityPlaceholder')} required />
      <FormField
        name="street"
        control={form.control}
        label={t('details')}
        placeholder={t('detailsPlaceholder')}
        required
      />
      <PhoneFormField name="phone" control={form.control} label={t('phone')} />

      <Button type="button" onClick={onNext} className="mt-5 w-full">
        {t('next')}
      </Button>
    </div>
  );
}
