/**
 * Safely serialize an object for use in <script type="application/ld+json">.
 *
 * JSON.stringify does NOT escape the sequence </ which allows a string value
 * like "</script><script>alert(1)</script>" to break out of the script tag and
 * execute arbitrary JS (XSS). Replacing </ with <\/ is the standard fix —
 * the browser parser treats it as a literal forward-slash, JSON.parse reads
 * it back correctly, and the XSS vector is closed.
 */
export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/<\//g, '<\\/');
}
