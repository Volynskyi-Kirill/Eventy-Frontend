'use client';

import { useTranslations } from 'next-intl';
import { OrganizerEventCard } from './OrganizerEventCard';
import { GroupedOrganizerEvents } from '@/lib/types/organizer-events.types';

interface OrganizerEventsGridProps {
  events: GroupedOrganizerEvents;
  isLoading: boolean;
}

export function OrganizerEventsGrid({
  events,
  isLoading,
}: OrganizerEventsGridProps) {
  const t = useTranslations('OrganizerEventsPage');

  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-12'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-lg text-muted-foreground'>{t('loading')}</p>
        </div>
      </div>
    );
  }

  const hasUpcomingEvents = events.upcoming.length > 0;
  const hasPastEvents = events.past.length > 0;
  const hasAnyEvents = hasUpcomingEvents || hasPastEvents;

  if (!hasAnyEvents) {
    return (
      <div className='text-center py-12'>
        <div className='max-w-md mx-auto'>
          <h3 className='text-xl font-semibold text-muted-foreground mb-2'>
            {t('noEventsTitle')}
          </h3>
          <p className='text-muted-foreground mb-6'>
            {t('noEventsDescription')}
          </p>
        </div>
      </div>
    );
  }

  const renderEventSection = (
    sectionEvents: typeof events.upcoming,
    sectionTitle: string,
    isPast = false
  ) => {
    if (sectionEvents.length === 0) return null;

    return (
      <div className='space-y-6'>
        <div className='border-b pb-2'>
          <h2
            className={`text-2xl font-bold ${
              isPast ? 'text-muted-foreground' : 'text-primary'
            }`}
          >
            {sectionTitle}
            <span className='ml-2 text-sm font-normal text-muted-foreground'>
              ({sectionEvents.length})
            </span>
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {sectionEvents.map((event) => (
            <OrganizerEventCard key={event.id} event={event} isPast={isPast} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='space-y-12'>
      {/* Upcoming Events Section */}
      {hasUpcomingEvents &&
        renderEventSection(events.upcoming, t('upcomingEvents'), false)}

      {/* Past Events Section */}
      {hasPastEvents && renderEventSection(events.past, t('pastEvents'), true)}
    </div>
  );
}
