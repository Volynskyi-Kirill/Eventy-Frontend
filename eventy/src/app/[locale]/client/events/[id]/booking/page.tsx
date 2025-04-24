import { eventsService } from '@/lib/api/events.service';
import type { Event } from '@/lib/types/event.types';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

type BookingPageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export default async function BookingPage({ params }: BookingPageProps) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BookingPage' });

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

  return (
    <div className='container px-4 md:px-6 py-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>
        {t('bookTicketsFor')} {event.title}
      </h1>
      <div className='p-8 border rounded-lg shadow-sm'>
        <p className='text-lg text-center text-muted-foreground'>
          {t('bookingPagePlaceholder')}
        </p>
      </div>
    </div>
  );
}
