import Script from 'next/script';

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

/**
 * Loads the AdSense script in the document head.
 * Add <AdSenseScript /> to the root layout once the account is approved.
 * Does nothing if NEXT_PUBLIC_ADSENSE_PUB_ID is not set.
 */
export function AdSenseScript() {
  if (!PUB_ID) return null;
  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUB_ID}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
