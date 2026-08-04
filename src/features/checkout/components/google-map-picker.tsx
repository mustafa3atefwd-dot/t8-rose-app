'use client';

import dynamic from 'next/dynamic';
import { Spinner } from '@/shared/components/ui/spinner';

interface IGoogleMapPickerProps {
  latitude: string;
  longitude: string;
  onPositionChange: (lat: number, lng: number) => void;
}

const LeafletMapPicker = dynamic(() => import('./leaflet-map-picker'), {
  ssr: false,
  loading: () => (
    <div className="border-ds-border-soft bg-ds-bg-muted flex h-[280px] items-center justify-center rounded-lg border">
      <Spinner className="size-6" />
    </div>
  ),
});

export default function GoogleMapPicker(props: IGoogleMapPickerProps) {
  return <LeafletMapPicker {...props} />;
}
