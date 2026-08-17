'use client';

import { useState } from 'react';
import { FolderHeart, Trash2 } from 'lucide-react';
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
    <main className="bg-ds-bg-default py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FolderHeart className="text-ds-text-primary size-8" aria-hidden="true" />
            <h1 className="text-ds-text-plain text-2xl font-bold sm:text-3xl">
              {t('title')} <span className="text-ds-text-muted text-base font-normal">({count})</span>
            </h1>
          </div>

          {count > 0 && (
            <Button type="button" variant="outline" onClick={() => setClearDialogOpen(true)}>
              <Trash2 className="size-4" />
              {t('clear')}
            </Button>
          )}
        </div>

        {count === 0 ? (
          <WishlistEmptyState />
        ) : (
          <>
            <div className="space-y-4">
              {visibleProducts.map((product) => (
                <WishlistItem key={product.id} product={product} />
              ))}
            </div>

            <WishlistPagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />

            <div className="mt-8 flex justify-center">
              <Button asChild variant="outline" className="min-w-44">
                <Link href="/products">{t('continueShopping')}</Link>
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
