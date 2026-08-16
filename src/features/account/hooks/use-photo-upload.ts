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

  async function uploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const image = input.files?.[0];

    if (!image) return;

    if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
      toast.error(t('errors.imageType'));
      input.value = '';
      return;
    }

    if (image.size > MAX_IMAGE_SIZE_BYTES) {
      toast.error(t('errors.imageSize'));
      input.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('image', image, image.name);

    setUploading(true);

    try {
      const { payload } = await accountApi<UploadPayload>('/api/upload', { method: 'POST', body: formData });

      if (!payload?.url) throw new Error(t('errors.uploadUrl'));

      const localPreview = URL.createObjectURL(image);
      if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
      setPreview(localPreview);

      // Keep this backend-relative temporary URL unchanged. The backend consumes
      // it when PATCH /users/profile is submitted.
      setPhoto(payload.url);
      toast.success(t('messages.photoUploaded'));
    } catch (e) {
      if (e instanceof AccountApiError && e.status === 413) {
        toast.error(t('errors.imageTooLargeTitle'), {
          description: t('errors.imageTooLargeDescription'),
        });
      } else {
        toast.error((e as Error).message);
      }
    } finally {
      setUploading(false);
      input.value = '';
    }
  }

  return { photo, preview, uploading, uploadPhoto };
}
