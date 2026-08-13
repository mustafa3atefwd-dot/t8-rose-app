'use client';

import { useTranslations } from 'next-intl';
import { MapPinHouse } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { SubmitButton } from '@/shared/components';
import { IAddressStep2MapProps } from '../lib/types';
import { useGeolocation } from '../hooks';
import MapPicker from './map-picker';

export default function AddressStep2Map({
  form,
  onPositionChange,
  isPending,
  pinError,
  submitLabel,
}: IAddressStep2MapProps) {
  const t = useTranslations('address');
  const { locate, isLocating, denied, error } = useGeolocation();

  const latitude = form.watch('latitude');
  const longitude = form.watch('longitude');

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <MapPicker latitude={latitude} longitude={longitude} onPositionChange={onPositionChange} />

        <Button
          type="button"
          variant="outline"
          size="sm"
          loading={isLocating}
          onClick={() => locate((coords) => onPositionChange(coords.lat, coords.lng))}
          className="text-ds-bg-primary border-ds-bg-primary absolute top-5 right-5 z-10 w-fit gap-1.5 border"
        >
          <MapPinHouse className="size-4" />
          {t('findMyLocation')}
        </Button>
      </div>

      {latitude && longitude && (
        <p className="text-ds-text-muted text-xs" dir="ltr">
          Selected: {Number(latitude).toFixed(6)}, {Number(longitude).toFixed(6)}
        </p>
      )}

      {denied && <p className="text-ds-text-danger text-sm">{error ?? t('locationDenied')}</p>}
      {pinError && <p className="text-ds-text-danger text-sm">{t('pinRequired')}</p>}


        <SubmitButton isLoading={isPending} loadingText={submitLabel} className="my-0 w-full sm:w-auto">
          {submitLabel}
        </SubmitButton>
    
    </div>
  );
}
