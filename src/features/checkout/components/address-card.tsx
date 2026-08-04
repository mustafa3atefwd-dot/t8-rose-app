'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Address } from '../lib/types';

interface IAddressCardProps {
  address: Address;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export default function AddressCard({ address, onSelect, onEdit, onDelete, isDeleting }: IAddressCardProps) {
  const t = useTranslations('address');
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      className="border-ds-border-soft focus-visible:ring-ds-ring flex cursor-pointer items-start justify-between gap-3 rounded-lg border p-4 outline-none transition-colors focus-visible:ring-3"
    >
      <div className="flex flex-col gap-1">
        <span className="font-medium">{address.title}</span>
        <p className="text-ds-text-muted text-sm">
          {address.street}, {address.city}
        </p>
        <p className="text-ds-text-muted text-sm" dir="ltr">
          {address.phone}
        </p>
      </div>

      {confirmingDelete ? (
        <div
          className="flex shrink-0 flex-wrap items-center justify-end gap-2"
          onClick={(event) => event.stopPropagation()}
        >
          <span className="text-ds-text-danger text-sm">{t('confirmDelete')}</span>
          <Button type="button" variant="destructive" size="sm" disabled={isDeleting} onClick={onDelete}>
            {t('delete')}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => setConfirmingDelete(false)}>
            {t('cancel')}
          </Button>
        </div>
      ) : (
        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={t('edit')}
            onClick={(event) => {
              event.stopPropagation();
              onEdit();
            }}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={t('delete')}
            onClick={(event) => {
              event.stopPropagation();
              setConfirmingDelete(true);
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
