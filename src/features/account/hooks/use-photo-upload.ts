'use client';

import { ChangeEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { AccountApiError, accountApi } from '../lib/utils/account-api';
import type { UploadPayload } from '../lib/types/account';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export function usePhotoUpload(initialPhoto: string | null) {
  const t = useTranslations('account');
  const [photo, setPhoto] = useState(initialPhoto);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  function getImageValidationError(image: File) {
    if (!ALLOWED_IMAGE_TYPES.includes(image.type)) return t('errors.imageType');
    if (image.size > MAX_IMAGE_SIZE_BYTES) return t('errors.imageSize');
    return null;
  }

  async function uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image, image.name);

    const { payload } = await accountApi<UploadPayload>('/api/upload', { method: 'POST', body: formData });
    if (!payload?.url) throw new Error(t('errors.uploadUrl'));

    return payload.url;
  }

  function showUploadError(error: unknown) {
    if (error instanceof AccountApiError && error.status === 413) {
      toast.error(t('errors.imageTooLargeTitle'), { description: t('errors.imageTooLargeDescription') });
    } else {
      toast.error((error as Error).message);
    }
  }

  async function uploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const image = input.files?.[0];

    if (!image) return;

    const validationError = getImageValidationError(image);
    if (validationError) {
      toast.error(validationError);
      input.value = '';
      return;
    }

    setUploading(true);

    try {
      const url = await uploadImage(image);

      const localPreview = URL.createObjectURL(image);
      if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
      setPreview(localPreview);

      // Keep this backend-relative temporary URL unchanged. The backend consumes
      // it when PATCH /users/profile is submitted.
      setPhoto(url);
      toast.success(t('messages.photoUploaded'));
    } catch (e) {
      showUploadError(e);
    } finally {
      setUploading(false);
      input.value = '';
    }
  }

  return { photo, preview, uploading, uploadPhoto };
}
