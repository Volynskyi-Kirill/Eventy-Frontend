import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { buildImageUrl } from '@/lib/utils/imageUrl';
import SocialMediaLinks from './SocialMediaLinks';
import { Event } from '@/lib/types/event.types';
import Link from 'next/link';
import { URLS } from '@/components/shared/Navigation/urls';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type EventHeaderProps = {
  event: Event;
  minPrice: number;
  maxPrice: number;
  currency: string;
  t: any; // Translation function
};

const EventHeader = ({
  event,
  minPrice,
  maxPrice,
  currency,
  t,
}: EventHeaderProps) => {
  const hasSocialMedia = event.socialMedia.length > 0;
  const isPriceSame = minPrice === maxPrice;
  const priceDisplay = isPriceSame
    ? `${minPrice} ${currency}`
    : `${minPrice} - ${maxPrice} ${currency}`;

  // Check if all event dates have passed
  const currentDate = new Date();
  const allEventDates = event.dates.map((date) => new Date(date.date));
  const latestEventDate = new Date(
    Math.max(...allEventDates.map((date) => date.getTime()))
  );
  const isEventPast = latestEventDate < currentDate;

  return (
    <>
      <div className='relative w-full h-[300px] overflow-hidden'>
        <Image
          src={buildImageUrl(event.coverImg)}
          alt={event.title}
          fill
          className={`object-cover w-full ${isEventPast ? 'grayscale' : ''}`}
          priority
        />
        {isEventPast && (
          <div className='absolute top-4 right-4'>
            <Badge
              variant='secondary'
              className='bg-muted text-muted-foreground'
            >
              {t('pastEvent')}
            </Badge>
          </div>
        )}
      </div>

      <div className='container px-4 md:px-6 -mt-12 max-w-6xl mx-auto relative z-10'>
        <div className='flex flex-col md:flex-row gap-6 mb-8'>
          <div className='w-48 h-48 flex-shrink-0'>
            <Image
              src={buildImageUrl(event.mainImg)}
              alt={t('mainImageAlt', { title: event.title })}
              width={192}
              height={192}
              className={`rounded-md border-4 border-white shadow-lg object-cover bg-white ${
                isEventPast ? 'grayscale' : ''
              }`}
            />

            {hasSocialMedia && (
              <SocialMediaLinks socialMedia={event.socialMedia} />
            )}
          </div>

          <div className='flex-grow'>
            <div className='flex items-center gap-4 mb-4'>
              <Image
                src={buildImageUrl(event.logoImg)}
                alt={t('logoAlt', { title: event.title })}
                width={120}
                height={40}
                className={`object-contain bg-white rounded-md p-1 shadow-sm ${
                  isEventPast ? 'grayscale' : ''
                }`}
              />
            </div>

            <div className='flex flex-wrap gap-2 mb-3'>
              {event.categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={isEventPast ? 'outline' : 'secondary'}
                  className={
                    isEventPast
                      ? 'text-muted-foreground border-muted-foreground'
                      : ''
                  }
                >
                  {category.name}
                </Badge>
              ))}
            </div>

            <h1
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                isEventPast ? 'text-muted-foreground' : 'text-foreground'
              }`}
            >
              {event.title}
            </h1>

            <p className='mt-2 text-muted-foreground'>
              {event.shortDescription}
            </p>

            <div className='flex items-center gap-1 mt-4 text-sm text-muted-foreground'>
              <MapPin className='h-4 w-4' />
              <a
                href='#map-location'
                className='hover:text-primary transition-colors cursor-pointer'
                aria-label={t('viewOnMap')}
              >
                {event.city}, {event.country} {event.street}{' '}
                {event.buildingNumber}
              </a>
            </div>

            <div
              className={`mt-6 text-lg font-semibold ${
                isEventPast ? 'text-muted-foreground' : ''
              }`}
            >
              {priceDisplay}
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className='mt-4 inline-block'>
                    {isEventPast ? (
                      <Button disabled size='lg' variant='secondary'>
                        {t('eventCompleted')}
                      </Button>
                    ) : (
                      <Link href={URLS.CLIENT.BOOK_EVENT(event.id)}>
                        <Button size='lg'>{t('bookTicket')}</Button>
                      </Link>
                    )}
                  </div>
                </TooltipTrigger>
                {isEventPast && (
                  <TooltipContent>
                    <p>{t('eventCompletedTooltip')}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventHeader;
