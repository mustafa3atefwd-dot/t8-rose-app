import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import categoryAnn from '@/assets/images/category-anniversary.png';
import categoryEngagement from '@/assets/images/category-engagement.png';
import categoryWedding from '@/assets/images/category-wedding.png';

export function CategoryTrio() {
  const t = useTranslations('hero.categories');

  const CATEGORIES = [
    { id: 'wedding', image: categoryWedding, link: '/category/wedding' },
    { id: 'engagement', image: categoryEngagement, link: '/category/engagement' },
    { id: 'anniversary', image: categoryAnn, link: '/category/anniversary' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {CATEGORIES.map((cat) => (
        <Link key={cat.id} href={cat.link} className="group relative block h-72 w-full overflow-hidden rounded-2xl">
          <Image
            src={cat.image}
            alt={t(`${cat.id}.title`)}
            fill
            placeholder="blur"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <span className="text-maroon-600 bg-maroon-50 mb-2 inline-block w-fit rounded-md px-2 py-0.5 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
              {t(`${cat.id}.tag`)}
            </span>
            <h3 className="group-hover:text-maroon-500 text-2xl leading-snug font-semibold transition-all">
              {t(`${cat.id}.title`)}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
