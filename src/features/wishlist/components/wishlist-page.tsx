'use client';

import { useState } from 'react';
import { ArrowLeft, FolderHeart, Paintbrush } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { toast } from '@/shared/components/ui/toast';
import { useWishlistPage } from '../context/wishlist-provider';
import { WISHLIST_PAGE_SIZE } from '../lib/constants/wishlist.constants';
import { ClearWishlistDialog } from './clear-wishlist-dialog';
import { WishlistEmptyState } from './wishlist-empty-state';
import { WishlistErrorState } from './wishlist-error-state';
import { WishlistItem } from './wishlist-item';
import { WishlistPagination } from './wishlist-pagination';
import { WishlistSkeleton } from './wishlist-skeleton';

export function WishlistPage() {
  const t = useTranslations('wishlist');
  const { products, count, isLoading, isError, clearWishlist, retry } = useWishlistPage();
  const [page, setPage] = useState(1);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const totalPages = Math.ceil(count / WISHLIST_PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(totalPages, 1));
  const visibleProducts = products.slice((currentPage - 1) * WISHLIST_PAGE_SIZE, currentPage * WISHLIST_PAGE_SIZE);

  const handleClear = async () => {
    try {
      await clearWishlist();
      setPage(1);
      toast.success(t('cleared'));
    } catch {
      toast.error(t('clearError'));
    }
  };

  if (isLoading) return <WishlistSkeleton />;
  if (isError) return <WishlistErrorState retry={retry} />;

  return (
    <main className="bg-ds-bg-default py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-ds-border-soft mb-0 flex flex-wrap items-center justify-between gap-4 border-b pb-5">
          <div className="flex items-center gap-3">
            <FolderHeart className="text-ds-text-plain size-11 sm:size-14" strokeWidth={1.6} aria-hidden="true" />
            <h1 className="text-ds-text-plain text-3xl font-bold sm:text-5xl">
              {t('title')}{' '}
              <span className="text-ds-text-muted text-sm font-normal sm:text-base">{t('items', { count })}</span>
            </h1>
          </div>

          {count > 0 && (
            <Button
              type="button"
              variant="destructive"
              className="h-11 px-5 text-base"
              onClick={() => setClearDialogOpen(true)}
            >
              <Paintbrush className="size-5" />
              {t('clear')}
            </Button>
          )}
        </div>

        {count === 0 ? (
          <WishlistEmptyState />
        ) : (
          <>
            <div>
              {visibleProducts.map((product) => (
                <WishlistItem key={product.id} product={product} />
              ))}
            </div>

            <WishlistPagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />

            <div className="mt-4 flex">
              <Button asChild className="h-12 min-w-52 px-6 text-base">
                <Link href="/products">
                  <ArrowLeft className="size-5 rtl:rotate-180" />
                  {t('continueShopping')}
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>

      <ClearWishlistDialog
        open={clearDialogOpen}
        onOpenChange={setClearDialogOpen}
        onConfirm={() => void handleClear()}
      />
    </main>
  );
}
