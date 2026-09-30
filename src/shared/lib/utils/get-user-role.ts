import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth';
import { UserRole } from '@/shared/lib/types/user';

export async function getUserRole(): Promise<UserRole | null> {
  const session = await getServerSession(authOptions);

  return session?.user?.role ?? null;
}
