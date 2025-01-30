'use client';

import type { Event } from '@/app/[locale]/page';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { EventCard } from './event-card';
import { type CarouselApi } from '@/components/ui/carousel';

interface EventHeroProps {
  events: Event[];
}

export function EventHero({ events }: EventHeroProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className='absolute top-0 left-0 h-[100dvh] w-full overflow-hidden z-0'>
      <Carousel
        className='w-full h-full'
        opts={{
          align: 'start',
          loop: true,
        }}
        setApi={setApi}
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
    </section>
  );
}
