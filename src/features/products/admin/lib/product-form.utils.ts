import type { IProductDetail } from '@/features/products/lib/types';
import type { ProductFormInput, ProductFormValues } from './product-form.schema';
import type { ProductMutationInput } from './types';

export function parseProductGallery(gallery?: string) {
  try {
    const parsed: unknown = JSON.parse(gallery ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((image): image is string => typeof image === 'string') : [];
  } catch {
    return [];
  }
}

export function getProductFormDefaults(product?: IProductDetail): ProductFormInput {
  const occasion = product?.occasions?.[0] as { id?: string } | undefined;

  return {
    title: product?.title ?? '',
    description: product?.description ?? '',
    price: product ? Number(product.price) : undefined,
    discountValue: product?.discountValue ? Number(product.discountValue) : '',
    stock: product?.stock,
    categoryId: product?.categoryId ?? '',
    occasionId: occasion?.id ?? '',
  };
}

export function buildProductPayload(
  values: ProductFormValues,
  cover: string | null,
  gallery: string[],
): ProductMutationInput {
  const discountValue = values.discountValue === '' || values.discountValue == null
    ? null
    : Number(values.discountValue);

  return {
    title: values.title.trim(),
    description: values.description.trim(),
    stock: Number(values.stock),
    price: Number(values.price),
    discountType: discountValue && discountValue > 0 ? 'FIXED' : null,
    discountValue,
    categoryId: values.categoryId,
    cover,
    gallery,
  };
}
