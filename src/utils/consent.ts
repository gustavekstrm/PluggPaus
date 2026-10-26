import { readString, writeString } from './safeStorage';

/**
 * Cookiesamtycke.
 *
 * index.html sätter Google Consent Mode till "denied" och ber AdSense om
 * icke-personanpassade annonser INNAN några Google-skript laddas, och laddar
 * Google Analytics bara om besökaren redan godkänt. Den här modulen hanterar
 * valet efteråt: sparar det, skickar consent-update och laddar Analytics vid
 * godkännande.
 */
export type ConsentChoice = 'accepted' | 'declined';

const KEY = 'cookiesAccepted';
export const CONSENT_EVENT = 'pp-consent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ppLoadAnalytics?: () => void;
  }
}

export function getConsent(): ConsentChoice | null {
  const v = readString(KEY);
  return v === 'accepted' || v === 'declined' ? v : null;
}

export function setConsent(choice: ConsentChoice): void {
  const previous = getConsent();
  writeString(KEY, choice);

  const v = choice === 'accepted' ? 'granted' : 'denied';
  window.gtag?.('consent', 'update', {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v,
  });
  const ads = (window.adsbygoogle = window.adsbygoogle || []) as unknown[] & { requestNonPersonalizedAds?: number };
  ads.requestNonPersonalizedAds = choice === 'accepted' ? 0 : 1;

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));

  if (choice === 'accepted') {
    window.ppLoadAnalytics?.();
  } else if (previous === 'accepted') {
    // Analytics-skriptet går inte att ladda ur när det väl körs. En omladdning
    // startar om sidan utan det.
    window.location.reload();
  }
}
