'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import ProductCard from './product-card';
import ProductCardSkeleton from '../skeletons/product-card-skeleton';
import { getProducts } from '../lib/api';
import { PRODUCTS_PAGE_SIZE } from '../lib/constants';
import { IProduct } from '../lib/types';
import { useProductFilters } from '@/features/products/hooks/use-product-filters';
import { PaginationControl } from '@/shared/components/ui/pagination';

export default function ProductsGrid() {
  // Translation
  const t = useTranslations('products.filters');
  const tError = useTranslations('error');
  const tWishlist = useTranslations('wishlist');

  // Custom hooks
  const {
    categoryIds,
    subCategoryId,
    occasionId,
    minRating,
    minPrice,
    maxPrice,
    page,
    sortBy,
    sortOrder,
    search,
    isPending,
    setFilter,
  } = useProductFilters();
  const { toggleWishlist, isWishlisted, isLoading: isWishlistLoading } = useWishlist();

  // Variables
  // The sidebar is multi-select, so every checked category has to travel to the
  // backend — sending only `categoryIds[0]` silently dropped the rest.
  const categoryId = categoryIds.length > 0 ? categoryIds.join(',') : undefined;

  const filters = {
    page,
    limit: PRODUCTS_PAGE_SIZE,
    categoryId,
    subCategoryId,
    occasionId,
    minRating,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    search,
  };

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
    // Keeps the previous page on screen while the next filter result loads,
    // so the grid doesn't collapse on every checkbox click.
    placeholderData: keepPreviousData,
  });

  const products: IProduct[] = data?.status ? (data.payload?.data ?? []) : [];

  const metadata = data?.status ? data.payload?.metadata : undefined;
  const isRefreshing = isPending || isFetching;

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: PRODUCTS_PAGE_SIZE }).map((_, index) => (
            <ProductCardSkeleton key={`product-skeleton-${index}`} />
          ))}
        </div>
      ) : isError ? (
        <p className="text-ds-text-danger py-20 text-center text-sm">{tError('networkError')}</p>
      ) : products.length === 0 ? (
        <p className="text-ds-text-muted py-20 text-center text-sm">{t('noResults')}</p>
      ) : (
        <div
          data-pending={isRefreshing || undefined}
          className="border-ds-border-soft pl-6 mt-2 grid grid-cols-1 gap-x-6 gap-y-8 border-l transition-opacity data-pending:opacity-60 sm:grid-cols-2 md:grid-cols-3"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {products.length > 0 && (metadata?.totalPages ?? 1) > 1 && (
        <div className="mt-20 mb-2 flex items-center justify-center">
          <PaginationControl
            page={page}
            totalPages={metadata?.totalPages ?? 1}
            onPageChange={(newPage) => setFilter('page', newPage)}
          />
        </div>
      )}
    </div>
  );
}
