'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { MapPin, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import LocaleSwitcher from '../LocaleSwitcher';
import { NavigationLinks } from './NavigationLinks';
import { URLS } from './urls';
import {
  shouldHideNavigation,
  shouldUseDarkNav,
  shouldUseFixedNav,
} from './utils';
import { UserMenu } from './UserMenu';
import { useAuthStore } from '@/store/authStore';

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
  console.log('isDarkBackground: ', isDarkBackground);

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
            <Link href={URLS.HOME} className='flex items-center'>
              <Image
                src='/subscribers/logo-nav.svg'
                alt='Company Logo'
                width={30}
                height={26}
              />
            </Link>
            <div className='relative'>
              <Search
                className={cn(
                  'absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2',
                  isDarkBackground ? 'text-white' : 'text-black'
                )}
              />
              <Input
                type='search'
                placeholder='Search ...'
                className={cn(
                  'h-9 w-[200px] pl-8 text-sm placeholder:text-muted-foreground',
                  isDarkBackground
                    ? 'bg-white/10 text-white placeholder:text-white/50'
                    : 'bg-black/10 text-black placeholder:text-black/50'
                )}
              />
            </div>
          </div>
          <NavigationLinks
            pathname={pathname}
            isDarkBackground={isDarkBackground}
          />
          <div className='flex items-center gap-4'>
            <Button
              variant='ghost'
              size='sm'
              className={cn(
                'flex items-center gap-2',
                isDarkBackground ? 'text-white' : 'text-black'
              )}
            >
              <MapPin className='mr-2 h-4 w-4' />
              Location (City)
            </Button>
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <Link
                href={URLS.LOGIN}
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
