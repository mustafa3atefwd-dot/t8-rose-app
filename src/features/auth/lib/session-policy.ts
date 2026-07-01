export const REMEMBER_ME_SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;
export const BROWSER_SESSION_STORAGE_KEY = "rose.auth.browser-session";

export function getRememberMeSessionMaxAge(rememberMe: boolean) {
  return rememberMe ? REMEMBER_ME_SESSION_MAX_AGE_SECONDS : undefined;
}

export function markBrowserSessionActive() {
  window.sessionStorage.setItem(BROWSER_SESSION_STORAGE_KEY, "active");
}

export function hasActiveBrowserSession() {
  return window.sessionStorage.getItem(BROWSER_SESSION_STORAGE_KEY) === "active";
}
