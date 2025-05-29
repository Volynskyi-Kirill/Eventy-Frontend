'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Users, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { buildImageUrl } from '@/lib/utils/imageUrl';
import { OrganizerEventCard as OrganizerEventCardType } from '@/lib/types/organizer-events.types';
import { URLS } from '@/components/shared/Navigation/urls';

interface OrganizerEventCardProps {
  event: OrganizerEventCardType;
  isPast?: boolean;
}

const MAX_CATEGORIES_DISPLAYED = 3;
const EVENT_DATE_FORMAT = 'dd.MM.yyyy';

export function OrganizerEventCard({
  event,
  isPast = false,
}: OrganizerEventCardProps) {
  const t = useTranslations('OrganizerEventsPage');

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, EVENT_DATE_FORMAT);
  };

  const formatLocation = () => {
    const { city, country } = event.location;
    return `${city}, ${country}`;
  };

  const formatPrice = () => {
    const { min, max, currency } = event.price;
    if (min === 0 && max === 0) {
      return t('free');
    }
    if (min === max) {
      return `${min} ${currency}`;
    }
    return `${min} - ${max} ${currency}`;
  };

  const getAvailabilityColor = () => {
    const { total, available } = event.seats;
    const percentage = (available / total) * 100;

    if (percentage > 50) return 'text-green-600';
    if (percentage > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const nearestDateFormatted = event.nearestDate
    ? formatEventDate(event.nearestDate)
    : '';

  return (
    <Card
      className={`h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
        isPast ? 'opacity-75' : ''
      }`}
    >
      <Link href={URLS.ORGANIZER.EVENT(event.id)}>
        <div className='relative h-48'>
          <Image
            src={buildImageUrl(event.mainImg)}
            alt={event.title}
            fill
            className={`object-cover ${isPast ? 'grayscale' : ''}`}
          />
          {event.categories.length > 0 && (
            <div className='absolute bottom-2 left-2 flex flex-wrap gap-1'>
              {event.categories
                .slice(0, MAX_CATEGORIES_DISPLAYED)
                .map((category) => (
                  <Badge
                    key={category.id}
                    className={`${
                      isPast
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-primary/80 text-primary-foreground'
                    }`}
                  >
                    {category.name}
                  </Badge>
                ))}
              {event.categories.length > MAX_CATEGORIES_DISPLAYED && (
                <Badge
                  className={`${
                    isPast
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-primary/80 text-primary-foreground'
                  }`}
                >
                  +{event.categories.length - MAX_CATEGORIES_DISPLAYED}
                </Badge>
              )}
            </div>
          )}
        </div>
      </Link>

      <CardContent className='p-4'>
        <Link href={`/organizer/events/${event.id}`}>
          <h3
            className={`text-lg font-bold truncate mb-2 hover:text-primary transition-colors ${
              isPast ? 'text-muted-foreground' : ''
            }`}
          >
            {event.title}
          </h3>
        </Link>

        <div className='space-y-2 text-sm'>
          <div className='flex items-center text-muted-foreground'>
            <MapPin size={14} className='mr-2 flex-shrink-0' />
            <span className='truncate'>{formatLocation()}</span>
          </div>

          {nearestDateFormatted && (
            <div className='flex items-center text-muted-foreground'>
              <Calendar size={14} className='mr-2 flex-shrink-0' />
              <span>{nearestDateFormatted}</span>
            </div>
          )}

          <div className='flex items-center text-muted-foreground'>
            <Users size={14} className='mr-2 flex-shrink-0' />
            <span className={getAvailabilityColor()}>
              {event.seats.available} / {event.seats.total}{' '}
              {t('seatsAvailable')}
            </span>
          </div>
        </div>

        <div
          className={`mt-4 text-xl font-bold ${
            isPast ? 'text-muted-foreground' : ''
          }`}
        >
          {formatPrice()}
        </div>
      </CardContent>

      <CardFooter className='pt-0 px-4 pb-4'>
        <Button
          variant={isPast ? 'secondary' : 'outline'}
          className='w-full'
          asChild
        >
          <Link href={URLS.ORGANIZER.EVENT(event.id)}>
            <Eye className='mr-2 h-4 w-4' />
            {t('viewEvent')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
