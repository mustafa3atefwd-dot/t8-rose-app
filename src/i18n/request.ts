import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { hasLocale } from 'next-intl';
 
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;


  const numberingSystem = locale === 'ar' ? 'arab' : 'latn';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    formats: {
      numbers: {
        'currency': {
          style: 'currency',
          currency: 'EGP',
          numberingSystem, 
        },
        'currency-full': {
          style: 'currency',
          currency: 'EGP',
          currencyDisplay: 'name',
          numberingSystem,
        },
        'currency-no-fraction': {
          style: 'currency',
          currency: 'EGP',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          numberingSystem,
        },
        'percent-base': {
          style: 'percent',
          numberingSystem,
        },
        'percent-no-fraction': {
          style: 'percent',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          numberingSystem,
        },
      },
      dateTime: {
        'time-only': {
          hour: '2-digit',   
          minute: '2-digit', 
          numberingSystem,
        },
        'date-day-month': {
          day: 'numeric',
          month: 'short',
          numberingSystem,
        }
      }
    }
  };
});