import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Gift, HeartHandshake, Leaf, PackageCheck, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';

const values = [
  { key: 'thoughtful', icon: HeartHandshake },
  { key: 'quality', icon: PackageCheck },
  { key: 'lasting', icon: Leaf },
] as const;

export default async function About() {
  const t = await getTranslations('about');

  return (
    <main className="bg-ds-bg-plain text-ds-text-plain overflow-hidden">
      <section className="container mx-auto grid items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="order-2 flex flex-col items-start lg:order-1">
          <span className="bg-ds-bg-primary-fade text-ds-text-primary mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
            <Sparkles className="size-4" />
            {t('eyebrow')}
          </span>
          <h1 className="max-w-xl text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">
            {t.rich('heroTitle', {
              accent: (chunks) => <span className="text-ds-text-primary">{chunks}</span>,
            })}
          </h1>
          <p className="text-ds-text-muted mt-6 max-w-xl text-base leading-8 sm:text-lg">{t('heroDescription')}</p>
          <Button asChild className="mt-8 h-12 rounded-xl px-6">
            <Link href="/products">
              <Gift className="size-4" />
              {t('explore')}
            </Link>
          </Button>
        </div>

        <div className="relative order-1 mx-auto min-h-90 w-full max-w-xl lg:order-2 lg:min-h-130">
          <div className="bg-ds-bg-primary-fade absolute inset-6 rounded-[2.5rem]" />
          <div className="absolute inset-y-0 start-0 w-[72%] overflow-hidden rounded-[2rem] shadow-xl">
            <Image src="/images/about/about-1.jpg" alt={t('imageAlt.main')} fill className="object-cover" priority />
          </div>
          <div className="border-ds-border-plain bg-ds-bg-plain absolute end-0 bottom-4 h-44 w-[48%] overflow-hidden rounded-3xl border-4 shadow-xl sm:h-56">
            <Image src="/images/about/about-2.jpg" alt={t('imageAlt.detail')} fill className="object-cover" />
          </div>
          <div className="bg-ds-bg-primary-saturated text-ds-text-inverse absolute end-2 top-5 rounded-2xl px-4 py-3 shadow-lg">
            <p className="text-2xl font-bold">{t('yearsValue')}</p>
            <p className="text-xs opacity-85">{t('yearsLabel')}</p>
          </div>
        </div>
      </section>

      <section className="bg-ds-bg-muted border-ds-border-soft border-y">
        <div className="container mx-auto grid gap-8 px-4 py-10 text-center sm:grid-cols-3">
          {(['gifts', 'customers', 'occasions'] as const).map((key) => (
            <div key={key} className="flex flex-col gap-1">
              <strong className="text-ds-text-primary text-3xl font-bold">{t(`stats.${key}.value`)}</strong>
              <span className="text-ds-text-muted text-sm">{t(`stats.${key}.label`)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 lg:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-ds-text-secondary text-sm font-bold tracking-[0.2em] uppercase">
            {t('values.eyebrow')}
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t('values.title')}</h2>
          <p className="text-ds-text-muted mt-4 leading-7">{t('values.description')}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {values.map(({ key, icon: Icon }) => (
            <article
              key={key}
              className="border-ds-border-soft bg-ds-bg-plain group rounded-2xl border p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-ds-bg-primary-fade text-ds-text-primary mb-5 flex size-12 items-center justify-center rounded-2xl">
                <Icon className="size-6" />
              </div>
              <h3 className="text-xl font-semibold">{t(`values.items.${key}.title`)}</h3>
              <p className="text-ds-text-muted mt-3 leading-7">{t(`values.items.${key}.description`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-14 lg:pb-20">
        <div className="bg-ds-bg-primary-saturated text-ds-text-inverse relative overflow-hidden rounded-3xl px-6 py-10 text-center sm:px-10 lg:py-14">
          <Sparkles className="absolute -end-5 -top-5 size-32 opacity-10" />
          <h2 className="relative text-3xl font-bold">{t('cta.title')}</h2>
          <p className="relative mx-auto mt-3 max-w-xl opacity-85">{t('cta.description')}</p>
          <Button asChild variant="secondary" className="relative mt-7 h-11 rounded-xl px-6">
            <Link href="/contact">{t('cta.action')}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
