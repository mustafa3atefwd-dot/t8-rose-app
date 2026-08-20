import { ChangePasswordForm } from '@/features/account/components/change-password-form';

interface ChangePasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ChangePasswordPage({ searchParams }: ChangePasswordPageProps) {
  const { token = '' } = await searchParams;
  return <ChangePasswordForm token={token} />;
}
