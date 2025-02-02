import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import type { Event } from '@/app/[locale]/client/home/page';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className='relative h-[100dvh] w-full overflow-hidden'>
      <Image
        src={event.backgroundImage || '/placeholder.svg'}
        alt=''
        fill
        className='object-cover'
        priority
      />
      <div className='relative h-full'>
        <div className='mx-auto h-full flex flex-col justify-center max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='max-w-4xl space-y-6'>
            <div className='space-y-2'>
              <h1 className='text-4xl font-bold text-white sm:text-5xl md:text-6xl'>
                {event.title}
              </h1>
            </div>

            <p className='text-lg text-white/90 sm:text-xl'>
              {event.description}
            </p>

            <div className='flex flex-wrap gap-2'>
              {event.tags.map((tag) => (
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
                  {event.price}
                </span>
                <span className='text-2xl text-white/80'>{event.currency}</span>
              </div>

              <Button className='bg-emerald-600 text-white hover:bg-emerald-700'>
                BUY TICKET
              </Button>

              <div className='flex flex-wrap items-center gap-6 text-white/80'>
                <div className='flex items-center gap-2'>
                  <Users className='h-5 w-5' />
                  <span>{event.numberOfSeats}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5' />
                  <span>
                    {new Date(event.date).toLocaleDateString('uk-UA', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    })}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='h-5 w-5' />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
          </div>

          <div className='absolute bottom-12 right-4 sm:right-8 md:right-16 lg:right-20 xl:right-32 text-right'>
            <p className='text-xl font-semibold text-white md:text-2xl'>
              {event.country} | {event.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
