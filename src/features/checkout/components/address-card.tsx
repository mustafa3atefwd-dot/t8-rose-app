'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Pencil, Phone, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Address } from '../lib/types';

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
      className={clsx(
        'focus-visible:ring-ds-ring flex cursor-pointer flex-col gap-2 rounded-lg border p-4 text-sm outline-none transition-colors focus-visible:ring-3',
        selected ? 'bg-ds-bg-primary border-ds-border-primary' : 'border-ds-border-soft',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={clsx('font-medium', selected && 'text-ds-text-inverse')}>{address.title}</span>

        <div className="flex shrink-0 items-center gap-2">
          <p className={clsx('flex items-center gap-2', selected ? 'text-ds-text-inverse' : 'text-ds-text-muted')} dir="ltr">
            <span
              className={clsx(
                'flex h-7 w-7 items-center justify-center rounded-full',
                selected ? 'bg-ds-bg-plain' : 'bg-ds-bg-primary-saturated',
              )}
            >
              <Phone className={clsx('size-4.5', selected ? 'text-ds-text-primary' : 'text-ds-text-inverse')} />
            </span>
            {address.phone}
          </p>

          {(onEdit || onDelete) &&
            (confirmingDelete ? (
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
                {onEdit && (
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
                )}
                {onDelete && (
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
                )}
              </div>
            ))}
        </div>
      </div>

      <p
        className={clsx(
          'w-fit rounded-full px-2',
          selected ? 'bg-ds-bg-inverse text-ds-text-inverse' : 'bg-ds-bg-muted',
        )}
      >
        {address.street}, {address.city}
      </p>
    </div>
  );
}
