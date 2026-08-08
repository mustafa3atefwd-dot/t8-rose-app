'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { getProducts } from '../lib/api';
import { ProductSearchResultItem } from './product-search-result-item';

const MAX_RESULTS = 6;

interface ProductSearchResultsProps {
  query: string;
  onSelect?: () => void;
}

export function ProductSearchResults({ query, onSelect }: ProductSearchResultsProps) {
  const t = useTranslations('home.header');

  const { data, isFetching } = useQuery({
    queryKey: ['products-search', query],
    queryFn: () => getProducts({ search: query, limit: MAX_RESULTS }),
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });

  const products = data?.status ? (data.payload?.data ?? []) : [];
  const showSkeleton = isFetching && products.length === 0;

  return (
    <div
      role="listbox"
      className="bg-ds-bg-plain text-ds-text-plain ring-ds-border-plain/10 animate-in fade-in-0 zoom-in-95 absolute inset-x-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-lg p-2 shadow-md ring-1 duration-100"
    >
      {showSkeleton ? (
        <div className="flex flex-col gap-1">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 p-2">
              <Skeleton className="h-12 w-12 shrink-0 rounded-md" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-3.5 w-3/4" />
                <Skeleton className="h-3.5 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-ds-text-muted p-4 text-center text-sm">{t('searchNoResults')}</p>
      ) : (
        products.map((product) => <ProductSearchResultItem key={product.id} product={product} onSelect={onSelect} />)
      )}
    </div>
  );
}
