'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { MoveRight, Phone, Plus } from 'lucide-react';
import { useUserAddresses } from '../hooks/use-user-addresses';
import { ShippingAddressFormValues, shippingAddressSchema } from '../lib/schemas/shipping-address.schema';
import { AddressSkeleton } from '../skeletons/address-card-skeleton';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/inputs';


interface ShippingAddressFormProps {
  onNext: (addressId: string) => void;
}

export function ShippingAddressForm({ onNext }: ShippingAddressFormProps) {
  const t = useTranslations('checkout');
  const { data, isLoading, isError } = useUserAddresses();

  const addresses = data?.payload?.addresses ?? [];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ShippingAddressFormValues>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      addressId: '',
    },
  });

  {/*Auto-select single or primary address once data loads*/}

  useEffect(() => {
    if (addresses.length > 0) {
      const primary = addresses.find((a) => a.isPrimary) || addresses[0];
      setValue('addressId', primary.id, { shouldValidate: true });
    }
  }, [addresses, setValue]);

  const onSubmit = (formData: ShippingAddressFormValues) => {
    onNext(formData.addressId);
  };

  if (isLoading) return <AddressSkeleton />;

  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        {t('errorLoading', { defaultValue: 'Failed to load addresses.' })}
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-dashed border-zinc-300 p-6 py-12 text-center">
        <p className="font-medium text-zinc-600">
          {t('noAddresses', { defaultValue: 'Add your first address to continue' })}
        </p>
        <Button
          type="button"
          onClick={() => console.log('Static Trigger: Address Modal will be implemented by teammate')}
          className="border-maroon-600 text-maroon-600 hover:bg-maroon-50 inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 font-medium transition-colors"
        >
          <Plus className="h-4 w-4" />
          {t('addAddress', { defaultValue: 'Add a new address' })}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name="addressId"
        control={control}
        render={({ field }) => (
          <div className="space-y-3">
            {addresses.map((address) => {
              const isSelected = field.value === address.id;
              return (
                <label
                  key={address.id}
                  className={`relative flex cursor-pointer  items-center justify-between rounded-2xl border border-zinc-200 dark:border-zinc-600 p-4 transition-all ${
                    isSelected
                      ? 'bg-maroon-600 dark:bg-ds-bg-primary dark:text-zinc-800 text-white shadow-md'
                      : 'border-zinc-200 dark:bg-zinc-700  bg-zinc-50 text-zinc-900 hover:border-zinc-300'
                  }`}
                >
                  <Input
                    type="radio"
                    value={address.id}
                    checked={isSelected}
                    onChange={() => field.onChange(address.id)}
                    className="sr-only"
                  />

                  <div className="space-y-1">
                    <h4 className={`text-2xl font-semibold py-1 px-3 ${isSelected ? 'text-white dark:text-zinc-800' : 'text-zinc-900 dark:text-zinc-100'}`}>
                      {address.title}
                    </h4>
                    <p className={`text-lg font-medium py-1 px-3 ${isSelected ? 'text-zinc-100 dark:text-zinc-800' : 'text-zinc-500 dark:text-zinc-100'}`}>
                      {address.street}, {address.city}
                    </p>
                  </div>

                  <div className="dir-ltr flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        isSelected ? 'text-maroon-600  bg-white' : 'bg-maroon-600 text-white'
                      }`}
                    >
                      <Phone className="h-4 w-4" />
                    </div>
                    <span className={`text-lg font-medium ${isSelected ? 'text-white dark:text-zinc-800' : 'text-zinc-600 dark:text-zinc-100'}`}>
                      {address.phone}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      />
      
      {errors.addressId && <p className="text-sm font-medium text-red-600">{errors.addressId.message}</p>}
      <div className='text-center font-semibold text-lg text-zinc-500 dark:text-white w-full'>OR</div>

      {/* Static "Add a new address" button per request */}
      <div className="pt-2"> 
        <Button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-medium text-maroon-600 transition-colors hover:bg-red-100 dark:bg-ds-bg-primary dark:hover:bg-ds-bg-primary-faint  dark:text-zinc-800"
        >
          <Plus className="h-4 w-4" />
          {t('addAddress', { defaultValue: 'Add a new address' })}
        </Button>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          className="bg-maroon-600 dark:bg-ds-bg-primary dark:hover:bg-ds-bg-primary-faint dark:text-zinc-800 flex w-40 items-center justify-center gap-2 hover:bg-maroon-700 rounded-xl px-4 py-2.5 font-medium text-white transition-colors"
        >
          {t('next', { defaultValue: 'Next →' })}
          <MoveRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
