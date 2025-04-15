import { eventsService } from '@/lib/api/events.service';
import type { Event } from '@/lib/types/event.types';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { DateTimeSelector } from '@/components/client/event-page/DateTimeSelector';
import EventHeader from '@/components/client/event-page/EventHeader';
import EventSpeakers from '@/components/client/event-page/EventSpeakers';
import EventDescription from '@/components/client/event-page/EventDescription';
import EventLocation from '@/components/client/event-page/EventLocation';
import { formatEventDates } from '@/components/client/event-page/utils/formatEventDates';
import { formatEventPrice } from '@/components/client/event-page/utils/formatEventPrice';
import { buildEventAddress } from '@/components/client/event-page/utils/buildEventAddress';

type EventPageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'EventPage' });

  let event: Event;

  try {
    event = await eventsService.getEvent(id);

    if (!event) {
      return notFound();
    }
  } catch (error) {
    console.log('Failed to fetch event:', error);
    return notFound();
  }

  const formattedDates = formatEventDates(event.dates);
  const { minPrice, maxPrice, currency } = formatEventPrice(event.eventZones);
  const fullAddress = buildEventAddress(event);

  return (
    <div className='flex flex-col w-full items-center'>
      <EventHeader
        event={event}
        minPrice={minPrice}
        maxPrice={maxPrice}
        currency={currency}
        t={t}
      />

      <div className='container px-4 md:px-6 mt-8 max-w-4xl mx-auto'>
        <div className='h-px bg-border w-full mb-6'></div>
        <DateTimeSelector
          dates={formattedDates}
          translations={{
            availableDates: t('availableDates'),
            availableTimes: t('availableTimes'),
            selectDate: t('selectDate'),
          }}
        />
      </div>

      <EventSpeakers event={event} t={t} />
      <EventDescription event={event} t={t} />
      <EventLocation event={event} fullAddress={fullAddress} t={t} />
    </div>
  );
}
