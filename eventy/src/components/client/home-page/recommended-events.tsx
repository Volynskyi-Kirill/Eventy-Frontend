'use client';

import { eventsService, RecommendedEvent } from '@/lib/api/events.service';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { EventHero } from './event-hero';

export function RecommendedEvents() {
  const [events, setEvents] = useState<RecommendedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('EventsPage');

  useEffect(() => {
    const fetchRecommendedEvents = async () => {
      try {
        setIsLoading(true);
        const data = await eventsService.getRecommendedEvents();
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch recommended events:', err);
        setError('Failed to load recommended events');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedEvents();
  }, []);

  if (isLoading) {
    return (
      <div className='h-[100dvh] flex items-center justify-center'>
        {t('loading')}
      </div>
    );
  }

  if (error) {
    return (
      <div className='h-[100dvh] flex items-center justify-center text-red-500'>
        {error}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className='h-[100dvh] flex items-center justify-center'>
        {t('noEventsFound')}
      </div>
    );
  }

  return <EventHero events={events} />;
}
