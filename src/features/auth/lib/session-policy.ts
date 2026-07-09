export const REMEMBER_ME_SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

export function getRememberMeSessionMaxAge(rememberMe: boolean) {
  return rememberMe ? REMEMBER_ME_SESSION_MAX_AGE_SECONDS : undefined;
}
