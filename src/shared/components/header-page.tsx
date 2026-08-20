import Image from 'next/image';
import roseLogo from '../../assets/images/roseLogo.png';
import {

  ClipboardList,
  Gift,
  Headset,
  House,
  Info,
  PartyPopper,
  ShoppingCart,
} from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { LanguageToggle } from '@/features/auth/components/LanguageToggle';
import { useTranslations } from 'next-intl';
import SearchInput from './search-input';
import UserAddress from './user-address';
import UnAuthenticatedLogin from '@/features/auth/components/unauth-login';
import { ThemeToggle } from './ThemeToggle';
import { WishlistHeaderLink } from '@/features/wishlist';
import NotificationsMenu from '@/features/notifications/components/notifications-menu';
import HeaderBadge from './header-badge';
import CartBadge from '@/features/cart/components/cart-badge';
import PushNotificationButton from '@/features/notifications/components/push-notification-button';

export default function Header() {
  const t = useTranslations('home.header');

  return (
    <>
      {/* parent */}
      <div className="">
        {/* up */}
        <div className="flex h-22 items-center gap-4 pt-4.5 pr-9 pb-4.5 pl-9">
          {/* image */}

          <Image className="h-20 w-20.5" src={roseLogo} alt={t('logoAlt')} width={200} height={200} />

          {/* user address */}
          <UserAddress />
          {/* search */}
          <div className="relative flex flex-1 items-center">
            <SearchInput className="h-13" />
          </div>

          {/* login */}
          <div className="flex">
            <UnAuthenticatedLogin />

            {/* icons */}
            <div className="border-ds-border-soft flex h-13 w-31 items-center gap-2.5 border-r pr-4 pl-4 rtl:mr-7">
              <WishlistHeaderLink />
              <Link className='relative' href={'/cart'} aria-label={t('cart')}>
                <ShoppingCart />
                <CartBadge />
              </Link>
              <NotificationsMenu />
              <PushNotificationButton />
            </div>

            {/* language */}
            <div className="border-l-ds-bg-muted mr-2 flex h-13 w-15 items-center gap-2.5 border-l pl-4 rtl:mr-1 rtl:ml-2">
              <LanguageToggle />
            </div>

            {/* theme toggle */}
            <ThemeToggle />
          </div>
        </div>

        {/* dwon */}
        <div className="bg-ds-bg-primary dark:text-maroon-800 flex h-11 items-center justify-center space-x-4 text-white">
          <div className="flex items-center gap-2 p-3">
            <House className="h-5 w-5" />
            <Link
              href={'/'}
              className="cursor-pointer align-middle text-base leading-[100%] font-medium tracking-normal"
            >
              {t('home')}
            </Link>
          </div>

          <div className="flex items-center gap-2 p-3">
            <Gift className="h-5 w-5" />
            <Link
              href={'/products'}
              className="cursor-pointer align-middle text-base leading-[100%] font-medium tracking-normal"
            >
              {t('products')}
            </Link>
          </div>

          <div className="flex items-center gap-2 p-3">
            <ClipboardList className="h-5 w-5" />
            <Link
              href={'/categories'}
              className="cursor-pointer align-middle text-base leading-[100%] font-medium tracking-normal"
            >
              {t('categories')}
            </Link>
          </div>

          <div className="flex items-center gap-2 p-3">
            <PartyPopper className="h-5 w-5" />
            <Link
              href={'/occasions'}
              className="cursor-pointer align-middle text-base leading-[100%] font-medium tracking-normal"
            >
              {t('occasions')}
            </Link>
          </div>

          <div className="flex items-center gap-2 p-3">
            <Headset className="h-5 w-5" />
            <Link
              href={'/contact'}
              className="cursor-pointer align-middle text-base leading-[100%] font-medium tracking-normal"
            >
              {t('contact')}
            </Link>
          </div>
          <div className="flex items-center gap-2 p-3">
            <Info className="h-5 w-5" />
            <Link
              href={'/about'}
              className="cursor-pointer align-middle text-base leading-[100%] font-medium tracking-normal"
            >
              {t('about')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
