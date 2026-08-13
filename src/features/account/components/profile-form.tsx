'use client';

import { useRef } from 'react';
import { Camera, CheckCircle2, Mail, Trash2, UserRound } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/inputs/input';
import { PhoneInput } from '@/shared/components/ui/inputs/phone-input';
import { AccountField } from './account-field';
import { useAccountProfile } from '../hooks/use-account-profile';

export function ProfileForm() {
  const t = useTranslations('account');
  const fileRef = useRef<HTMLInputElement>(null);
  const account = useAccountProfile();
  if (account.loading)
    return <div className="bg-ds-bg-muted h-96 animate-pulse rounded-2xl" aria-label={t('loading')} />;

  const displayPhoto = account.preview || account.profile.photo;
  // Temporary upload URLs are Redis references for the PATCH request, not durable image URLs.
  const canRenderPhoto = displayPhoto && !displayPhoto.startsWith('/api/upload/temp/');

  return (
    <section
      id="profile"
      className="border-ds-border-muted bg-ds-bg-plain scroll-mt-24 rounded-2xl border p-5 shadow-sm sm:p-8"
    >
      <header className="mb-7 flex items-center gap-3">
        <UserRound className="text-ds-text-primary size-5" />
        <div>
          <h2 className="text-ds-text-plain text-xl font-semibold">{t('profile.title')}</h2>
          <p className="text-ds-text-soft text-sm">{t('profile.description')}</p>
        </div>
      </header>
      <form onSubmit={account.saveProfile}>
        <div className="mb-8 flex items-center gap-5">
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
          <div>
            <input
              ref={fileRef}
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="sr-only"
              onChange={account.uploadPhoto}
            />
            <Button
              type="button"
              variant="outline"
              loading={account.uploading}
              loadingText={t('profile.uploading')}
              onClick={() => fileRef.current?.click()}
            >
              <Camera />
              {t('profile.changePhoto')}
            </Button>
            <p className="text-ds-text-muted mt-2 text-xs">{t('profile.photoHint')}</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <AccountField
            label={t('fields.firstName')}
            value={account.profile.firstName}
            onChange={account.update('firstName')}
            required
          />
          <AccountField
            label={t('fields.lastName')}
            value={account.profile.lastName}
            onChange={account.update('lastName')}
            required
          />
          <AccountField
            label={t('fields.email')}
            type="email"
            value={account.profile.email}
            onChange={account.update('email')}
            required
          />
          <label className="text-ds-text-plain grid gap-2 text-sm font-medium">
            {t('fields.phone')}
            <PhoneInput
              value={account.profile.phone || ''}
              defaultCountry="EG"
              countryLabel={t('fields.country')}
              onValueChange={(value) => account.setPhone(value)}
            />
          </label>
          <AccountField
            label={t('fields.gender')}
            value={
              account.profile.gender ? t(`gender.${account.profile.gender.toLowerCase()}`) : t('gender.unspecified')
            }
            disabled
          />
        </div>
        {account.awaitingCode && (
          <div className="border-ds-border-info bg-ds-bg-info-fade mt-5 rounded-xl border p-4">
            <div className="text-ds-text-info mb-3 flex items-center gap-2 text-sm font-medium">
              <Mail className="size-4" />
              {t('emailVerification.title')}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={account.verificationCode}
                onChange={(e) => account.setVerificationCode(e.target.value)}
                placeholder={t('emailVerification.placeholder')}
                inputMode="numeric"
              />
              <Button
                type="button"
                loading={account.emailBusy}
                disabled={!account.verificationCode.trim()}
                onClick={account.confirmEmail}
              >
                <CheckCircle2 />
                {t('emailVerification.confirm')}
              </Button>
            </div>
          </div>
        )}
        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <Button type="button" variant="ghost" className="text-ds-text-danger" onClick={account.deleteAccount}>
            <Trash2 />
            {t('actions.delete')}
          </Button>
          <Button type="submit" loading={account.saving} loadingText={t('actions.saving')}>
            {t('actions.save')}
          </Button>
        </div>
      </form>
    </section>
  );
}
