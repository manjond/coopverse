import Script from 'next/script';

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
const ADSENSE_APPROVED = true;

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
