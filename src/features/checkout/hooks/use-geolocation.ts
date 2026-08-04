'use client';

import { useState } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

export function useGeolocation() {
  const [isLocating, setIsLocating] = useState(false);
  const [denied, setDenied] = useState(false);

  function locate(onSuccess: (coords: Coordinates) => void) {
    if (!navigator.geolocation) {
      setDenied(true);
      return;
    }

    setIsLocating(true);
    setDenied(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        onSuccess({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      () => {
        setIsLocating(false);
        setDenied(true);
      }
    );
  }

  return { locate, isLocating, denied };
}
