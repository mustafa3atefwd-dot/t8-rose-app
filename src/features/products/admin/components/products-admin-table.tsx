'use client';

import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EllipsisVertical, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/shared/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { PaginationControl } from '@/shared/components/ui/pagination';
import type { IProduct } from '@/features/products/lib/types';
import { deleteProduct, getAdminProducts } from '../lib/products-admin.api';

const PAGE_SIZE = 12;

function ProductActions({
  product,
  onDelete,
  deleting,
}: {
  product: IProduct;
  onDelete: () => void;
  deleting: boolean;
}) {
  const t = useTranslations('productsAdmin');
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const editHref = `/${locale}/dashboard/products/${product.id}/edit`;

  return (
    <>
      <div className="hidden items-center justify-end gap-2 md:flex">
        <Button asChild size="sm" variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
          <Link href={editHref}>
            <Pencil /> {t('actions.edit')}
          </Link>
        </Button>
        <Button size="sm" onClick={onDelete} disabled={deleting} className="bg-red-50 text-red-600 hover:bg-red-100">
          <Trash2 /> {t('actions.delete')}
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              className="md:hidden"
              aria-label={t('table.actionsFor', { title: product.title })}
            />
          }
        >
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push(editHref)}>
            <Pencil /> {t('actions.edit')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} disabled={deleting} className="text-red-600">
            <Trash2 /> {t('actions.delete')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default function ProductsAdminTable() {
  const t = useTranslations('productsAdmin');
  const { locale } = useParams<{ locale: string }>();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<IProduct | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [search]);

  const query = useQuery({
    queryKey: ['admin-products', page, debouncedSearch],
    queryFn: () => getAdminProducts({
      page,
      limit: PAGE_SIZE,
      search: debouncedSearch || undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    }),
    placeholderData: keepPreviousData,
  });

  const remove = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      toast.success(t('messages.deleted'));
      setDeleteTarget(null);
      await queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
    onError: (error) => toast.error(error.message || t('messages.deleteError')),
  });

  const products = query.data?.status ? (query.data.payload?.data ?? []) : [];
  const metadata = query.data?.status ? query.data.payload?.metadata : undefined;
  return (
    <section className="bg-ds-bg-plain rounded-2xl px-4 py-5 md:px-6 md:py-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-ds-text-plain text-2xl font-semibold">{t('list.title')}</h1>
        <Button asChild className="h-11 px-3 md:px-4">
          <Link href={`/${locale}/dashboard/products/new`}>
            <Plus className="size-5" />
            <span className="hidden md:inline">{t('actions.addNew')}</span>
          </Link>
        </Button>
      </div>

      <label className="border-ds-border-soft mb-5 flex h-12 items-center gap-2 rounded-xl border px-4 md:h-13">
        <Search className="text-ds-text-muted size-5" />
        <span className="sr-only">{t('list.searchLabel')}</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t('list.searchPlaceholder')}
          className="placeholder:text-ds-text-muted min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
      </label>

      <div className="overflow-hidden rounded-xl">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="bg-ds-bg-subtle text-ds-text-plain">
            <tr>
              <th className="w-[34%] px-5 py-3 font-medium md:w-auto">{t('table.name')}</th>
              <th className="w-[27%] px-2 py-3 font-medium md:px-5">{t('table.price')}</th>
              <th className="w-[25%] px-2 py-3 font-medium md:px-5">{t('table.stock')}</th>
              <th className="hidden px-5 py-3 font-medium md:table-cell">{t('table.sales')}</th>
              <th className="hidden px-5 py-3 font-medium md:table-cell">{t('table.ratings')}</th>
              <th className="w-12 px-2 py-3 md:w-48">
                <span className="sr-only">{t('table.actions')}</span>
              </th>
            </tr>
          </thead>
          <tbody className={query.isFetching ? 'opacity-60' : undefined}>
            {query.isLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <tr key={index} className="border-ds-border-muted border-b">
                  <td colSpan={6} className="bg-ds-bg-subtle/40 h-15 animate-pulse" />
                </tr>
              ))}
            {query.isError && (
              <tr>
                <td colSpan={6} className="text-ds-text-danger h-40 text-center">
                  {t('list.loadError')}
                </td>
              </tr>
            )}
            {!query.isLoading && !query.isError && products.length === 0 && (
              <tr>
                <td colSpan={6} className="text-ds-text-muted h-40 text-center">
                  {t('list.empty')}
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-ds-border-muted hover:bg-ds-bg-primary-fade/50 border-b last:border-0"
              >
                <td className="text-ds-text-plain truncate px-5 py-3.5 font-semibold md:whitespace-normal">
                  {product.title}
                </td>
                <td className="text-ds-text-default truncate px-2 py-3.5 md:px-5">
                  {t('table.priceValue', { price: Number(product.price) })}
                </td>
                <td
                  className={`truncate px-2 py-3.5 md:px-5 ${product.stock <= 5 ? 'font-medium text-red-600' : 'text-ds-text-default'}`}
                >
                  {product.stock.toLocaleString()}
                </td>
                <td className="text-ds-text-default hidden px-5 py-3.5 md:table-cell">
                  {product._count.cartItems.toLocaleString()}
                </td>
                <td className="text-ds-text-plain hidden px-5 py-3.5 md:table-cell">
                  <strong>{product.rating.toFixed(1)}/5</strong> <span className="text-xs">({product.ratings})</span>
                </td>
                <td className="px-2 py-3.5 md:px-5">
                  <ProductActions
                    product={product}
                    deleting={remove.isPending && remove.variables === product.id}
                    onDelete={() => setDeleteTarget(product)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(metadata?.totalPages ?? 1) > 1 && (
        <PaginationControl
          className="mt-6"
          page={page}
          totalPages={metadata?.totalPages ?? 1}
          onPageChange={setPage}
          siblingCount={1}
        />
      )}

      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => { if (!open && !remove.isPending) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('messages.deleteTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget ? t('messages.deleteConfirm', { title: deleteTarget.title }) : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button type="button" variant="outline" disabled={remove.isPending} onClick={() => setDeleteTarget(null)}>
              {t('actions.cancel')}
            </Button>
            <Button
              type="button"
              variant="destructive"
              loading={remove.isPending}
              loadingText={t('actions.deleting')}
              onClick={() => deleteTarget && remove.mutate(deleteTarget.id)}
            >
              {t('actions.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
