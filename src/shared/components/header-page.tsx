import Image from 'next/image';
import roseLogo from '../../assets/images/roseLogo.png';
import { ClipboardList, Gift, Headset, House, Info, Menu, PartyPopper, ShoppingCart } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { LanguageToggle } from '@/features/auth/components/LanguageToggle';
import UnAuthenticatedLogin from '@/features/auth/components/unauth-login';
import { WishlistHeaderLink } from '@/features/wishlist';
import NotificationsMenu from '@/features/notifications/components/notifications-menu';
import CartBadge from '@/features/cart/components/cart-badge';
import SearchInput from './search-input';
import UserAddress from './user-address';
import { ThemeToggle } from './ThemeToggle';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

const navigationItems = [
  { href: '/', label: 'home', icon: House },
  { href: '/products', label: 'products', icon: Gift },
  { href: '/categories', label: 'categories', icon: ClipboardList },
  { href: '/occasions', label: 'occasions', icon: PartyPopper },
  { href: '/contact', label: 'contact', icon: Headset },
  { href: '/about', label: 'about', icon: Info },
] as const;

export default function Header() {
  const t = useTranslations('home.header');
  const locale = useLocale();

  return (
    <header className="border-ds-border-soft bg-ds-bg-plain text-ds-text-plain border-b shadow-sm">
      <div className="container mx-auto flex min-h-18 items-center gap-3 px-4 py-3 lg:min-h-22 lg:gap-5 lg:px-6">
        <Link
          href="/"
          className="focus-visible:ring-ds-ring shrink-0 rounded-xl focus-visible:ring-2 focus-visible:outline-none"
        >
          <Image className="size-14 object-contain lg:size-20" src={roseLogo} alt={t('logoAlt')} priority />
        </Link>

        <div className="hidden shrink-0 xl:block">
          <UserAddress />
        </div>
        <div className="hidden min-w-0 flex-1 md:block">
          <SearchInput className="h-12 lg:h-13" />
        </div>

        <div className="ml-auto hidden shrink-0 items-center lg:flex rtl:mr-auto rtl:ml-0">
          <UnAuthenticatedLogin />
          <div className="border-ds-border-soft flex h-12 items-center gap-3 border-x px-4">
            <WishlistHeaderLink />
            <Link className="relative rounded-md p-1" href="/cart" aria-label={t('cart')}>
              <ShoppingCart className="size-5" />
              <CartBadge />
            </Link>
            <NotificationsMenu />
          </div>
          <div className="flex items-center gap-1 ps-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1 lg:hidden rtl:mr-auto rtl:ml-0">
          <Link
            className="hover:bg-ds-bg-muted relative flex size-10 items-center justify-center rounded-xl transition-colors"
            href="/cart"
            aria-label={t('cart')}
          >
            <ShoppingCart className="size-5" />
            <CartBadge />
          </Link>
          <ThemeToggle />

          <Sheet>
            <SheetTrigger
              aria-label={t('menu')}
              className="hover:bg-ds-bg-muted focus-visible:ring-ds-ring flex size-10 cursor-pointer items-center justify-center rounded-xl transition-colors outline-none focus-visible:ring-2"
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent
              side={locale === 'ar' ? 'left' : 'right'}
              className="border-ds-border-soft bg-ds-bg-plain text-ds-text-plain w-[min(88vw,22rem)] gap-0"
            >
              <SheetHeader className="border-ds-border-soft border-b px-5 py-5">
                <div className="flex items-center gap-3">
                  <Image className="size-12 object-contain" src={roseLogo} alt="" />
                  <SheetTitle className="text-ds-text-primary text-lg font-bold">{t('navigation')}</SheetTitle>
                </div>
                <SheetDescription className="sr-only">{t('menuDescription')}</SheetDescription>
              </SheetHeader>

              <div className="border-ds-border-soft border-b px-5 py-4 xl:hidden">
                <UserAddress />
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label={t('navigation')}>
                {navigationItems.map(({ href, label, icon: Icon }) => (
                  <SheetClose
                    key={href}
                    render={
                      <Link
                        href={href}
                        className="hover:bg-ds-bg-primary-fade hover:text-ds-text-primary flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors"
                      />
                    }
                  >
                    <span className="bg-ds-bg-muted flex size-9 items-center justify-center rounded-lg">
                      <Icon className="size-5" />
                    </span>
                    {t(label)}
                  </SheetClose>
                ))}
              </nav>

              <div className="border-ds-border-soft bg-ds-bg-muted/50 space-y-3 border-t p-4">
                <UnAuthenticatedLogin />
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <WishlistHeaderLink />
                    <NotificationsMenu />
                  </div>
                  <LanguageToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-3 md:hidden">
        <SearchInput className="h-11" />
      </div>

      <nav
        className="bg-ds-bg-primary text-ds-text-inverse hidden min-h-11 items-center justify-center gap-1 px-4 lg:flex"
        aria-label={t('navigation')}
      >
        {navigationItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="hover:bg-ds-bg-primary-saturated flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors xl:text-base"
          >
            <Icon className="size-5" />
            {t(label)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
