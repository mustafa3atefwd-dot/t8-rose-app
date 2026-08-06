'use client';

import { PaginationControl } from "@/shared/components/ui/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Heart, HeartPlus, Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useProductFilters } from '@/features/products/hooks/use-product-filters';
import RatingStars from "@/features/products/components/rating-stars";
import FormatPrice from "@/features/products/hooks/format-price";
import { getProducts } from "../lib/api";
import { PRODUCTS_PAGE_SIZE } from "../lib/constants";
import { IProduct } from "../lib/types";
import { useWishlist } from '@/shared/hooks/use-wishlist';
import { toast } from '@/shared/components/ui/toast';


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
  const categoryId = categoryIds.length ? categoryIds.join(',') : undefined;

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

  const products: IProduct[] = data?.status ? data.payload?.data ?? [] : [];
  const metadata = data?.status ? data.payload?.metadata : undefined;
  const isRefreshing = isPending || isFetching;

  const handleToggleWishlist = async (product: IProduct) => {
    const wasSaved = isWishlisted(product.id);

    try {
      await toggleWishlist(product.id, product);
      toast.success(tWishlist(wasSaved ? 'removed' : 'addedToWishlist'));
    } catch {
      toast.error(tWishlist('wishlistError'));
    }
  };


  return (
    <div className="w-full">
      {isLoading ? (
        <div className="text-center py-20 text-zinc-500">Loading</div>
      ) : isError ? (
        <div className="text-center py-20 text-ds-text-danger">{tError('networkError')}</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-zinc-500">{t('noResults')}</div>
      ) : (
        <div
          data-pending={isRefreshing || undefined}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 mt-2 transition-opacity data-[pending]:opacity-60"
        >
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
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex justify-center items-center hover:bg-zinc-100 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label={tWishlist(isWishlisted(product.id) ? 'remove' : 'add')}
                    disabled={isWishlistLoading}
                    onClick={() => void handleToggleWishlist(product)}
                  >
                    {isWishlistLoading ? (
                      <Loader2 className="w-4.5 h-4.5 animate-spin text-red-900" />
                    ) : isWishlisted(product.id) ? (
                      <Heart className="w-4.5 h-4.5 fill-red-900 text-red-900" />
                    ) : (
                      <HeartPlus className="w-4.5 h-4.5 text-red-900" />
                    )}
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

      {products.length > 0 && (metadata?.totalPages ?? 1) > 1 && (
        <div className="flex justify-center items-center mt-20 mb-2">
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

