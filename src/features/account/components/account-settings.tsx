import type { IUser } from '@/shared/lib/types/user';
import { ProfileForm } from './profile-form';

interface AccountSettingsProps {
  profile: IUser;
}

export function AccountSettings({ profile }: AccountSettingsProps) {
  return (
    <div className="space-y-6">
      <ProfileForm profile={profile} />
    </div>
  );
}
