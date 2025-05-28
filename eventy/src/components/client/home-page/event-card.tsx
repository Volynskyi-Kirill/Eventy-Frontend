import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import { RecommendedEvent } from '@/lib/api/events.service';
import { buildImageUrl } from '@/lib/utils/imageUrl';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { URLS } from '@/components/shared/Navigation/urls';
import { formatEventPrice, isEventFree } from '@/lib/utils/priceFormatter';

interface EventCardProps {
  event: RecommendedEvent;
}

export function EventCard({ event }: EventCardProps) {
  const t = useTranslations('EventsPage');

  return (
    <div className='relative h-[100dvh] w-full overflow-hidden'>
      {/* Background image */}
      <div className='absolute inset-0 z-0'>
        <Image
          src={buildImageUrl(event.backgroundImage)}
          alt={event.title}
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black bg-opacity-70 z-0'></div>

      {/* Content layer above the image and overlay */}
      <div className='relative h-full z-10'>
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
              {event.categories.map((category) => (
                <Badge
                  key={category}
                  variant='secondary'
                  className='bg-white/10 text-white hover:bg-white/20'
                >
                  {category}
                </Badge>
              ))}
            </div>

            <div className='space-y-6'>
              <div className='flex items-baseline gap-1'>
                <span className='text-5xl font-bold text-white'>
                  {formatEventPrice(event.minPrice, event.maxPrice, t('free'))}
                </span>
                {!isEventFree(event.minPrice, event.maxPrice) && (
                  <span className='text-2xl text-white/80'>
                    {event.currency}
                  </span>
                )}
              </div>

              <div className='flex flex-wrap gap-4'>
                <Button
                  className='bg-emerald-600 text-white hover:bg-emerald-700'
                  asChild
                >
                  <Link href={URLS.CLIENT.BOOK_EVENT(event.id)}>
                    {t('bookTicket')}
                  </Link>
                </Button>

                <Button
                  variant='outline'
                  className='text-white bg-black/30 border-white/50 hover:bg-white/20 hover:text-white'
                  asChild
                >
                  <Link href={`${URLS.CLIENT.EVENTS}/${event.id}`}>
                    {t('viewEvent')}
                  </Link>
                </Button>
              </div>

              <div className='flex flex-wrap items-center gap-6 text-white/80'>
                <div className='flex items-center gap-2'>
                  <Users className='h-5 w-5' />
                  <span>{event.numberOfSeats}</span>
                </div>
                {event.nearestDate && (
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-5 w-5' />
                    <span>
                      {new Date(event.nearestDate.date).toLocaleDateString(
                        'uk-UA',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit',
                        }
                      )}
                    </span>
                  </div>
                )}
                {event.nearestDate && (
                  <div className='flex items-center gap-2'>
                    <Clock className='h-5 w-5' />
                    <span>{event.nearestDate.time}</span>
                  </div>
                )}
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
