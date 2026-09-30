'use client';

import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { toast } from '@/shared/components/ui/toast';
import { useUserAddresses, useDeleteAddress } from '@/features/checkout/hooks';
import { IAddress, IAddressListProps } from '@/features/checkout/lib/types';
import { AddressCard } from '@/features/checkout/components';

export default function AddressList({ onSelect, onAdd, onEdit }: IAddressListProps) {
  // Translation
  const t = useTranslations('address');

  // Query
  const { data, isLoading, isError } = useUserAddresses();

  // Mutation
  const deleteMutation = useDeleteAddress();

  // Variables
  const addresses = data?.payload?.addresses ?? [];

  // Functions
  function handleDelete(address: IAddress) {
    deleteMutation.mutate(address.id, {
      onSuccess: () => toast.success(t('deleted')),
    });
  }

  return (
    <div className="">
      {isLoading && (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      )}

      {!isLoading && isError && <p className="text-ds-text-danger text-sm">{t('loadError')}</p>}

      {!isLoading && !isError && addresses.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <p className="font-medium">{t('empty.title')}</p>
          <p className="text-ds-text-muted text-sm">{t('empty.description')}</p>
          <Button type="button" size="sm" onClick={onAdd} className="mt-2 gap-1.5">
            <Plus className="size-4" />
            {t('addAddress')}
          </Button>
        </div>
      )}

      {!isLoading && !isError && addresses.length > 0 && (
        <div className="flex flex-col gap-5">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onSelect={() => onSelect(address)}
              onEdit={() => onEdit(address)}
              onDelete={() => handleDelete(address)}
              isDeleting={deleteMutation.isPending && deleteMutation.variables === address.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
