type Country = {
  code: string;
  name: string;
  dial: string;
  flagUrl?: string;
  flag?: string;
};

const DEFAULT_COUNTRIES: Country[] = [
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "KW", name: "Kuwait", dial: "+965" },
  { code: "QA", name: "Qatar", dial: "+974" },
  { code: "JO", name: "Jordan", dial: "+962" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "DE", name: "Germany", dial: "+49" },
];

/** E.164: leading "+", country digit 1-9, then up to 14 more digits. */
function isValidE164(value: string) {
  return /^\+[1-9]\d{1,14}$/.test(value);
}

export { DEFAULT_COUNTRIES, isValidE164 };
export type { Country };
