'use client';

import { useEffect, useRef, useState } from 'react';
import { useProductFilters } from '@/features/products/hooks/use-product-filters';
import { ProductSearchResults } from '@/features/products/components/product-search-results';
import { useDebouncedValue } from '@/shared/hooks';
import { SearchInput as SearchField } from '@/shared/components/ui/inputs/search-input';
import { useTranslations } from 'next-intl';

interface ClassNameProps {
  className?: string;
}

const SEARCH_DEBOUNCE_MS = 400;

export default function SearchInput({ className }: ClassNameProps) {
  const t = useTranslations('home.header');

  const { search, setFilter } = useProductFilters();

  // Local state keeps every keystroke instant; only the debounced value
  // below is pushed to the URL, so typing doesn't trigger a navigation
  // (and the resulting refetch/re-render) on every character.
  const [value, setValue] = useState(search ?? '');
  const [syncedSearch, setSyncedSearch] = useState(search);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedValue = useDebouncedValue(value, SEARCH_DEBOUNCE_MS);
  const trimmedValue = debouncedValue.trim();

  // Stay in sync when the search filter changes from elsewhere (e.g. a
  // "clear filters" action or browser back/forward navigation). Adjusting
  // state during render (rather than in an effect) avoids an extra commit.
  if (search !== syncedSearch) {
    setSyncedSearch(search);
    setValue(search ?? '');
  }

  useEffect(() => {
    const normalized = debouncedValue ? debouncedValue : undefined;
    if (normalized !== search) {
      setFilter('search', normalized);
    }
  }, [debouncedValue, search, setFilter]);

  // Close the live-results panel on an outside click or Escape, since it's
  // a plain absolutely-positioned box rather than a focus-trapped popover.
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative w-full">
      <SearchField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder={t('inputPlaceholder')}
        className={className}
      />

      {isOpen && <ProductSearchResults query={trimmedValue} onSelect={() => setIsOpen(false)} />}
    </div>
  );
}
