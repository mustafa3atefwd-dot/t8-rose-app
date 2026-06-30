type Country = {
  code: string;
  name: string;
  dial: string;
  flag: string;
};

const DEFAULT_COUNTRIES: Country[] = [
  { code: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬" },
  { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { code: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
  { code: "KW", name: "Kuwait", dial: "+965", flag: "🇰🇼" },
  { code: "QA", name: "Qatar", dial: "+974", flag: "🇶🇦" },
  { code: "JO", name: "Jordan", dial: "+962", flag: "🇯🇴" },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
];

/** E.164: leading "+", country digit 1-9, then up to 14 more digits. */
function isValidE164(value: string) {
  return /^\+[1-9]\d{1,14}$/.test(value);
}

export { DEFAULT_COUNTRIES, isValidE164 };
export type { Country };
