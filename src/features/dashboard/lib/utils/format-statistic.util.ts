// Format a dashboard number for the active language
export function formatStatistic(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value);
}

// Format dashboard revenue and prices with their currency code
export function formatDashboardCurrency(value: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'code',
    maximumFractionDigits: 2,
  }).format(value);
}
