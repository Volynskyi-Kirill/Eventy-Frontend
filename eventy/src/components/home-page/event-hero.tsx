'use client';

import type { Event } from '@/app/[locale]/page';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useState } from 'react';
import { EventCard } from './event-card';

interface EventHeroProps {
  events: Event[];
}

export function EventHero({ events }: EventHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className='absolute top-0 left-0 h-[100dvh] w-full overflow-hidden z-0'>
      <Carousel
        className='w-full h-full'
        onSelect={(index) => setCurrentIndex(index)}
      >
        <CarouselContent>
          {events.map((event, index) => (
            <CarouselItem key={index}>
              <EventCard event={event} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40' />
        <CarouselNext className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40' />
      </Carousel>
      <div className='absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2'>
        {events.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
