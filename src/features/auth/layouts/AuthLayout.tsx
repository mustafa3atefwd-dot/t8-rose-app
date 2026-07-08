import type { ReactNode } from 'react';
import Image from 'next/image';
import Cover from '@/assets/images/Cover.svg';
import SeparatorLight from '@/assets/images/separator-light.png';
import SeparatorDark from '@/assets/images/separator-dark.png';
import { AuthHeading } from '../components/AuthHeading';
import { LanguageToggle } from '../components/LanguageToggle';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

interface AuthLayoutProps {
  children: ReactNode;
}

/** Decorative ornament — maroon in light mode, soft-pink in dark mode. */
function FormSeparator({ flip = false }: { flip?: boolean }) {
  const flipClass = flip ? '-scale-y-100' : '';
  return (
    <>
      <Image src={SeparatorLight} alt="" aria-hidden className={`h-auto w-70 select-none dark:hidden ${flipClass}`} />
      <Image src={SeparatorDark} alt="" aria-hidden className={`hidden h-auto w-70 select-none dark:block ${flipClass}`} />
    </>
  );
}

/** Two-column auth shell — branded form on the start side, cover image on the end side. */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-background text-foreground flex min-h-screen">
      {/* Form column — start side (left in LTR, right in RTL) */}
      <div className="flex w-full flex-col px-6 py-10 sm:px-10 lg:w-1/2">
        {/* Top bar — theme & language toggles */}
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <LanguageToggle />
        </div>

        {/* Centered content — ornament, heading, form fields, ornament */}
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <FormSeparator />
          <AuthHeading />
          {children}
          <FormSeparator flip />
        </div>
      </div>

      {/* Decorative image column — hidden on mobile, end side */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden lg:flex">
        <Image src={Cover} alt="auth-photo" fill priority unoptimized className="object-cover" />
      </div>
    </div>
  );
}
