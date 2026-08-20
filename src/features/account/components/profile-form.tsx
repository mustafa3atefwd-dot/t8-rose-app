'use client';

import { useRef } from 'react';
import { Controller } from 'react-hook-form';
import { CheckCircle2, CloudUpload, Mail, UserRound } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import type { IUser } from '@/shared/lib/types/user';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/inputs/input';
import { PhoneInput } from '@/shared/components/ui/inputs/phone-input';
import { AccountField } from './account-field';
import { DeleteAccountDialog } from './delete-account-dialog';
import { useConfirmEmail } from '../hooks/use-confirm-email';
import { usePhotoUpload } from '../hooks/use-photo-upload';
import { useProfileForm } from '../hooks/use-profile-form';

interface ProfileFormProps {
  profile: IUser;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  // Translation
  const t = useTranslations('account');

  // Ref
  const fileRef = useRef<HTMLInputElement>(null);

  // Custom hooks
  const photoUpload = usePhotoUpload(profile.photo);
  const { form, mutation, saveProfile, awaitingCode, confirmedEmail } = useProfileForm(profile);
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const emailValue = form.watch('email');
  const confirmEmail = useConfirmEmail(emailValue, { onConfirmed: () => confirmedEmail(emailValue) });

  // Variables
  const displayPhoto = photoUpload.preview || photoUpload.photo;
  // Temporary upload URLs are Redis references for the PATCH request, not durable image URLs.
  const canRenderPhoto = displayPhoto && !displayPhoto.startsWith('/api/upload/temp/');

  return (
    <section id="profile" className="scroll-mt-24 sm:px-2">
      <form onSubmit={form.handleSubmit((values) => saveProfile(values, photoUpload.photo))}>
        <div className="mb-6 flex flex-col items-start gap-4 sm:mb-8 sm:flex-row sm:items-center sm:gap-5">
          <div className="relative shrink-0">
            <div className="bg-ds-bg-primary-fade text-ds-text-primary flex size-24 items-center justify-center overflow-hidden rounded-full">
              {canRenderPhoto ? (
                <Image
                  unoptimized={displayPhoto.startsWith('blob:')}
                  src={displayPhoto}
                  alt={t('profile.photoAlt')}
                  width={96}
                  height={96}
                  className="size-full object-cover"
                />
              ) : (
                <UserRound className="size-10" />
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="sr-only"
              onChange={photoUpload.uploadPhoto}
            />
            <Button
              type="button"
              variant="outline"
              loading={photoUpload.uploading}
              loadingText={t('profile.uploading')}
              onClick={() => fileRef.current?.click()}
              className="absolute right-0 bottom-0 size-9 rounded-full shadow-md"
              aria-label={t('profile.changePhoto')}
            >
              <CloudUpload className="size-5" />
            </Button>
          </div>
          <div>
            <h2 className="text-ds-text-plain text-lg font-semibold capitalize sm:text-xl">
              {t('profile.uploadPhoto')}
            </h2>
            <p className="text-ds-text-soft mt-1 text-sm leading-6 sm:mt-2 sm:text-base lg:text-lg">
              {t('profile.photoHint')}
            </p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <AccountField
            label={t('fields.firstName')}
            error={errors.firstName?.message}
            required
            {...register('firstName')}
          />
          <AccountField
            label={t('fields.lastName')}
            error={errors.lastName?.message}
            required
            {...register('lastName')}
          />
          <AccountField
            className="sm:col-span-2"
            label={t('fields.email')}
            type="email"
            error={errors.email?.message}
            required
            {...register('email')}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <label className="text-ds-text-plain grid gap-2 text-sm font-medium sm:col-span-2">
                {t('fields.phone')}
                <PhoneInput
                  value={field.value}
                  defaultCountry="EG"
                  countryLabel={t('fields.country')}
                  invalid={fieldState.invalid}
                  onValueChange={(value) => field.onChange(value)}
                />
                {fieldState.error && (
                  <span role="alert" className="text-ds-text-danger text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </label>
            )}
          />
          <AccountField
            className="sm:col-span-2"
            label={t('fields.gender')}
            value={profile.gender ? t(`gender.${profile.gender.toLowerCase()}`) : t('gender.unspecified')}
            disabled
          />
        </div>
        {awaitingCode && (
          <div className="border-ds-border-info bg-ds-bg-info-fade mt-5 rounded-xl border p-4">
            <div className="text-ds-text-info mb-3 flex items-center gap-2 text-sm font-medium">
              <Mail className="size-4" />
              {t('emailVerification.title')}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={confirmEmail.code}
                onChange={(e) => confirmEmail.setCode(e.target.value)}
                placeholder={t('emailVerification.placeholder')}
                inputMode="numeric"
              />
              <Button
                type="button"
                loading={confirmEmail.mutation.isPending}
                disabled={!confirmEmail.code.trim()}
                onClick={confirmEmail.confirmEmail}
              >
                <CheckCircle2 />
                {t('emailVerification.confirm')}
              </Button>
            </div>
          </div>
        )}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:justify-between">
          <DeleteAccountDialog />
          <Button
            type="submit"
            loading={mutation.isPending}
            loadingText={t('actions.saving')}
            className="w-full sm:w-auto"
          >
            {t('actions.save')}
          </Button>
        </div>
      </form>
    </section>
  );
}
