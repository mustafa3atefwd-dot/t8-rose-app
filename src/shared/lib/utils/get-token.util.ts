import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getNextAuthToken() {
  const cookiesStore = await cookies();

  const cookieNames = [
    process.env.NEXTAUTH_SESSION_COOKIE,
    '__Secure-next-auth.session-token',
    'next-auth.session-token',
  ].filter((name): name is string => Boolean(name));

  const token = cookieNames.map((name) => cookiesStore.get(name)?.value).find(Boolean);

  if (!token) return null;

  try {
    const jwt = await decode({
      token,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    return typeof jwt?.accessToken === 'string' ? jwt.accessToken : null;
  } catch {
    return null;
  }
}
