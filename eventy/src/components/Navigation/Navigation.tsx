'use client';

import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import LocaleSwitcher from '../LocaleSwitcher';
import { NavigationLinks } from './NavigationLinks';
import NavigationLogo from './NavigationLogo';
import { URLS } from './urls';
import { UserMenu } from './UserMenu';
import {
  shouldHideNavigation,
  shouldUseDarkNav,
  shouldUseFixedNav,
} from './utils';
import { RoleSwitcher } from './RoleSwitcher';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname() || '';
  const { isLoggedIn } = useAuthStore();

  if (shouldHideNavigation(pathname)) {
    return (
      <div className='fixed top-4 right-4 z-50'>
        <LocaleSwitcher />
      </div>
    );
  }

  const isFixed = shouldUseFixedNav(pathname);
  const isDarkBackground = shouldUseDarkNav(pathname);

  return (
    <div
      className={cn(
        'border-b mb-16',
        isDarkBackground ? 'border-white/10' : 'border-black/10'
      )}
    >
      <div className={cn(isFixed ? 'fixed top-0 left-0 right-0 z-50' : '')}>
        <nav className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-4'>
            <NavigationLogo isDarkBackground={isDarkBackground} />
            <RoleSwitcher isDarkBackground={isDarkBackground} />
          </div>
          <NavigationLinks
            pathname={pathname}
            isDarkBackground={isDarkBackground}
          />
          <div className='flex items-center gap-4'>
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <Link
                href={URLS.SHARED.LOGIN}
                className={cn(
                  'inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors',
                  isDarkBackground
                    ? 'text-white hover:bg-white/10 hover:text-emerald-500'
                    : 'text-black hover:bg-black/10 hover:text-emerald-500'
                )}
              >
                {t('login')}
              </Link>
            )}
            <LocaleSwitcher />
          </div>
        </nav>
      </div>
    </div>
  );
}
