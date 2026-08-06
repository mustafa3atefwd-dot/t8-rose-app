'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { MapPin, PenLine, Phone, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Address } from '../lib/types';
import DeleteModal from './delete-modal';

interface IAddressCardProps {
  address: Address;
  onSelect: () => void;
  selected?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

export default function AddressCard({
  address,
  onSelect,
  selected = false,
  onEdit,
  onDelete,
  isDeleting = false,
}: IAddressCardProps) {
  const t = useTranslations('address');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
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
        className={clsx(
          'focus-visible:ring-ds-ring flex cursor-pointer flex-col gap-2 rounded-lg border p-4 text-sm transition-colors outline-none focus-visible:ring-3',
          selected ? 'bg-ds-bg-primary border-ds-border-primary' : 'border-ds-border-soft',
          onEdit || onDelete ? 'hover:border-ds-bg-primary-saturated' : ''
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <span className={clsx('flex items-center gap-2 font-medium', selected && 'text-ds-text-inverse')}>
            {onEdit && <MapPin className="size-6 rounded-full bg-emerald-500 p-1 text-white" />} {address.title}
          </span>

          <div className="relative flex shrink-0 items-center gap-2">
            <p
              className={clsx(
                'flex items-center gap-1',
                selected ? 'text-ds-text-inverse' : 'text-ds-text-muted',
                onEdit || onDelete ? 'mr-3 text-ds-text-plain' : ''
              )}
              dir="ltr"
            >
              <span
                className={clsx(
                  'flex h-7 w-7 items-center justify-center rounded-full',
                  selected ? 'bg-ds-bg-plain' : 'bg-ds-bg-primary-saturated',
                  onEdit && 'bg-transparent'
                )}
              >
                <Phone
                  className={clsx(
                    'size-4.5',
                    selected ? 'text-ds-text-primary' : 'text-ds-text-inverse',
                    onEdit && 'text-zinc-900'
                  )}
                />
              </span>
              {address.phone}
            </p>

            {(onEdit || onDelete) && (
              <div className="absolute top-7 -right-7.5 flex shrink-0 -translate-y-1/2 flex-col items-center gap-1">
                {onEdit && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-full border border-zinc-400 bg-zinc-50"
                    size="icon-sm"
                    aria-label={t('edit')}
                    onClick={(event) => {
                      event.stopPropagation();
                      onEdit();
                    }}
                  >
                    <PenLine className="size-3.5" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    type="button"
                    variant="destructive"
                    className="rounded-full"
                    size="icon-sm"
                    aria-label={t('delete')}
                    onClick={(event) => {
                      event.stopPropagation();
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        <p
          className={clsx(
            'w-fit rounded-full px-2',
            selected ? 'bg-ds-bg-inverse text-ds-text-inverse' : 'bg-ds-bg-muted'
          )}
        >
          {address.street}, {address.city}
        </p>
      </div>

      {onDelete && (
        <DeleteModal
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          isDeleting={isDeleting}
          onDelete={onDelete}
          address={address}
        />
      )}
    </>
  );
}
