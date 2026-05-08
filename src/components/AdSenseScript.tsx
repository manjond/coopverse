'use client';

import { useEffect } from 'react';
import {
  COOKIE_CONSENT_ACCEPTED,
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
} from '@/lib/consent';

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

export function AdSenseScript() {
  useEffect(() => {
    if (!PUB_ID) return;

    const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUB_ID}`;
    const loadAds = () => {
      if (localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) !== COOKIE_CONSENT_ACCEPTED) {
        return;
      }
      if (document.querySelector(`script[src="${src}"]`)) return;

      const script = document.createElement('script');
      script.async = true;
      script.src = src;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    };

    loadAds();
    window.addEventListener(COOKIE_CONSENT_EVENT, loadAds);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, loadAds);
  }, []);

  return null;
}
