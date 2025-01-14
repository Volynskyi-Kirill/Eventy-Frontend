import { URLS } from './urls';

const HIDDEN_NAVIGATION_PATHS = [URLS.LOGIN, URLS.REGISTER];

export function shouldHideNavigation(pathname: string): boolean {
  return HIDDEN_NAVIGATION_PATHS.some((path) => pathname.includes(path));
}
