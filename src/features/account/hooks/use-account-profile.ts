'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import type { IUser } from '@/shared/lib/types/user';
import { AccountApiError, accountApi, jsonRequest } from '../lib/utils/account-api';
import type { ProfileForm, UploadPayload } from '../lib/types/account';

const emptyProfile: ProfileForm = { firstName: '', lastName: '', email: '', phone: '', gender: null, photo: null };

export function useAccountProfile() {
  const t = useTranslations('account');
  const { update: updateSession } = useSession();
  const [profile, setProfile] = useState(emptyProfile);
  const [originalEmail, setOriginalEmail] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [awaitingCode, setAwaitingCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [emailBusy, setEmailBusy] = useState(false);

  useEffect(() => {
    accountApi<{ user: IUser }>('/api/users/profile')
      .then(({ payload }) => {
        if (!payload?.user) throw new Error(t('errors.missingProfile'));
        const u = payload.user;
        setProfile({
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          phone: u.phone || '',
          gender: u.gender,
          photo: u.photo,
        });
        setOriginalEmail(u.email);
      })
      .catch((e: Error) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, [t]);

  const update = (key: keyof ProfileForm) => (event: ChangeEvent<HTMLInputElement>) =>
    setProfile((value) => ({ ...value, [key]: event.target.value }));
  const setPhone = (phone: string) => setProfile((value) => ({ ...value, phone }));

  async function uploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const image = input.files?.[0];

    if (!image) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(image.type)) {
      toast.error(t('errors.imageType'));
      input.value = '';
      return;
    }

    if (image.size > 5 * 1024 * 1024) {
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
      setProfile((value) => ({ ...value, photo: payload.url }));
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

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const result = await accountApi<{ user?: IUser }>(
        '/api/users/profile',
        jsonRequest(
          'PATCH',
          Object.fromEntries(
            Object.entries({
              firstName: profile.firstName.trim(),
              lastName: profile.lastName.trim(),
              phone: profile.phone?.trim(),
              gender: profile.gender || undefined,
              photo: profile.photo || undefined,
            }).filter(([, value]) => value !== undefined && value !== '')
          )
        )
      );
      const updatedUser = result.payload?.user;
      await updateSession({
        user: {
          ...(updatedUser || {}),
          firstName: updatedUser?.firstName || profile.firstName.trim(),
          lastName: updatedUser?.lastName || profile.lastName.trim(),
          phone: updatedUser?.phone ?? profile.phone?.trim() ?? null,
          photo: updatedUser?.photo ?? profile.photo,
        },
      });
      if (profile.email.trim() !== originalEmail) {
        await accountApi('/api/users/email/request', jsonRequest('POST', { email: profile.email.trim() }));
        setAwaitingCode(true);
        toast.success(t('messages.savedVerifyEmail'));
      } else toast.success(t('messages.saved'));
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function confirmEmail() {
    setEmailBusy(true);
    try {
      await accountApi(
        '/api/users/email/confirm',
        jsonRequest('POST', { email: profile.email.trim(), code: verificationCode.trim() })
      );
      setOriginalEmail(profile.email.trim());
      setAwaitingCode(false);
      setVerificationCode('');
      toast.success(t('messages.emailVerified'));
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setEmailBusy(false);
    }
  }

  async function deleteAccount() {
    if (!window.confirm(t('deleteConfirmation'))) return;
    try {
      await accountApi('/api/users/account', { method: 'DELETE' });
      toast.success(t('messages.deleted'));
      await signOut({ callbackUrl: '/' });
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  return {
    profile,
    preview,
    loading,
    saving,
    uploading,
    awaitingCode,
    verificationCode,
    emailBusy,
    setVerificationCode,
    update,
    setPhone,
    uploadPhoto,
    saveProfile,
    confirmEmail,
    deleteAccount,
  };
}
