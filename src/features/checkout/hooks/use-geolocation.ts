'use client';

import { useState } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

export function useGeolocation() {
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function locate(onSuccess: (coords: Coordinates) => void) {
    if (!navigator.geolocation) {
      setError('Location is not supported by this browser. Please select a point on the map.');
      return;
    }

    if (!window.isSecureContext) {
      setError('Location requires HTTPS or localhost. Please select a point on the map.');
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        onSuccess({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      (positionError) => {
        setIsLocating(false);
        const message =
          positionError.code === positionError.PERMISSION_DENIED
            ? 'Location permission was denied. Allow location access in your browser, then try again.'
            : positionError.code === positionError.TIMEOUT
              ? 'Finding your location timed out. Please try again or select a point on the map.'
              : 'Your location is unavailable. Please select a point on the map.';
        setError(message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }

  return { locate, isLocating, denied: error !== null, error };
}
