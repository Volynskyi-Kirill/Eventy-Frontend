import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { buildImageUrl } from '@/lib/utils/imageUrl';
import {
  MAX_CATEGORIES_DISPLAYED,
  MAX_DATES_DISPLAYED,
  EVENT_DATE_FORMAT,
} from './constants';
import { EventCardProps } from './types';
import { URLS } from '@/components/shared/Navigation/urls';

export function EventCard({ event, isPast = false }: EventCardProps) {
  const t = useTranslations('EventsPage');

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, EVENT_DATE_FORMAT);
  };

  const hasDates = event.dates && event.dates.length > 0;
  const hasCategories = event.categories.length > 0;
  const isFreeEvent = event.price.min === 0 && event.price.max === 0;

  return (
    <Link href={URLS.CLIENT.EVENT(event.id)}>
      <Card
        className={`h-full overflow-hidden hover:shadow-lg transition-shadow ${
          isPast ? 'opacity-75' : ''
        }`}
      >
        <div className='relative h-48'>
          <Image
            src={buildImageUrl(event.mainImg)}
            alt={event.title}
            fill
            className={`object-cover ${isPast ? 'grayscale' : ''}`}
          />
          {hasCategories && (
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
            </div>
          )}
        </div>
        <CardContent className='pt-4'>
          <h3
            className={`text-lg font-bold truncate ${
              isPast ? 'text-muted-foreground' : ''
            }`}
          >
            {event.title}
          </h3>
          <div className='flex items-center text-sm text-muted-foreground mt-2'>
            <MapPin size={14} className='mr-1' />
            <span className='truncate'>
              {event.location.city}, {event.location.country}
            </span>
          </div>
          {hasDates && (
            <div className='flex flex-wrap gap-1 mt-2 text-xs'>
              {event.dates.slice(0, MAX_DATES_DISPLAYED).map((date, index) => (
                <Badge key={index} variant={isPast ? 'secondary' : 'outline'}>
                  {formatEventDate(date)}
                </Badge>
              ))}
            </div>
          )}
          <div
            className={`mt-4 text-xl font-bold ${
              isPast ? 'text-muted-foreground' : ''
            }`}
          >
            {isFreeEvent
              ? t('free')
              : `${event.price.min} - ${event.price.max} ${event.price.currency}`}
          </div>
        </CardContent>
        <CardFooter className='flex justify-between pt-0'>
          <Button variant={isPast ? 'secondary' : 'outline'} className='w-full'>
            {t('viewEvent')}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
