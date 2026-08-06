'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

interface WishlistPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function WishlistPagination({ page, totalPages, onPageChange }: WishlistPaginationProps) {
  const t = useTranslations('pagination');

  if (totalPages <= 1) return null;

  return (
    <nav aria-label={t('page', { page })} className="flex items-center justify-center gap-2 pt-6">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={t('previous')}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="rtl:rotate-180" />
      </Button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <Button
          key={pageNumber}
          type="button"
          variant={pageNumber === page ? 'default' : 'outline'}
          size="icon"
          aria-label={t('page', { page: pageNumber })}
          aria-current={pageNumber === page ? 'page' : undefined}
          className={cn(pageNumber === page && 'pointer-events-none')}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}

      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={t('next')}
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="rtl:rotate-180" />
      </Button>
    </nav>
  );
}
