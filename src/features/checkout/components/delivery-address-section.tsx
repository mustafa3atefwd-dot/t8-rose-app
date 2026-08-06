'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
// import { MoveRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
// import { Separator } from '@/shared/components/ui/separator';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useAddresses } from '../hooks';
// import { CHECKOUT_STEPS } from '../lib/constants';
import { Address } from '../lib/types';
import AddressBookModal from './address-book-modal';
// import AddressCard from './address-card';
// import CheckoutStepper from './checkout-stepper';

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
    <div className="flex flex-col gap-4">
      {/* <CheckoutStepper steps={CHECKOUT_STEPS} currentStep="address" /> */}

      {isLoading && (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      )}
{/* 
      {!isLoading && addresses.length > 0 && (
        <div className="flex flex-col gap-3">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              selected={address.id === selectedAddress?.id}
              onSelect={() => setSelectedAddress(address)}
            />
          ))}
        </div>
      )} */}

      {!isLoading && addresses.length === 0 && <p className="text-ds-text-muted text-sm">{t('noAddressSelected')}</p>}

      <AddressBookModal open={modalOpen} onOpenChange={setModalOpen} onSelectAddress={setSelectedAddress} />

      {/* <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-ds-text-muted text-xs font-medium uppercase">{t('or')}</span>
        <Separator className="flex-1" />
      </div> */}

      <div className="flex flex-col items-end justify-between gap-5">
        <Button type="button" className="w-full capitalize" variant="secondary" onClick={() => setModalOpen(true)}>
          {t('addNewAddress')}
        </Button>
        {/* <Button className="px-10" size={'lg'}>
          Next <MoveRight />
        </Button> */}
      </div>
    </div>
  );
}
