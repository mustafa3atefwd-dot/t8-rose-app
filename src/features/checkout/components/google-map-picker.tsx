'use client';

import { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Spinner } from '@/shared/components/ui/spinner';

interface IMapPickerProps {
  latitude: string;
  longitude: string;
  onPositionChange: (lat: number, lng: number) => void;
}

interface ICoordinates {
  lat: number;
  lng: number;
}

const DEFAULT_CENTER: ICoordinates = { lat: 30.0444, lng: 31.2357 };
const DEFAULT_ZOOM = 6;
const PIN_ZOOM = 17;

const MAP_OPTIONS: google.maps.MapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  clickableIcons: false,
};

function parsePosition(latitude: string, longitude: string): ICoordinates | null {
  const lat = Number(latitude);
  const lng = Number(longitude);
  return latitude !== '' && longitude !== '' && Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
}

export default function GoogleMapPicker({ latitude, longitude, onPositionChange }: IMapPickerProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'address-map-picker',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const onPositionChangeRef = useRef(onPositionChange);
  useEffect(() => {
    onPositionChangeRef.current = onPositionChange;
  });

  // Live coordinates while the pin is actively being dragged; overrides the
  // committed latitude/longitude props (used for the checkpoint readout below)
  // until the drag ends and the parent form commits the new position.
  const [dragPreview, setDragPreview] = useState<ICoordinates | null>(null);

  const committedPosition = parsePosition(latitude, longitude);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !committedPosition) return;

    // Pan first so the camera glides to the new position; only bump the zoom
    // once that pan settles ('idle'), otherwise the simultaneous zoom change
    // cuts the pan animation short and the map just jumps instead of flying.
    map.panTo(committedPosition);
    const currentZoom = map.getZoom() ?? DEFAULT_ZOOM;
    if (currentZoom < PIN_ZOOM) {
      google.maps.event.addListenerOnce(map, 'idle', () => {
        map.setZoom(PIN_ZOOM);
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log('[MapPicker] checkpoint:', committedPosition);
    }
    // committedPosition is re-derived from latitude/longitude on every render;
    // only re-run this sync when the actual coordinates change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  const checkpoint = dragPreview ?? committedPosition;

  if (!isLoaded) {
    return (
      <div className="border-ds-border-soft bg-ds-bg-muted flex h-70 w-full items-center justify-center rounded-lg border">
        <Spinner className="size-6" />
      </div>
    );
  }

  return (
    <div className="relative">
      <GoogleMap
        mapContainerClassName="border-ds-border-soft h-70 w-full cursor-crosshair rounded-lg border"
        center={committedPosition ?? DEFAULT_CENTER}
        zoom={committedPosition ? PIN_ZOOM : DEFAULT_ZOOM}
        options={MAP_OPTIONS}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onUnmount={() => {
          mapRef.current = null;
        }}
        onClick={(event) => {
          if (!event.latLng) return;
          onPositionChangeRef.current(event.latLng.lat(), event.latLng.lng());
        }}
      >
        {committedPosition && (
          <Marker
            position={dragPreview ?? committedPosition}
            draggable
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 9,
              fillColor: '#dc2626',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
            }}
            onDrag={(event) => {
              if (!event.latLng) return;
              setDragPreview({ lat: event.latLng.lat(), lng: event.latLng.lng() });
            }}
            onDragEnd={(event) => {
              if (!event.latLng) return;
              setDragPreview(null);
              onPositionChangeRef.current(event.latLng.lat(), event.latLng.lng());
            }}
          />
        )}
      </GoogleMap>

      {checkpoint && (
        <div
          dir="ltr"
          className="bg-ds-bg-plain/90 text-ds-text-plain border-ds-border-soft shadow-ds-soft pointer-events-none absolute bottom-3 left-3 z-10 rounded-md border px-2.5 py-1 font-mono text-xs"
        >
          {checkpoint.lat.toFixed(6)}, {checkpoint.lng.toFixed(6)}
        </div>
      )}
    </div>
  );
}
