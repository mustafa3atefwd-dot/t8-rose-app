import type { IUser } from '@/shared/lib/types/user';
import { ProfileForm } from './profile-form';
import { getTranslations } from 'next-intl/server';

interface AccountSettingsProps {
  profile: IUser;
}

export async function AccountSettings({ profile }: AccountSettingsProps) {
     // Translation
     const t = await getTranslations('account');
  return (
    <div>
      <h2 className='font-inter font-semibold text-2xl text-ds-text-plain mb-9'>{t('dashboard.title')}</h2>
      <div className="bg-ds-bg-plain space-y-6 rounded-2xl p-6 mb-35">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
