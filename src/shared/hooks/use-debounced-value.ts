'use client';

import { useEffect, useState } from 'react';

/**
 * Delays reflecting `value` until it stops changing for `delay` ms.
 * Used to keep expensive side effects (e.g. URL/query updates, network
 * requests) off the hot path of fast-changing input like keystrokes.
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
