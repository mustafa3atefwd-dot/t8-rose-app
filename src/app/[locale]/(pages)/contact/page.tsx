import { getTranslations } from 'next-intl/server';
import { Clock3, Mail, MapPin, MessageCircleHeart, Phone, Send, Sparkles } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/inputs/input';
import { Textarea } from '@/shared/components/ui/textarea';

const contactItems = [
  { key: 'email', icon: Mail, href: 'mailto:support@rose.com' },
  { key: 'phone', icon: Phone, href: 'tel:+201000000000' },
  { key: 'location', icon: MapPin, href: 'https://maps.google.com/?q=Cairo,Egypt' },
  { key: 'hours', icon: Clock3 },
] as const;

export default async function Contact() {
  const t = await getTranslations('contact');

  return (
    <main className="bg-ds-bg-plain text-ds-text-plain">
      <section className="from-ds-bg-primary-fade via-ds-bg-plain to-ds-bg-secondary-fade relative overflow-hidden bg-linear-to-br">
        <Sparkles className="text-ds-text-secondary absolute start-[8%] top-8 size-10 opacity-30" />
        <MessageCircleHeart className="text-ds-text-primary absolute end-[8%] bottom-4 size-32 opacity-10" />
        <div className="container mx-auto px-4 py-14 text-center sm:py-20">
          <span className="bg-ds-bg-plain text-ds-text-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm">
            <MessageCircleHeart className="size-4" />
            {t('eyebrow')}
          </span>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="text-ds-text-muted mx-auto mt-4 max-w-2xl text-base leading-7 sm:text-lg">{t('description')}</p>
        </div>
      </section>

      <section className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:py-16">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">{t('details.title')}</h2>
          <p className="text-ds-text-muted mt-3 leading-7">{t('details.description')}</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {contactItems.map(({ key, icon: Icon, ...item }) => {
              const content = (
                <>
                  <span className="bg-ds-bg-primary-fade text-ds-text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="text-ds-text-muted block text-xs font-medium uppercase">
                      {t(`details.items.${key}.label`)}
                    </span>
                    <span className="mt-1 block text-sm font-semibold break-words">
                      {t(`details.items.${key}.value`)}
                    </span>
                  </span>
                </>
              );

              return 'href' in item ? (
                <a
                  key={key}
                  href={item.href}
                  target={key === 'location' ? '_blank' : undefined}
                  rel={key === 'location' ? 'noreferrer' : undefined}
                  className="border-ds-border-soft hover:bg-ds-bg-muted flex items-center gap-4 rounded-2xl border p-4 transition-colors"
                >
                  {content}
                </a>
              ) : (
                <div key={key} className="border-ds-border-soft flex items-center gap-4 rounded-2xl border p-4">
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-ds-border-soft bg-ds-bg-plain rounded-3xl border p-5 shadow-xl shadow-black/5 sm:p-8 dark:shadow-black/20">
          <div className="mb-7">
            <h2 className="text-2xl font-bold">{t('form.title')}</h2>
            <p className="text-ds-text-muted mt-2 text-sm leading-6">{t('form.description')}</p>
          </div>
          <form
            action="mailto:support@rose.com"
            method="post"
            encType="text/plain"
            className="grid gap-5 sm:grid-cols-2"
          >
            <label className="flex flex-col gap-2 text-sm font-medium">
              {t('form.name')}
              <Input name="name" required placeholder={t('form.namePlaceholder')} className="h-12 rounded-xl" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">
              {t('form.email')}
              <Input
                name="email"
                type="email"
                required
                placeholder={t('form.emailPlaceholder')}
                className="h-12 rounded-xl"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium sm:col-span-2">
              {t('form.subject')}
              <Input name="subject" required placeholder={t('form.subjectPlaceholder')} className="h-12 rounded-xl" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium sm:col-span-2">
              {t('form.message')}
              <Textarea
                name="message"
                required
                maxLength={1000}
                placeholder={t('form.messagePlaceholder')}
                className="min-h-36 rounded-xl"
              />
            </label>
            <Button type="submit" className="h-12 rounded-xl sm:col-span-2 sm:w-fit sm:px-7">
              {t('form.submit')}
              <Send className="size-4 rtl:rotate-180" />
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
