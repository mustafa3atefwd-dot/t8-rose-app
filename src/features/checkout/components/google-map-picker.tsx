'use client';

import { useTranslations } from 'next-intl';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Spinner } from '@/shared/components/ui/spinner';

interface IGoogleMapPickerProps {
  latitude: string;
  longitude: string;
  onPositionChange: (lat: number, lng: number) => void;
}

const CONTAINER_STYLE = { width: '100%', height: '280px' };
const DEFAULT_CENTER = { lat: 30.0444, lng: 31.2357 };
const DEFAULT_ZOOM = 6;
const PIN_ZOOM = 15;

export default function GoogleMapPicker({ latitude, longitude, onPositionChange }: IGoogleMapPickerProps) {
  const t = useTranslations('address');
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'checkout-google-map-picker',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const hasPin = latitude !== '' && longitude !== '';
  const center = hasPin ? { lat: Number(latitude), lng: Number(longitude) } : DEFAULT_CENTER;

  if (loadError) {
    return (
      <div
        style={CONTAINER_STYLE}
        className="border-ds-border-soft bg-ds-bg-muted text-ds-text-danger flex items-center justify-center rounded-lg border p-4 text-center text-sm"
      >
        {t('mapLoadError')}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div style={CONTAINER_STYLE} className="border-ds-border-soft bg-ds-bg-muted flex items-center justify-center rounded-lg border">
        <Spinner className="size-6" />
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={CONTAINER_STYLE}
      mapContainerClassName="rounded-lg overflow-hidden"
      center={center}
      zoom={hasPin ? PIN_ZOOM : DEFAULT_ZOOM}
      onClick={(event) => {
        if (event.latLng) {
          onPositionChange(event.latLng.lat(), event.latLng.lng());
        }
      }}
    >
      {hasPin && (
        <Marker
          position={center}
          draggable
          onDragEnd={(event) => {
            if (event.latLng) {
              onPositionChange(event.latLng.lat(), event.latLng.lng());
            }
          }}
        />
      )}
    </GoogleMap>
  );
}
