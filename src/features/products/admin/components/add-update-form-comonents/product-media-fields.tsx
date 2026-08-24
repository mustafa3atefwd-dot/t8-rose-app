'use client';

import { ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { FileInput } from '@/shared/components/ui/inputs/file-input';
import type { IProductDetail } from '@/features/products/lib/types';
import type { ProductFormMode } from '../../hooks/use-product-form';
import { ProductFormField } from './product-form-field';

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
type Props = {
  mode: ProductFormMode;
  product?: IProductDetail;
  existingGallery: string[];
  coverError: string;
  galleryError: string;
  onCoverChange: (files: File[]) => void;
  onGalleryChange: (files: File[]) => void;
  onCoverError: (reason: 'type' | 'size') => void;
  onGalleryError: (reason: 'type' | 'size') => void;
};

export function ProductMediaFields(props: Props) {
  // Translation
  const t = useTranslations('productsAdmin');

  // Variables
  const firstGalleryImage = props.existingGallery[0];

  if (props.mode === 'edit')
    return (
      <div className="flex flex-wrap gap-2 md:col-span-3 md:justify-end">
        {props.product?.cover && <MediaLink href={props.product.cover} label={t('actions.viewCover')} />}
        {firstGalleryImage && <MediaLink href={firstGalleryImage} label={t('actions.viewGallery')} />}
      </div>
    );

  return (
    <div className="col-span-full grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <ProductFormField label={t('fields.cover')} required error={props.coverError}>
        <FileInput
          accept="image/*"
          className="w-full"
          maxSize={MAX_IMAGE_SIZE_BYTES}
          placeholder=""
          uploadLabel={t('actions.upload')}
          invalid={Boolean(props.coverError)}
          onError={props.onCoverError}
          onFilesChange={props.onCoverChange}
        />
      </ProductFormField>
      <ProductFormField label={t('fields.gallery')} required error={props.galleryError}>
        <FileInput
          accept="image/*"
          multiple
          className="w-full"
          maxSize={MAX_IMAGE_SIZE_BYTES}
          placeholder=""
          uploadLabel={t('actions.upload')}
          invalid={Boolean(props.galleryError)}
          onError={props.onGalleryError}
          onFilesChange={props.onGalleryChange}
        />
      </ProductFormField>
    </div>
  );
}

function MediaLink({ href, label }: { href: string; label: string }) {
  return (
    <Button asChild variant="outline">
      <Link target="_blank" href={href}>
        <ImageIcon /> {label}
      </Link>
    </Button>
  );
}
