'use client';

import { useEffect, useRef, useState } from 'react';
import {
  COOKIE_CONSENT_ACCEPTED,
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
} from '@/lib/consent';

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

/**
 * AdSense slot. Renders nothing until ads are configured and the user
 * has accepted advertising cookies.
 */
export function AdSlot({ slot, format = 'auto', className = '' }: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    if (!PUB_ID) return;

    const syncConsent = () => {
      setHasConsent(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === COOKIE_CONSENT_ACCEPTED);
    };

    const timer = window.setTimeout(syncConsent, 0);
    window.addEventListener(COOKIE_CONSENT_EVENT, syncConsent);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(COOKIE_CONSENT_EVENT, syncConsent);
    };
  }, []);

  useEffect(() => {
    if (!PUB_ID || !hasConsent || !ref.current) return;
    try {
      // @ts-expect-error adsbygoogle is injected globally by the AdSense script.
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Safe to ignore if the third-party script is still loading.
    }
  }, [hasConsent]);

  if (!PUB_ID || !hasConsent) return null;

  return (
    <div className={className}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUB_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
