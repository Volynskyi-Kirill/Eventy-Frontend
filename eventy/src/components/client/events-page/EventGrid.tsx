import { useTranslations } from 'next-intl';
import { EventCard } from './EventCard';
import { EventGridProps } from './types';

export function EventGrid({ events, isLoading }: EventGridProps) {
  const t = useTranslations('EventsPage');

  const hasEvents = events.length > 0;

  if (isLoading) {
    return (
      <div className='col-span-full text-center py-10'>
        <p className='text-lg text-muted-foreground'>{t('loading')}</p>
      </div>
    );
  }

  if (!hasEvents) {
    return (
      <div className='col-span-full text-center py-10'>
        <p className='text-lg text-muted-foreground'>{t('noEventsFound')}</p>
      </div>
    );
  }

  // Separate upcoming and past events
  const currentDate = new Date();
  const upcomingEvents = events.filter((event) => {
    // Get the earliest event date for this event
    const eventDates = event.dates.map(
      (dateString: string) => new Date(dateString)
    );
    const earliestEventDate = new Date(
      Math.min(...eventDates.map((date: Date) => date.getTime()))
    );
    return earliestEventDate >= currentDate;
  });

  const pastEvents = events.filter((event) => {
    // Get the earliest event date for this event
    const eventDates = event.dates.map(
      (dateString: string) => new Date(dateString)
    );
    const earliestEventDate = new Date(
      Math.min(...eventDates.map((date: Date) => date.getTime()))
    );
    return earliestEventDate < currentDate;
  });

  // Sort events by date (upcoming: earliest first, past: latest first)
  upcomingEvents.sort((a, b) => {
    const dateA = new Date(
      Math.min(
        ...a.dates.map((dateString: string) => new Date(dateString).getTime())
      )
    );
    const dateB = new Date(
      Math.min(
        ...b.dates.map((dateString: string) => new Date(dateString).getTime())
      )
    );
    return dateA.getTime() - dateB.getTime();
  });

  pastEvents.sort((a, b) => {
    const dateA = new Date(
      Math.min(
        ...a.dates.map((dateString: string) => new Date(dateString).getTime())
      )
    );
    const dateB = new Date(
      Math.min(
        ...b.dates.map((dateString: string) => new Date(dateString).getTime())
      )
    );
    return dateB.getTime() - dateA.getTime();
  });

  const renderEventSection = (sectionEvents: typeof events, isPast = false) => {
    if (sectionEvents.length === 0) return null;

    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
          isPast ? 'opacity-75' : ''
        }`}
      >
        {sectionEvents.map((event) => (
          <EventCard key={event.id} event={event} isPast={isPast} />
        ))}
      </div>
    );
  };

  return (
    <div className='space-y-8'>
      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <div className='space-y-6'>
          <div className='border-b pb-2'>
            <h2 className='text-2xl font-bold text-primary'>
              {t('upcomingEvents')}
            </h2>
          </div>
          {renderEventSection(upcomingEvents, false)}
        </div>
      )}

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <div className='space-y-6'>
          <div className='border-b pb-2'>
            <h2 className='text-2xl font-bold text-muted-foreground'>
              {t('pastEvents')}
            </h2>
          </div>
          {renderEventSection(pastEvents, true)}
        </div>
      )}

      {/* Empty states */}
      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <div className='text-center text-muted-foreground py-8'>
          <p>{t('noEventsFound')}</p>
        </div>
      )}
    </div>
  );
}
