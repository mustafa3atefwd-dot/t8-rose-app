'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PaginationControl } from '@/shared/components/ui/pagination';

type OrdersPaginationProps = {
  page: number;
  totalPages: number;
};

function OrdersPagination({ page, totalPages }: OrdersPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return <PaginationControl page={page} totalPages={totalPages} onPageChange={handlePageChange} />;
}

export default OrdersPagination;
