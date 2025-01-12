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
import { shouldHideNavigation } from './utils';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname() || '';

  if (shouldHideNavigation(pathname)) {
    return (
      <div className='fixed top-4 right-4 z-50'>
        <LocaleSwitcher />
      </div>
    );
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
        <NavigationLinks pathname={pathname} />
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
                : 'text-muted-foreground hover:text-emerald-500 hover:bg-muted/10'
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
