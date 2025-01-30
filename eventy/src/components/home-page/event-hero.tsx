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
import type { CarouselApi } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

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

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };

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
      <div className='absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2'>
        {Array.from({ length: count }).map((_, index) => (
          <Button
            key={index}
            variant='ghost'
            size='sm'
            className={`w-2 h-2 rounded-full p-0 ${
              index + 1 === current ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </section>
  );
}
