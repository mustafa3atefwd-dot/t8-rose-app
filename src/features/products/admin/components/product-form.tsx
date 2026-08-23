'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import type { IProductDetail } from '@/features/products/lib/types';
import { Button } from '@/shared/components/ui/button';
import { Field as ShadcnField, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { FileInput } from '@/shared/components/ui/inputs/file-input';
import { Input } from '@/shared/components/ui/inputs/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { createProduct, updateProduct } from '../lib/products-admin.api';
import { productFormSchema, type ProductFormInput, type ProductFormValues } from '../lib/product-form.schema';
import type { ProductFormOption } from '../lib/types';

type ProductFormProps = {
  mode: 'create' | 'edit';
  categories: ProductFormOption[];
  occasions: ProductFormOption[];
  product?: IProductDetail;
};

type UploadResponse = { status: boolean; payload?: { url?: string }; message?: string };

function parseGallery(value?: string) {
  try {
    const parsed: unknown = JSON.parse(value ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

async function uploadImage(file: File, fallbackMessage: string, tooLargeMessage: string) {
  const body = new FormData();
  body.append('image', file, file.name);
  const response = await fetch('/api/upload', { method: 'POST', body });
  if (response.status === 413) throw new Error(tooLargeMessage);

  const responseText = await response.text();
  let data: UploadResponse = { status: false };
  try {
    data = responseText ? (JSON.parse(responseText) as UploadResponse) : data;
  } catch {
    // Gateways can return plain text or HTML for transport-level errors.
  }
  if (!response.ok || !data.payload?.url) throw new Error(data.message || fallbackMessage);
  return data.payload.url;
}

function Field({
  label,
  required,
  error,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ShadcnField data-invalid={!!error} className={`min-w-0 gap-1.5 ${className ?? ''}`}>
      <FieldLabel className={error ? 'text-ds-text-danger' : undefined}>
        {label} {required && <span className="text-ds-text-danger">*</span>}
      </FieldLabel>
      {children}
      <FieldError>{error}</FieldError>
    </ShadcnField>
  );
}

export default function ProductForm({ mode, categories, occasions, product }: ProductFormProps) {
  const t = useTranslations('productsAdmin');
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const [coverFiles, setCoverFiles] = useState<File[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [coverError, setCoverError] = useState('');
  const [galleryError, setGalleryError] = useState('');
  const existingGallery = useMemo(() => parseGallery(product?.gallery), [product?.gallery]);
  const productOccasion = (product?.occasions?.[0] as { id?: string } | undefined)?.id ?? '';

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: product ? Number(product.price) : undefined,
      discountValue: product?.discountValue ? Number(product.discountValue) : '',
      stock: product?.stock,
      categoryId: product?.categoryId ?? '',
      occasionId: productOccasion,
    },
  });

  const [watchedPrice, watchedDiscount] = useWatch({ control, name: ['price', 'discountValue'] });
  const price = Number(watchedPrice) || 0;
  const discount = Number(watchedDiscount) || 0;
  const discountedPrice = Math.max(0, price - discount);
  const errorText = (message?: string) => (message ? t(message as never) : undefined);
  const fileError = (kind: 'cover' | 'gallery') => (reason: 'type' | 'size') => {
    const message = reason === 'type' ? t('validation.imagesOnly') : t('validation.imageSize');
    if (kind === 'cover') setCoverError(message);
    else setGalleryError(message);
  };

  const onSubmit = handleSubmit(async (values) => {
    if (mode === 'create' && coverFiles.length === 0) setCoverError(t('validation.coverRequired'));
    if (mode === 'create' && galleryFiles.length === 0) setGalleryError(t('validation.galleryRequired'));
    if (mode === 'create' && (!coverFiles.length || !galleryFiles.length)) return;

    try {
      const [cover, gallery] = await Promise.all([
        coverFiles[0]
          ? uploadImage(
              coverFiles[0],
              t('messages.uploadError', { name: coverFiles[0].name }),
              t('messages.imageTooLarge'),
            )
          : Promise.resolve(product?.cover ?? null),
        galleryFiles.length
          ? Promise.all(
              galleryFiles.map((file) =>
                uploadImage(file, t('messages.uploadError', { name: file.name }), t('messages.imageTooLarge')),
              ),
            )
          : Promise.resolve(existingGallery),
      ]);
      const value = values.discountValue === '' || values.discountValue == null ? null : Number(values.discountValue);
      const payload = {
        title: values.title.trim(),
        description: values.description.trim(),
        stock: Number(values.stock),
        price: Number(values.price),
        discountType: value && value > 0 ? ('FIXED' as const) : null,
        discountValue: value,
        categoryId: values.categoryId,
        cover,
        gallery,
      };
      if (mode === 'edit' && product) await updateProduct(product.id, payload);
      else await createProduct(payload);
      toast.success(mode === 'edit' ? t('messages.updated') : t('messages.created'));
      router.push(`/${locale}/dashboard/products`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('messages.saveError'));
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="bg-ds-bg-plain flex min-h-[calc(100vh-12rem)] max-w-5xl flex-col rounded-2xl p-6 md:p-6"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Field label={t('fields.title')} required error={errorText(errors.title?.message)}>
          <Input
            {...register('title')}
            aria-invalid={!!errors.title}
            placeholder={t('placeholders.title')}
            className="md:col-span-3"
          />
        </Field>
        <div className="md:col-span-3">
          <Field label={t('fields.description')} required error={errorText(errors.description?.message)}>
            <Textarea
              {...register('description')}
              aria-invalid={!!errors.description}
              placeholder={t('placeholders.description')}
              className="max-h-52 min-h-36 resize-y overflow-y-auto"
            />
          </Field>
        </div>
        <Field label={t('fields.price')} required error={errorText(errors.price?.message)}>
          <Input
            {...register('price')}
            aria-invalid={!!errors.price}
            type="number"
            min="0"
            step="0.01"
            placeholder={t('placeholders.price')}
          />
        </Field>
        <Field label={t('fields.discount')} error={errorText(errors.discountValue?.message)}>
          <Input
            {...register('discountValue')}
            aria-invalid={!!errors.discountValue}
            type="number"
            min="0"
            step="0.01"
            placeholder={t('placeholders.discount')}
          />
        </Field>
        <Field label={t('fields.discountedPrice')}>
          <Input
            readOnly
            tabIndex={-1}
            value={price ? discountedPrice : ''}
            type="number"
            aria-label={t('fields.discountedPrice')}
            className="bg-ds-bg-muted"
            placeholder={t('placeholders.discount')}
          />
        </Field>
        <div className="md:col-span-3">
          <Field label={t('fields.quantity')} required error={errorText(errors.stock?.message)}>
            <Input
              {...register('stock')}
              aria-invalid={!!errors.stock}
              type="number"
              min="0"
              step="1"
              placeholder={t('placeholders.quantity')}
            />
          </Field>
        </div>

        {mode === 'create' ? (
          <div className="col-span-full grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <Field label={t('fields.cover')} required error={coverError} className="w-full">
              <FileInput
                accept="image/*"
                className="w-full"
                maxSize={5 * 1024 * 1024}
                placeholder=""
                uploadLabel={t('actions.upload')}
                invalid={!!coverError}
                onError={fileError('cover')}
                onFilesChange={(files) => {
                  setCoverFiles(files);
                  setCoverError('');
                }}
              />
            </Field>
            <Field label={t('fields.gallery')} required error={galleryError} className="w-full">
              <FileInput
                accept="image/*"
                multiple
                className="w-full"
                maxSize={5 * 1024 * 1024}
                placeholder=""
                uploadLabel={t('actions.upload')}
                invalid={!!galleryError}
                onError={fileError('gallery')}
                onFilesChange={(files) => {
                  setGalleryFiles(files);
                  setGalleryError('');
                }}
              />
            </Field>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 md:col-span-3 md:justify-end">
            {product?.cover && (
              <Button asChild variant="outline">
                <Link target="_blank" href={product.cover}>
                  <ImageIcon /> {t('actions.viewCover')}
                </Link>
              </Button>
            )}
            {existingGallery.length > 0 && (
              <Button asChild variant="outline">
                <Link target="_blank" href={existingGallery[0]}>
                  <ImageIcon /> {t('actions.viewGallery')}
                </Link>
              </Button>
            )}
          </div>
        )}

        <div className="md:col-span-3">
          <Field label={t('fields.category')} required error={errorText(errors.categoryId?.message)}>
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <Select
                  items={categories.map(({ id, title }) => ({ value: id, label: title }))}
                  value={field.value || null}
                  onValueChange={(value) => field.onChange(value ?? '')}
                >
                  <SelectTrigger
                    aria-invalid={!!errors.categoryId}
                    className="bg-ds-bg-plain hover:border-ds-border-default data-popup-open:border-ds-border-primary data-popup-open:ring-ds-ring/50 w-full px-4 transition-shadow data-popup-open:ring-3"
                  >
                    <SelectValue placeholder={t('placeholders.category')} />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    align="start"
                    className="border-ds-border-muted max-h-72 min-w-(--anchor-width) border shadow-lg"
                  >
                    {categories.map((option) => (
                      <SelectItem key={option.id} value={option.id} className="cursor-pointer rounded-md">
                        {option.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>

        <div className="md:col-span-3">
          <Field label={t('fields.occasion')} required error={errorText(errors.occasionId?.message)}>
            <Controller
              control={control}
              name="occasionId"
              render={({ field }) => (
                <Select
                  items={occasions.map(({ id, title }) => ({ value: id, label: title }))}
                  value={field.value || null}
                  onValueChange={(value) => field.onChange(value ?? '')}
                >
                  <SelectTrigger
                    aria-invalid={!!errors.occasionId}
                    className="bg-ds-bg-plain hover:border-ds-border-default data-popup-open:border-ds-border-primary data-popup-open:ring-ds-ring/50 w-full px-4 transition-shadow data-popup-open:ring-3"
                  >
                    <SelectValue placeholder={t('placeholders.occasion')} />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    align="start"
                    className="border-ds-border-muted max-h-72 min-w-(--anchor-width) border shadow-lg"
                  >
                    {occasions.map((option) => (
                      <SelectItem key={option.id} value={option.id} className="cursor-pointer rounded-md">
                        {option.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>
      </div>
      <Button
        type="submit"
        loading={isSubmitting}
        loadingText={t('actions.saving')}
        className="mt-12 w-full md:mt-auto"
      >
        {mode === 'edit' ? t('actions.update') : t('actions.add')}
      </Button>
    </form>
  );
}
