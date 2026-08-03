import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getNextAuthToken() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get(process.env.NEXTAUTH_SESSION_COOKIE!)?.value;

  if (!token) return null;

  const jwt = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return jwt?.accessToken as string | null;
}