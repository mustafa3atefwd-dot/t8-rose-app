'use client';

import { useProductFilters } from '@/features/products/hooks/use-product-filters';
import { useTranslations } from 'next-intl';
export default function SearchInput() {
    const t = useTranslations('homeHeader')

  const { search, setFilter } = useProductFilters();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter('search', value ? value : undefined);
  };

  return (
    <div className="relative flex-1 max-w-md">
      <input
        type="text"
        value={search || ''}
        onChange={handleSearchChange}
        className="peer w-full h-13 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-ds-xl border p-4 gap-2 border-zinc-300 placeholder:text-zinc-400 placeholder:pl-6 rtl:placeholder:pl-113" placeholder={t('inputPlaceholder')}
      />
    </div>
  );
}