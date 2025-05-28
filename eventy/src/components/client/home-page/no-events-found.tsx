'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { URLS } from '@/components/shared/Navigation/urls';
import { CalendarX } from 'lucide-react';

export function NoEventsFound() {
  const t = useTranslations('EventsPage');

  return (
    <div className='absolute top-0 left-0 h-[100dvh] w-full overflow-hidden z-0'>
      <div className='absolute inset-0 z-0'>
        <Image
          src='/home-page/background-event.png'
          alt='Background'
          fill
          className='object-cover'
          priority
        />
      </div>

      <div className='relative h-full z-10 flex flex-col items-center justify-center px-4 text-center'>
        <div className='bg-black/30 p-8 rounded-lg backdrop-blur-sm max-w-xl'>
          <CalendarX className='h-16 w-16 mx-auto mb-4 text-white/80' />
          <h1 className='text-3xl font-bold text-white mb-4'>
            {t('noUpcomingEvents')}
          </h1>
          <p className='text-white/80 text-lg mb-8'>{t('checkBackSoon')}</p>
          <Button
            className='bg-emerald-600 hover:bg-emerald-700 text-white mx-auto'
            asChild
          >
            <Link href={URLS.CLIENT.EVENTS}>{t('browseAllEvents')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
