import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import giftBoxes from '@/assets/images/gift-boxes.png';
import { Link } from '@/i18n/navigation';

export default function HeroBanner() {
  const t = useTranslations('hero');

  return (
    <div className="group relative flex h-full min-h-96 w-full flex-col justify-end gap-3 overflow-hidden rounded-2xl p-8 text-white">
      <Image
        src={giftBoxes}
        alt=""
        fill
        placeholder="blur"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 25vw"
      />
      <div className="absolute inset-0 z-10 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

      <div className="relative z-20">
        <span className="bg-maroon-50 text-maroon-600 mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md">
          {t('startingFrom')}
        </span>
        <h2 className="font-primary text-2xl leading-tight font-semibold tracking-tight">{t('specialGiftsTitle')}</h2>
      </div>
      <div className="relative z-20">
        <Button
          asChild
          className="bg-maroon-50 text-maroon-700 hover:bg-maroon-100 flex items-center gap-1.5 rounded-xl px-4 py-2.5 font-medium transition-all"
        >
          <Link href="/products">
            {t('shopNow')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
