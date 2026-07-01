import type { ReactNode } from 'react';
import Image from 'next/image';
import Cover from '@/assets/images/Cover.svg';
import { LanguageToggle } from '../components/LanguageToggle';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

interface AuthLayoutProps {
  children: ReactNode;
}

export async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-background text-foreground flex min-h-screen">
      {/* Form column — start side (left in LTR, right in RTL) */}
      <div className="flex w-full flex-col px-6 py-10 sm:px-10 lg:w-1/2">
        <div className="flex items-center justify-end gap-5">
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">{children}</div>
      </div>

      {/* Decorative image column — hidden on mobile, end side */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden lg:flex">
        <Image src={Cover} alt="auth-photo" fill priority unoptimized className="object-cover" />
      </div>
    </div>
  );
}
