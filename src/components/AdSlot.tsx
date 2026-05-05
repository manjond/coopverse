'use client';

import { useEffect, useRef } from 'react';

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

/**
 * AdSense slot. Renders nothing until NEXT_PUBLIC_ADSENSE_PUB_ID is set.
 * To activate: add the pub ID to env vars and deploy — no code changes needed.
 */
export function AdSlot({ slot, format = 'auto', className = '' }: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!PUB_ID || !ref.current) return;
    try {
      // @ts-expect-error — adsbygoogle is injected globally by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // safe to ignore — happens if script hasn't loaded yet
    }
  }, []);

  if (!PUB_ID) return null;

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
