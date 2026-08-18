export function formatOrderPrice(value: number | string, locale: string) {
  const intlLocale = locale === 'ar' ? 'ar-EG' : 'en-EG';

  const parts = new Intl.NumberFormat(intlLocale, {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).formatToParts(Number(value));

  const number = parts
    .filter(({ type }) => ['integer', 'group', 'decimal'].includes(type))
    .map(({ value }) => value)
    .join('');

  const currency = parts
    .filter(({ type }) => type === 'currency')
    .map(({ value }) => value)
    .join('');

  return {
    number,
    currency,
  };
}

export function formatOrderDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date));
}
