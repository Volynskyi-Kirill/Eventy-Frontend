import { LOCALES } from '@/lib/constants';
import { URLS } from './urls';

const HIDDEN_NAVIGATION_PATHS = [URLS.SHARED.LOGIN, URLS.SHARED.REGISTER];
const FIXED_NAVIGATION_PATHS = [URLS.CLIENT.HOME];
const DARK_NAVIGATION_PATHS = [URLS.CLIENT.HOME];

export function removeLocaleSegment(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0 && LOCALES.includes(segments[0])) {
    segments.shift();
  }

  const normalized = '/' + segments.join('/');
  return normalized;
}

export function shouldHideNavigation(pathname: string): boolean {
  const normalizedPath = removeLocaleSegment(pathname);
  return HIDDEN_NAVIGATION_PATHS.some((path) =>
    normalizedPath.startsWith(path)
  );
}

export function shouldUseFixedNav(pathname: string): boolean {
  const normalizedPath = removeLocaleSegment(pathname);
  return FIXED_NAVIGATION_PATHS.some((path) => normalizedPath === path);
}

export function shouldUseDarkNav(pathname: string): boolean {
  const normalizedPath = removeLocaleSegment(pathname);
  return DARK_NAVIGATION_PATHS.some((path) => normalizedPath === path);
}
