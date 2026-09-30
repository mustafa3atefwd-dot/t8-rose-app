/**
 * `libphonenumber-js` ships its typings as `.d.cts` files and its package
 * `exports` map declares no `"types"` condition for the `/max` subpath, so
 * TypeScript cannot resolve them under `moduleResolution: "bundler"`.
 * Declare the small surface the app actually uses.
 */
declare module 'libphonenumber-js/max' {
  export function isValidPhoneNumber(text: string, defaultCountry?: string): boolean;
}
