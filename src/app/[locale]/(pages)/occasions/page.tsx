/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { PaginationControl } from '@/shared/components/ui/pagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { HeartPlus, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { useProductFilters } from '@/features/products/hooks/use-product-filters';
import Header from '@/shared/components/header-page';
import ProductFiltersSidebar from '@/features/products/components/filters/product-filters-sidebar';
import { Link } from '@/i18n/navigation';
import RatingStars from '@/features/products/components/rating-stars';
import FormatPrice from '@/features/products/hooks/format-price';

export default function GetOccasionsPagee() {
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
    setFilter,
    setFilters,
  } = useProductFilters();

  const { data, isLoading } = useQuery({
    queryKey: [
      'products',
      page,
      categoryIds.join(','),
      occasionId,
      minRating,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      search,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (page) params.set('page', String(page));
      params.set('limit', '10');
      if (categoryIds[0]) params.set('categoryId', categoryIds[0]);
      if (occasionId) params.set('occasionId', occasionId);
      if (minPrice != null) params.set('minPrice', String(minPrice));
      if (maxPrice != null) params.set('maxPrice', String(maxPrice));
      if (minRating != null) params.set('minRating', String(minRating));
      if (sortBy) params.set('sortBy', sortBy);
      if (sortOrder) params.set('sortOrder', sortOrder);
      if (search) params.set('search', search);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/occasions?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch products');

      return await res.json();
    },
    placeholderData: keepPreviousData,
  });

  const occasions = data?.status ? (data.payload?.data ?? []) : [];
  const categories = data?.status ? (data.payload?.data ?? []) : [];
  const metadata = data?.status ? data.payload?.metadata : undefined;

  return (
    <div className="w-full">
      <Header />

      <div className="container mx-auto flex flex-1 flex-col gap-8 px-4 py-8 md:flex-row">
        <aside className="w-full gap-8 md:w-64">
          <ProductFiltersSidebar categories={categories} occasions={occasions} />
        </aside>

        <main className="ml-6 w-full min-w-0 flex-1 rtl:mr-6">
          {isLoading ? (
            <div className="py-20 text-center text-zinc-500">Loading</div>
          ) : (
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
              {occasions.map((p: any) => (
                <div key={p.id} className="flex w-full flex-col justify-between">
                  <div className="relative flex h-68 flex-col justify-between overflow-hidden rounded-2xl bg-zinc-50 p-3">
                    <Image className="rounded-xl object-cover" src={p.cover} alt={p.title} fill />
                    <div className="relative z-10 flex w-full items-center justify-between">
                      <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-zinc-100">
                        <HeartPlus className="h-4.5 w-4.5 text-red-900" />
                      </button>
                      <span className="flex items-center justify-center rounded-full bg-zinc-100/90 px-2.5 py-1 backdrop-blur-sm">
                        <p className="text-xs font-medium tracking-normal text-zinc-700">NEW </p>
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col gap-2">
                    <p className="text-ds-text-primary line-clamp-1 text-base leading-snug font-semibold">{p.title}</p>

                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-amber-500">
                          <RatingStars rating={p.rating} label={`Rating: ${p.rating}`} />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-ds-text-primary text-base font-bold">{FormatPrice(p.price)} EGP</span>
                          <span className="align-bottom text-base leading-[100%] font-medium tracking-normal text-zinc-400 line-through">
                            {p.discountValue}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={'/cart'}
                        className="bg-maroon-600 hover:bg-maroon-700 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors"
                      >
                        <ShoppingCart className="h-5 w-5 text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <div className="mt-20 mb-2 flex items-center justify-center">
        <PaginationControl
          page={page}
          totalPages={metadata?.totalPages ?? 1}
          onPageChange={(newPage) => setFilter('page', newPage)}
        />
      </div>
    </div>
  );
}
