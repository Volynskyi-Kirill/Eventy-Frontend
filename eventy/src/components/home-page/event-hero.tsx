'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  Clock,
} from 'lucide-react';
import Image from 'next/image';
import { Event } from '@/app/[locale]/page';

interface EventHeroProps {
  events: Event[];
}

export function EventHero({ events }: EventHeroProps) {
  const currentEvent = events[0];

  return (
    <section className='absolute top-0 left-0 h-[100dvh] w-full overflow-hidden z-0'>
      {/* Background Image */}
      <Image
        src={currentEvent.backgroundImage || '/placeholder.svg'}
        alt=''
        fill
        className='object-cover'
        priority
      />

      {/* Content */}
      <div className='relative h-full'>
        <div className='mx-auto h-full flex flex-col justify-center max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Navigation Arrows */}
          <button className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40'>
            <ChevronLeft className='h-8 w-8' />
          </button>
          <button className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40'>
            <ChevronRight className='h-8 w-8' />
          </button>

          {/* Main Content */}
          <div className='max-w-4xl space-y-6'>
            <div className='space-y-2'>
              <h1 className='text-4xl font-bold text-white sm:text-5xl md:text-6xl'>
                EVENTS TITLES
              </h1>
            </div>

            <p className='text-lg text-white/90 sm:text-xl'>
              {currentEvent.description}
            </p>

            <div className='flex flex-wrap gap-2'>
              {currentEvent.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant='secondary'
                  className='bg-white/10 text-white hover:bg-white/20'
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className='space-y-6'>
              <div className='flex items-baseline gap-1'>
                <span className='text-5xl font-bold text-white'>
                  {currentEvent.price}
                </span>
                <span className='text-2xl text-white/80'>
                  {currentEvent.currency}
                </span>
              </div>

              <Button className='bg-emerald-600 text-white hover:bg-emerald-700'>
                BUY TICKET
              </Button>

              <div className='flex flex-wrap items-center gap-6 text-white/80'>
                <div className='flex items-center gap-2'>
                  <Users className='h-5 w-5' />
                  <span>{currentEvent.numberOfSeats}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5' />
                  <span>
                    {new Date(currentEvent.date).toLocaleDateString('uk-UA', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    })}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='h-5 w-5' />
                  <span>{currentEvent.time}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className='absolute bottom-12 right-4 sm:right-8 md:right-16 lg:right-20 xl:right-32 text-right'>
            <p className='text-xl font-semibold text-white md:text-2xl'>
              {currentEvent.country} | {currentEvent.city}
            </p>
          </div>

          {/* Navigation Dots */}
          <div className='absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2'>
            {[0, 1, 2, 3, 4].map((index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === 0 ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
