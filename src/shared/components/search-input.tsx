'use client';

import { useProductFilters } from '@/features/products/hooks/use-product-filters';
import { useTranslations } from 'next-intl';

interface ClassNameProps{
    className: string,

}

export default function SearchInput({className}: ClassNameProps) {
    const t = useTranslations('home.header')

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
        className={className}
        placeholder={t('inputPlaceholder')}
      />
    </div>
  );
}