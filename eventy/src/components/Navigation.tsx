'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LocaleSwitcher from './LocaleSwitcher';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const URLS = {
  HOME: '/',
  EVENTS: '/events',
  SUBSCRIBERS: '/subscribers',
  OPEN_SPACE: '/open-space',
  LOGIN: '/login',
  REGISTER: '/register',
};

const HIDDEN_NAVIGATION_PATHS = [URLS.LOGIN, URLS.REGISTER];

function shouldHideNavigation(pathname: string): boolean {
  return HIDDEN_NAVIGATION_PATHS.some((path) => pathname.includes(path));
}

const NAV_LINKS = [
  { href: URLS.HOME, labelKey: 'home' },
  { href: URLS.EVENTS, labelKey: 'events' },
  { href: URLS.SUBSCRIBERS, labelKey: 'subscribers' },
  { href: URLS.OPEN_SPACE, labelKey: 'openSpace' },
];

type NavigationLinksProps = {
  pathname: string;
  t: (key: string) => string;
};

function NavigationLinks({ pathname, t }: NavigationLinksProps) {
  return (
    <div className='flex items-center gap-1'>
      {NAV_LINKS.map(({ href, labelKey }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:text-white',
            pathname === href
              ? 'bg-emerald-500 text-white'
              : 'text-muted-foreground'
          )}
        >
          {t(labelKey)}
        </Link>
      ))}
    </div>
  );
}

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname() || '';

  if (shouldHideNavigation(pathname)) {
    return null;
  }

  return (
    <div className='border-b border-white/10'>
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
            <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search ...'
              className='h-9 w-[200px] bg-white/5 pl-8 text-sm text-white placeholder:text-muted-foreground'
            />
          </div>
        </div>
        <NavigationLinks pathname={pathname} t={t} />
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='sm' className='text-muted-foreground'>
            <MapPin className='mr-2 h-4 w-4' />
            Location (City)
          </Button>
          <Link
            href={URLS.LOGIN}
            className={cn(
              'inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors',
              pathname === URLS.LOGIN
                ? 'bg-emerald-500 text-white'
                : 'text-muted-foreground hover:text-white'
            )}
          >
            {t('login')}
          </Link>
          <LocaleSwitcher />
        </div>
      </nav>
    </div>
  );
}
