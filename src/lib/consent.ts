export const COOKIE_CONSENT_STORAGE_KEY = 'coopverse_cookie_consent_v1';
export const COOKIE_CONSENT_EVENT = 'coopverse:cookie-consent';
export const COOKIE_CONSENT_ACCEPTED = 'accepted';
export const COOKIE_CONSENT_REJECTED = 'rejected';

export type CookieConsentChoice =
  | typeof COOKIE_CONSENT_ACCEPTED
  | typeof COOKIE_CONSENT_REJECTED;
