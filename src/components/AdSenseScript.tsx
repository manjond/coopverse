import Script from 'next/script';

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
// Flip to true once Google approves the AdSense account.
// Until then the script causes 503 errors that slow page load.
const ADSENSE_APPROVED = false;

export function AdSenseScript() {
  if (!PUB_ID || !ADSENSE_APPROVED) return null;
  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUB_ID}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
