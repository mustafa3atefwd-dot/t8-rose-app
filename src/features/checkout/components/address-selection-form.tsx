'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { MoveRight, Phone, Plus } from 'lucide-react';
import { useUserAddresses } from '../hooks/use-user-addresses';
import { ShippingAddressFormValues, shippingAddressSchema } from '../lib/schemas/shipping-address.schema';
import { AddressSkeleton } from '../skeletons/address-card-skeleton';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/inputs';
import AddressBookModal from './address-book-modal';

interface ShippingAddressFormProps {
  onNext: (addressId: string) => void;
}

export function ShippingAddressForm({ onNext }: ShippingAddressFormProps) {
  // Hooks & Translations

  const t = useTranslations('checkout');
  const { data, isLoading, isError, refetch } = useUserAddresses();


  // State

  const [isOpen, setIsOpen] = useState(false);

  // Data mapping
  const addresses = data?.payload?.addresses ?? [];

  // Form initialization
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


  // Handlers & Callbacks


  // Sync address list when modal closes
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      refetch?.();
    }
  };

  // Update selected address from modal
  const handleSelectAddress = (address: { id: string } | string) => {
    const selectedId = typeof address === 'string' ? address : address?.id;

    if (selectedId) {
      setValue('addressId', selectedId, { shouldValidate: true });
    }
    setIsOpen(false);
  };

  // Form submission handler
  const onSubmit = (formData: ShippingAddressFormValues) => {
    onNext(formData.addressId);
  };


  // Effects


  // Auto-select primary or first address on load
  useEffect(() => {
    if (addresses.length > 0) {
      const primary = addresses.find((a) => a.isPrimary) || addresses[0];
      setValue('addressId', primary.id, { shouldValidate: true });
    }
  }, [addresses, setValue]);


  // Render States (Loading, Error, Empty)

  if (isLoading) return <AddressSkeleton />;

  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        {t('shipping.error')}
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <>
        <EmptyAddressState
          message={t('shipping.empty.title')}
          buttonLabel={t('actions.addAddress')}
          onOpenModal={() => setIsOpen(true)}
        />
        <AddressBookModal
          open={isOpen}
          onOpenChange={handleOpenChange}
          onSelectAddress={handleSelectAddress}
        />
      </>
    );
  }


  // Main Render

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Address List */}
      <Controller
        name="addressId"
        control={control}
        render={({ field }) => (
          <div className="space-y-3">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                isSelected={field.value === address.id}
                onSelect={(id) => field.onChange(id)}
              />
            ))}
          </div>
        )}
      />

      {/* Validation Error */}
      {errors.addressId && (
        <p className="text-sm font-medium text-red-600">{errors.addressId.message}</p>
      )}

      {/* Separator */}
      <div className="before:border-zinc-200 after:border-zinc-200 my-6 flex items-center justify-center gap-4 text-lg font-semibold text-zinc-500 before:flex-1 before:border-t before:content-[''] after:flex-1 after:border-t after:content-[''] dark:text-zinc-400 dark:before:border-zinc-700 dark:after:border-zinc-700">
        {t('or')}
</div>

      {/* Add Address Action */}
      <div className="pt-2">
        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-maroon-600 dark:bg-ds-bg-primary dark:hover:bg-ds-bg-primary-faint flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-medium transition-colors hover:bg-red-100 dark:text-zinc-800"
        >
          <Plus className="h-4 w-4" />
          {t('actions.addAddress')}
        </Button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          className="bg-maroon-600 dark:bg-ds-bg-primary dark:hover:bg-ds-bg-primary-faint hover:bg-maroon-700 flex w-40 items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium text-white transition-colors dark:text-zinc-800"
        >
          {t('actions.next')}
          <MoveRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Modal Component */}
      <AddressBookModal
        open={isOpen}
        onOpenChange={handleOpenChange}
        onSelectAddress={handleSelectAddress}
      />
    </form>
  );
}

/**
 * Empty State view rendered when user has 0 saved addresses.
 */
function EmptyAddressState({
  message,
  buttonLabel,
  onOpenModal,
}: {
  message: string;
  buttonLabel: string;
  onOpenModal: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-dashed border-zinc-300 p-6 py-12 text-center">
      <p className="font-medium text-zinc-600">{message}</p>
      <Button
        type="button"
        onClick={onOpenModal}
        className="border-maroon-600 text-maroon-600 hover:bg-maroon-50 inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 font-medium transition-colors"
      >
        <Plus className="h-4 w-4" />
        {buttonLabel}
      </Button>
    </div>
  );
}

/**
 * Individual Radio Card item representing a user address.
 */
function AddressCard({
  address,
  isSelected,
  onSelect,
}: {
  address: { id: string; title: string; street: string; city: string; phone: string };
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <label
      className={`relative flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all dark:border-zinc-600 ${
        isSelected
          ? 'bg-maroon-600 dark:bg-ds-bg-primary text-white shadow-md dark:text-zinc-800'
          : 'border-zinc-200 bg-zinc-50 text-zinc-900 hover:border-zinc-300 dark:bg-zinc-700'
      }`}
    >
      <Input
        type="radio"
        value={address.id}
        checked={isSelected}
        onChange={() => onSelect(address.id)}
        className="sr-only"
      />

      <div className="space-y-1">
        <h4
          className={`px-3 py-1 text-2xl font-semibold ${
            isSelected ? 'text-white dark:text-zinc-800' : 'text-zinc-900 dark:text-zinc-100'
          }`}
        >
          {address.title}
        </h4>
        <p
          className={`px-3 py-1 text-lg font-medium ${
            isSelected ? 'text-zinc-100 dark:text-zinc-800' : 'text-zinc-500 dark:text-zinc-100'
          }`}
        >
          {address.street}, {address.city}
        </p>
      </div>

      <div className="dir-ltr flex items-center gap-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            isSelected ? 'text-maroon-600 bg-white' : 'bg-maroon-600 text-white'
          }`}
        >
          <Phone className="h-4 w-4" />
        </div>
        <span
          className={`text-lg font-medium ${
            isSelected ? 'text-white dark:text-zinc-800' : 'text-zinc-600 dark:text-zinc-100'
          }`}
        >
          {address.phone}
        </span>
      </div>
    </label>
  );
}