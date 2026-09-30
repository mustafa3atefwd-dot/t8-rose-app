'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/shared/components/ui/inputs/input';
import { Textarea } from '@/shared/components/ui/textarea';
import type { ProductAdminForm } from '../lib/product-form.schema';
import type { ProductFormOption } from '../lib/types';
import { ProductFormField } from './product-form-field';
import { ProductSelectField } from './product-select-field';

type Props = { form: ProductAdminForm; categories: ProductFormOption[]; occasions: ProductFormOption[]; discountedPrice: number; translateError: (message?: string) => string | undefined; children?: React.ReactNode };

export function ProductDetailsFields({ form, categories, occasions, discountedPrice, translateError, children }: Props) {
  // Translation
  const t = useTranslations('productsAdmin');

  // Variables
  const { errors } = form.formState;
  return <>
    <ProductFormField label={t('fields.title')} required error={translateError(errors.title?.message)}><Input {...form.register('title')} aria-invalid={Boolean(errors.title)} placeholder={t('placeholders.title')} /></ProductFormField>
    <ProductFormField label={t('fields.description')} required error={translateError(errors.description?.message)} className="md:col-span-3"><Textarea {...form.register('description')} aria-invalid={Boolean(errors.description)} placeholder={t('placeholders.description')} className="max-h-52 min-h-36 resize-y overflow-y-auto" /></ProductFormField>
    <ProductFormField label={t('fields.price')} required error={translateError(errors.price?.message)}><Input {...form.register('price')} aria-invalid={Boolean(errors.price)} type="number" min="0" step="0.01" placeholder={t('placeholders.price')} /></ProductFormField>
    <ProductFormField label={t('fields.discount')} error={translateError(errors.discountValue?.message)}><Input {...form.register('discountValue')} aria-invalid={Boolean(errors.discountValue)} type="number" min="0" step="0.01" placeholder={t('placeholders.discount')} /></ProductFormField>
    <ProductFormField label={t('fields.discountedPrice')}><Input readOnly tabIndex={-1} value={discountedPrice || ''} type="number" aria-label={t('fields.discountedPrice')} className="bg-ds-bg-muted" placeholder={t('placeholders.discount')} /></ProductFormField>
    <ProductFormField label={t('fields.quantity')} required error={translateError(errors.stock?.message)} className="md:col-span-3"><Input {...form.register('stock')} aria-invalid={Boolean(errors.stock)} type="number" min="0" step="1" placeholder={t('placeholders.quantity')} /></ProductFormField>
    {children}
    <ProductSelectField form={form} name="categoryId" label={t('fields.category')} placeholder={t('placeholders.category')} options={categories} error={translateError(errors.categoryId?.message)} />
    <ProductSelectField form={form} name="occasionId" label={t('fields.occasion')} placeholder={t('placeholders.occasion')} options={occasions} error={translateError(errors.occasionId?.message)} />
  </>;
}
