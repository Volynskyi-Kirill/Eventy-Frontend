import { eventsService } from '@/lib/api/events.service';
import type { Event } from '@/lib/types/event.types';
import { notFound } from 'next/navigation';

type EventPageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;

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
    <div>
      <h1>{event.title}</h1>
      <p>{event.shortDescription}</p>
      <div>
        <p>
          Location: {event.city}, {event.country}
        </p>
        <p>{event.fullDescription}</p>
      </div>
    </div>
  );
}
