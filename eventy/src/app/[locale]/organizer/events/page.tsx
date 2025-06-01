'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrganizerEventsGrid } from '@/components/organizer/events/OrganizerEventsGrid';
import { useOrganizerEvents } from '@/lib/hooks/useOrganizerEvents';
import { URLS } from '@/components/shared/Navigation/urls';

export default function OrganizerEventsPage() {
  const t = useTranslations('OrganizerEventsPage');

  const {
    data: events = { upcoming: [], past: [] },
    isLoading,
    error,
  } = useOrganizerEvents();

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center py-12'>
          <h2 className='text-xl font-semibold text-destructive mb-2'>
            {t('errorTitle')}
          </h2>
          <p className='text-muted-foreground'>{t('errorDescription')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>
            {t('pageTitle')}
          </h1>
          <p className='text-muted-foreground mt-2'>{t('pageDescription')}</p>
        </div>

        <Button asChild className='bg-primary hover:bg-primary/90'>
          <Link href={URLS.ORGANIZER.EVENTS_NEW}>
            <Plus className='mr-2 h-4 w-4' />
            {t('createEvent')}
          </Link>
        </Button>
      </div>

      {/* Events Grid */}
      <OrganizerEventsGrid events={events} isLoading={isLoading} />
    </div>
  );
}
