import { useTranslations } from 'next-intl';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

export function FeaturesBar() {
  const t = useTranslations('hero.features');

  const FEATURES = [
    { id: 'delivery', icon: Truck },
    { id: 'refund', icon: RotateCcw },
    { id: 'payment', icon: ShieldCheck },
    { id: 'support', icon: Headphones },
  ];

  return (
    <div className="bg-maroon-50 grid w-full grid-cols-2 items-center gap-6 rounded-2xl p-10 md:grid-cols-4 md:gap-4 md:px-12 md:py-8 dark:bg-zinc-700">
      {FEATURES.map((feat) => {
        const Icon = feat.icon;
        return (
          <div key={feat.id} className="group flex items-center gap-4">
            <div className="bg-maroon-600 dark:bg-soft-pink-200 rounded-full p-3 text-white transition-transform duration-300 group-hover:scale-110 dark:text-zinc-800">
              <Icon className="h-10 w-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-maroon-600 dark:text-soft-pink-200 text-xl font-semibold md:text-base">
                {t(`${feat.id}.title`)}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-300">{t(`${feat.id}.desc`)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
