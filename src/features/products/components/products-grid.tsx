'use client';

import { PaginationControl } from "@/shared/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { HeartPlus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useProductFilters } from '@/features/products/hooks/use-product-filters';
import RatingStars from "@/features/products/components/rating-stars";
import FormatPrice from "@/features/products/hooks/format-price";
import { IApiResponse } from "@/shared/lib/types/api";
import { IPaginatedProducts, IProduct } from "../lib/types";


export default function ProductsGrid() {
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
      params.set('limit', '12');
      if (categoryIds[0]) params.set('categoryId', categoryIds[0]);
      if (occasionId) params.set('occasionId', occasionId);
      if (minPrice != null) params.set('minPrice', String(minPrice));
      if (maxPrice != null) params.set('maxPrice', String(maxPrice));
      if (minRating != null) params.set('minRating', String(minRating));
      if (sortBy) params.set('sortBy', sortBy);
      if (sortOrder) params.set('sortOrder', sortOrder);
      if (search) params.set('search', search);
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch products');

      return (await res.json()) as IApiResponse<IPaginatedProducts>;
    },
  });

  const products: IProduct[] = data?.status ? data.payload?.data ?? [] : [];
  const metadata = data?.status ? data.payload?.metadata : undefined;


  return (
    <div className="w-full">
      {isLoading ? (
        <div className="text-center py-20 text-zinc-500">Loading</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 mt-2">
          {products.map((product) => (
            <div key={product.id} className="w-full flex flex-col justify-between">
              <div className="relative h-68 rounded-2xl overflow-hidden bg-zinc-50 p-3 flex flex-col justify-between">
                {product.cover && (
                  <Image
                    className="object-cover rounded-xl"
                    src={product.cover}
                    alt={product.title}
                    fill
                  />
                )}
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
                  {product.title}
                </p>

                <div className="flex items-center justify-between mt-1">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-amber-500">
                      <RatingStars rating={product.rating} label={`Rating: ${product.rating}`} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-ds-text-primary">
                        {FormatPrice(Number(product.price))} EGP
                      </span>
                      <span className="font-medium text-base leading-[100%] tracking-normal align-bottom text-zinc-400 line-through">
                         {product.discountValue}
                      </span>
                    </div>
                  </div>

                  <button className="w-10 h-10 rounded-full bg-maroon-600 hover:bg-maroon-700 transition-colors flex justify-center items-center shrink-0">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center items-center mt-20 mb-2">
        <PaginationControl
          page={page}
          totalPages={metadata?.totalPages ?? 1}
          onPageChange={(newPage) => setFilter('page', newPage)}
        />
      </div>
    </div>
  );
}

