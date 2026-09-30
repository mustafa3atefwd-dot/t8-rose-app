/**
 * A tiny `localStorage`-backed external store, shaped for `useSyncExternalStore`.
 *
 * Guest cart / wishlist data lives in `localStorage`, which is an external
 * system: reading it into component state from an effect causes a cascading
 * render and leaves every consumer of the hook with its own private copy.
 * Subscribing to a single store instead keeps all consumers in sync (header
 * badge, product cards, cart page) and stays SSR-safe via `getServerSnapshot`.
 */
export interface GuestStore<T> {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => T[];
  getServerSnapshot: () => T[];
  read: () => T[];
  save: (items: T[]) => void;
}

export function createGuestStore<T>(storageKey: string): GuestStore<T> {
  const EMPTY: T[] = [];
  const listeners = new Set<() => void>();

  // `getSnapshot` must return a referentially stable value between renders, so
  // the parsed array is cached against the raw string it was parsed from.
  let cachedRaw: string | null = null;
  let cachedItems: T[] = EMPTY;

  const emitChange = () => {
    listeners.forEach((listener) => listener());
  };

  const read = (): T[] => {
    if (typeof window === 'undefined') return EMPTY;

    const raw = window.localStorage.getItem(storageKey);
    if (raw === cachedRaw) return cachedItems;

    cachedRaw = raw;

    if (!raw) {
      cachedItems = EMPTY;
      return cachedItems;
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      cachedItems = Array.isArray(parsed) ? (parsed as T[]) : EMPTY;
    } catch (error) {
      console.error(`Failed to parse "${storageKey}" from localStorage:`, error);
      cachedItems = EMPTY;
    }

    return cachedItems;
  };

  return {
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      // Keeps tabs in sync with each other as well.
      window.addEventListener('storage', listener);

      return () => {
        listeners.delete(listener);
        window.removeEventListener('storage', listener);
      };
    },
    getSnapshot: read,
    getServerSnapshot: () => EMPTY,
    read,
    save: (items: T[]) => {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
      emitChange();
    },
  };
}
