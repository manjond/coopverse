import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale-aware versions of Next.js' Link, redirect, useRouter, usePathname.
// Always import from here instead of 'next/link' so links auto-prefix /es or /en.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
