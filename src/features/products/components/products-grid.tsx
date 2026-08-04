'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ProductCard from './product-card';
import ProductCardSkeleton from '../skeletons/product-card-skeleton';
import { getProducts } from '../lib/api';
import { PRODUCTS_PAGE_SIZE } from '../lib/constants';
import { IProduct } from '../lib/types';
import { useProductFilters } from '@/features/products/hooks/use-product-filters';
import { PaginationControl } from '@/shared/components/ui/pagination';

export default function ProductsGrid() {
  // Custom hooks
  const {
    categoryIds,
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

  const categoryId = categoryIds.length > 0 ? categoryIds.join(',') : undefined;

  const filters = {
    page,
    limit: PRODUCTS_PAGE_SIZE,
    categoryId,
    occasionId,
    minRating,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    search,
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
    placeholderData: keepPreviousData,
  });

  const products: IProduct[] = data?.status ? (data.payload?.data ?? []) : [];

  const metadata = data?.status ? data.payload?.metadata : undefined;
  const isRefreshing = isPending || isFetching;

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="gap-y-8sm:grid-cols-2 mt-2 grid grid-cols-1 gap-x-6 md:grid-cols-3">
          {Array.from({ length: PRODUCTS_PAGE_SIZE }).map((_, index) => (
            <ProductCardSkeleton key={`product-skeleton-${index}`} />
          ))}
        </div>
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
