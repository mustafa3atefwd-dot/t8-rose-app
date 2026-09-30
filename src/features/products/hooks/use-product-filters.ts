'use client';

import { useCallback, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { ProductSortBy, SortOrder } from '../lib/constants';

export type ProductFilterKey =
  | 'categoryId'
  | 'subCategoryId'
  | 'occasionId'
  | 'minRating'
  | 'minPrice'
  | 'maxPrice'
  | 'page'
  | 'sortBy'
  | 'sortOrder'
  | 'search';

type FilterPatch = Partial<Record<ProductFilterKey, string | number | undefined>>;

/**
 * Single source of truth for the products-page filter URL params. Every
 * update goes through `setFilters` so multi-field changes (e.g. price
 * from+to) land in one navigation instead of racing two separate ones.
 */
export const useProductFilters = () => {
  // Navigation
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // State
  const [isPending, startTransition] = useTransition();

  // Variables
  const categoryIdsParam = searchParams.get('categoryId') ?? undefined;
  const categoryIds = categoryIdsParam?.split(',').filter(Boolean) ?? [];
  const subCategoryId = searchParams.get('subCategoryId') ?? undefined;
  const occasionId = searchParams.get('occasionId') ?? undefined;
  const minRatingRaw = searchParams.get('minRating');
  const minPriceRaw = searchParams.get('minPrice');
  const maxPriceRaw = searchParams.get('maxPrice');
  const pageRaw = searchParams.get('page');

  const minRating = minRatingRaw ? Number(minRatingRaw) : undefined;
  const minPrice = minPriceRaw ? Number(minPriceRaw) : undefined;
  const maxPrice = maxPriceRaw ? Number(maxPriceRaw) : undefined;
  const page = pageRaw ? Number(pageRaw) : 1;

  const sortBy = (searchParams.get('sortBy') as ProductSortBy) ?? undefined;
  const sortOrder = (searchParams.get('sortOrder') as SortOrder) ?? undefined;
  const search = searchParams.get('search') ?? undefined;

  // Functions
  const navigate = useCallback(
    (params: URLSearchParams) => {
      const queryString = params.toString();
      startTransition(() => {
        router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`);
      });
    },
    [pathname, router]
  );

  const setFilters = useCallback(
    (patch: FilterPatch) => {
      const params = new URLSearchParams(searchParams.toString());
      let touchedFilter = false;

      (Object.entries(patch) as [ProductFilterKey, string | number | undefined][]).forEach(([key, value]) => {
        if (value === undefined || value === '') {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
        if (key !== 'page') touchedFilter = true;
      });

      // Any filter change (not a page change itself) snaps back to page 1.
      if (touchedFilter) params.delete('page');

      navigate(params);
    },
    [searchParams, navigate]
  );

  const setFilter = useCallback(
    (key: ProductFilterKey, value: string | number | undefined) => setFilters({ [key]: value }),
    [setFilters]
  );

  const resetFilter = useCallback((key: ProductFilterKey) => setFilter(key, undefined), [setFilter]);

  const resetAll = useCallback(() => navigate(new URLSearchParams()), [navigate]);

  return {
    sortBy,
    sortOrder,
    search,
    categoryIds,
    subCategoryId,
    occasionId,
    minRating,
    minPrice,
    maxPrice,
    page,
    isPending,
    setFilter,
    setFilters,
    resetFilter,
    resetAll,
  };
};
