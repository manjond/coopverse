// AdSense script injected via dangerouslySetInnerHTML to avoid
// Next.js adding data-nscript attribute which AdSense warns about.
const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

export function AdSenseScript() {
  if (!PUB_ID) return null;
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUB_ID}`}
      crossOrigin="anonymous"
    />
  );
}
