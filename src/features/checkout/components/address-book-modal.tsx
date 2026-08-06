'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Address } from '../lib/types';
import AddressList from './address-list';
import AddressWizardForm from './address-wizard-form';

type ModalView = { view: 'list' } | { view: 'form'; mode: 'create' | 'edit'; address?: Address };

interface IAddressBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAddress: (address: Address) => void;
}

export default function AddressBookModal({ open, onOpenChange, onSelectAddress }: IAddressBookModalProps) {
  const t = useTranslations('address');
  const [modalView, setModalView] = useState<ModalView>({ view: 'list' });

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setModalView({ view: 'list' });
    }
    onOpenChange(nextOpen);
  }

  function handleSelect(address: Address) {
    onSelectAddress(address);
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="border-b-ds-border-soft flex-row items-center justify-between gap-3 border-b pb-4 text-start">
          <DialogTitle>
            {modalView.view === 'list'
              ? t('modal.title')
              : modalView.mode === 'create'
                ? t('addNewAddress')
                : t('editAddress')}
          </DialogTitle>
          {modalView.view === 'list' && (
            <Button
              type="button"
              variant={'secondary'}
              size="sm"
              onClick={() => setModalView({ view: 'form', mode: 'create' })}
              className="gap-1.5 capitalize"
            >
              {t('addNewAddress')}
            </Button>
          )}
        </DialogHeader>

        {modalView.view === 'list' ? (
          <AddressList
            onSelect={handleSelect}
            onAdd={() => setModalView({ view: 'form', mode: 'create' })}
            onEdit={(address) => setModalView({ view: 'form', mode: 'edit', address })}
          />
        ) : (
          <AddressWizardForm
            mode={modalView.mode}
            address={modalView.address}
            onSuccess={() => setModalView({ view: 'list' })}
            onCancel={() => setModalView({ view: 'list' })}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
