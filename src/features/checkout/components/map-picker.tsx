'use client';

import dynamic from 'next/dynamic';
import { Spinner } from '@/shared/components/ui/spinner';

interface IMapPickerProps {
  latitude: string;
  longitude: string;
  onPositionChange: (lat: number, lng: number) => void;
}

const GoogleMapPicker = dynamic(() => import('./google-map-picker'), {
  ssr: false,
  loading: () => (
    <div className="border-ds-border-soft bg-ds-bg-muted flex h-70 w-full items-center justify-center rounded-lg border">
      <Spinner className="size-6" />
    </div>
  ),
});

export default function MapPicker(props: IMapPickerProps) {
  return <GoogleMapPicker {...props} />;
}
