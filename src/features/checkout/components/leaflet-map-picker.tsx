'use client';

import { useEffect, useMemo, useRef } from 'react';
import L, { type Map as LeafletMap } from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

interface ILeafletMapPickerProps {
  latitude: string;
  longitude: string;
  onPositionChange: (lat: number, lng: number) => void;
}

const DEFAULT_CENTER: [number, number] = [30.0444, 31.2357];
const DEFAULT_ZOOM = 6;
const PIN_ZOOM = 15;

function RecenterMap({ position }: { position: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (position) map.setView(position, PIN_ZOOM);
  }, [map, position]);

  return null;
}

export default function LeafletMapPicker({ latitude, longitude, onPositionChange }: ILeafletMapPickerProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const lat = Number(latitude);
  const lng = Number(longitude);
  const position: [number, number] | null =
    latitude !== '' && longitude !== '' && Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : null;
  const markerIcon = useMemo(
    () =>
      L.divIcon({
        className: '',
        html: '<span class="block size-5 rounded-full border-[3px] border-white bg-red-600 shadow-lg"></span>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    []
  );

  return (
    <div
      className="relative"
      onClickCapture={(event) => {
        const map = mapRef.current;
        if (!map || (event.target as HTMLElement).closest('.leaflet-control')) return;

        const rect = map.getContainer().getBoundingClientRect();
        const point = L.point(event.clientX - rect.left, event.clientY - rect.top);
        const selected = map.containerPointToLatLng(point);
        onPositionChange(selected.lat, selected.lng);
      }}
    >
      <MapContainer
        ref={mapRef}
        center={position ?? DEFAULT_CENTER}
        zoom={position ? PIN_ZOOM : DEFAULT_ZOOM}
        scrollWheelZoom
        className="border-ds-border-soft h-[280px] w-full cursor-crosshair rounded-lg border"
        aria-label="Select delivery location on map"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <RecenterMap position={position} />
        {position && (
          <Marker
            position={position}
            icon={markerIcon}
            draggable
            eventHandlers={{
              dragend(event) {
                const nextPosition = event.target.getLatLng();
                onPositionChange(nextPosition.lat, nextPosition.lng);
              },
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
