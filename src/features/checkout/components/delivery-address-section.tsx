'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useAddresses } from '../hooks';
import { Address } from '../lib/types';
import AddressBookModal from './address-book-modal';

export default function DeliveryAddressSection() {
  const t = useTranslations('address');
  const { data, isLoading } = useAddresses();
  const addresses = useMemo(() => data?.payload.addresses ?? [], [data?.payload.addresses]);

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (addresses.length === 0) {
      // eslint-disable-next-line
      setSelectedAddress(null);
      return;
    }

    const stillExists = selectedAddress && addresses.some((address) => address.id === selectedAddress.id);
    if (stillExists) return;

    const primary = addresses.find((address) => address.isPrimary);
    setSelectedAddress(primary ?? addresses[0]);
  }, [addresses, selectedAddress]);

  return (
    <section className="border-ds-border-soft rounded-lg border p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t('selectedAddressTitle')}</h2>
        <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(true)}>
          {t('manageAddresses')}
        </Button>
      </div>

      {isLoading && <Skeleton className="h-16 w-full" />}

      {!isLoading && selectedAddress && (
        <div className="text-sm">
          <p className="font-medium">{selectedAddress.title}</p>
          <p className="text-ds-text-muted">
            {selectedAddress.street}, {selectedAddress.city}
          </p>
          <p className="text-ds-text-muted" dir="ltr">
            {selectedAddress.phone}
          </p>
        </div>
      )}

      {!isLoading && !selectedAddress && <p className="text-ds-text-muted text-sm">{t('noAddressSelected')}</p>}

      <AddressBookModal open={modalOpen} onOpenChange={setModalOpen} onSelectAddress={setSelectedAddress} />
    </section>
  );
}
