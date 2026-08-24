'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import type { IProductDetail } from '@/features/products/lib/types';
import { productFormSchema, type ProductFormInput, type ProductFormValues } from '../lib/product-form.schema';
import { buildProductPayload, getProductFormDefaults, parseProductGallery } from '../lib/product-form.utils';

import { uploadProductImage } from '../lib/upload-product-image';
import { createProduct, updateProduct } from '../api/create-update-products.api';

export type ProductFormMode = 'create' | 'edit';

type UseProductFormOptions = {
  mode: ProductFormMode;
  product?: IProductDetail;
};

export function useProductForm({ mode, product }: UseProductFormOptions) {
  // Translation
  const t = useTranslations('productsAdmin');

  // Navigation
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();

  // State
  const [coverFiles, setCoverFiles] = useState<File[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [coverError, setCoverError] = useState('');
  const [galleryError, setGalleryError] = useState('');

  // Form
  const form = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: getProductFormDefaults(product),
  });

  // Variables
  const existingGallery = useMemo(() => parseProductGallery(product?.gallery), [product?.gallery]);
  const [priceValue, discountValue] = useWatch({ control: form.control, name: ['price', 'discountValue'] });
  const discountedPrice = Math.max(0, (Number(priceValue) || 0) - (Number(discountValue) || 0));

  // Functions
  const translateError = (message?: string) => (message ? t(message as never) : undefined);
  const handleCoverChange = (files: File[]) => { setCoverFiles(files); setCoverError(''); };
  const handleGalleryChange = (files: File[]) => { setGalleryFiles(files); setGalleryError(''); };
  const handleCoverError = (reason: 'type' | 'size') => setCoverError(getFileError(reason));
  const handleGalleryError = (reason: 'type' | 'size') => setGalleryError(getFileError(reason));

  const submitProduct = form.handleSubmit(async (values) => {
    if (!hasRequiredCreateImages()) return;

    try {
      const [cover, gallery] = await uploadSelectedImages();
      const payload = buildProductPayload(values, cover, gallery);

      if (mode === 'edit' && product) await updateProduct(product.id, payload);
      else await createProduct(payload);

      toast.success(mode === 'edit' ? t('messages.updated') : t('messages.created'));
      router.push(`/${locale}/dashboard/products`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('messages.saveError'));
    }
  });

  function getFileError(reason: 'type' | 'size') {
    return reason === 'type' ? t('validation.imagesOnly') : t('validation.imageSize');
  }

  function hasRequiredCreateImages() {
    if (mode === 'edit') return true;
    if (!coverFiles.length) setCoverError(t('validation.coverRequired'));
    if (!galleryFiles.length) setGalleryError(t('validation.galleryRequired'));
    return coverFiles.length > 0 && galleryFiles.length > 0;
  }

  async function uploadSelectedImages() {
    const cover = coverFiles[0]
      ? await uploadFile(coverFiles[0])
      : (product?.cover ?? null);
    const gallery = galleryFiles.length
      ? await Promise.all(galleryFiles.map(uploadFile))
      : existingGallery;
    return [cover, gallery] as const;
  }

  function uploadFile(file: File) {
    return uploadProductImage({
      file,
      fallbackMessage: t('messages.uploadError', { name: file.name }),
      tooLargeMessage: t('messages.imageTooLarge'),
    });
  }

  return {
    t,
    form,
    discountedPrice,
    existingGallery,
    coverError,
    galleryError,
    translateError,
    handleCoverChange,
    handleGalleryChange,
    handleCoverError,
    handleGalleryError,
    submitProduct,
  };
}
