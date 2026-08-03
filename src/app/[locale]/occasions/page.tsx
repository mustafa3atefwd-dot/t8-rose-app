'use client';

import { PaginationControl } from "@/shared/components/ui/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { HeartPlus, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useProductFilters } from '@/features/products/hooks/use-product-filters';
import Header from "@/shared/components/header-page";
import ProductFiltersSidebar from "@/features/products/components/filters/product-filters-sidebar";
import { Link } from "@/i18n/navigation";
import RatingStars from "@/features/products/components/rating-stars";
import FormatPrice from "@/features/products/hooks/format-price";
import { useTranslations } from "next-intl";


export default function GetOccasionsPagee() {
  const t = useTranslations('currency')

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

  const occasions = data?.status ? data.payload?.data ?? [] : [];
  const categories = data?.status ? data.payload?.data ?? [] : [];
  const metadata = data?.status ? data.payload?.metadata : undefined;


  return (
    
    <div className="w-full">
      <Header/>

      <div className="container mx-auto flex flex-col md:flex-row gap-8 px-4 py-8 flex-1">

        <aside className="w-full md:w-64 gap-8">
          <ProductFiltersSidebar categories={categories} occasions={occasions} />
        </aside>

        <main className="w-full min-w-0 ml-6 flex-1 rtl:mr-6">
        {isLoading ? (
        <div className="text-center py-20 text-zinc-500">Loading</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 mt-2">
          {occasions.map((p) => (
            <div key={p.id} className="w-full flex flex-col justify-between">
              <div className="relative h-68 rounded-2xl overflow-hidden bg-zinc-50 p-3 flex flex-col justify-between">
                <Image
                  className="object-cover rounded-xl"
                  src={p.cover}
                  alt={p.title}
                  fill
                />
                <div className="relative z-10 flex justify-between items-center w-full">
                  <button className="w-8 h-8 rounded-full bg-white shadow-sm flex justify-center items-center hover:bg-zinc-100 transition-colors">
                    <HeartPlus className="w-4.5 h-4.5 text-red-900" />
                  </button>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-100/90 backdrop-blur-sm flex justify-center items-center">
                    <p className="font-medium text-xs tracking-normal text-zinc-700">NEW </p>
                  </span>
                </div>
              </div>
  
              <div className="mt-3 flex flex-col gap-2">
                <p className="font-semibold text-base leading-snug text-ds-text-primary line-clamp-1">
                  {p.title}
                </p>
  
                <div className="flex items-center justify-between mt-1">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-amber-500">
                      <RatingStars rating={p.rating} label={`Rating: ${p.rating}`} />
                    </div>
  
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-ds-text-primary">
                        {FormatPrice(p.price)} {t('EGP')}
                      </span>
                      <span className="font-medium text-base leading-[100%] tracking-normal align-bottom text-zinc-400 line-through">
                         {p.discountValue}
                      </span>
                    </div>
                  </div>
  
                  <Link href={'/cart'} className="w-10 h-10 rounded-full bg-maroon-600 hover:bg-maroon-700 transition-colors flex justify-center items-center shrink-0">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

        </main>

      </div>
  
      <div className="flex justify-center items-center mt-20 mb-2">
        <PaginationControl
          page={page}
          totalPages={metadata?.totalPages ?? 1}
          onPageChange={(newPage) => setFilter('page', newPage)}
        />
      </div>


    </div>

  )
}


