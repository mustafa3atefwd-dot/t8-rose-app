import { redirect } from '@/i18n/navigation';
import { getAccountProfile } from '@/features/account/lib/api/account.api';
import { AccountSettings } from '@/features/account/components/account-settings';

interface AccountPageProps {
  params: Promise<{ locale: string }>;
}

export default async function Account({ params }: AccountPageProps) {
  const { locale } = await params;
  const profile = await getAccountProfile();

  if (!profile) return redirect({ href: '/login', locale });

  return <AccountSettings profile={profile} />;
}
