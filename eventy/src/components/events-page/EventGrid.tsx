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

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
