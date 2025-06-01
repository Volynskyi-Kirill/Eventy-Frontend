'use client';

import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OrganizerEventDetails } from '@/lib/types/organizer-event-details.types';

interface OrganizerEventInfoProps {
  event: OrganizerEventDetails;
}

export function OrganizerEventInfo({ event }: OrganizerEventInfoProps) {
  const t = useTranslations('OrganizerEventDetailsPage');

  const formatLocation = () => {
    const { city, country, street, buildingNumber } = event.location;
    const parts = [street, buildingNumber].filter(Boolean);
    const address = parts.length > 0 ? parts.join(' ') : '';
    const cityCountry = [city, country].filter(Boolean).join(', ');

    return address ? `${address}, ${cityCountry}` : cityCountry;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-bold'>{event.title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Categories */}
        {event.categories.length > 0 && (
          <div>
            <h4 className='text-sm font-medium text-muted-foreground mb-2'>
              {t('categories')}
            </h4>
            <div className='flex flex-wrap gap-2'>
              {event.categories.map((category) => (
                <Badge key={category.id} variant='secondary'>
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Location */}
        <div>
          <h4 className='text-sm font-medium text-muted-foreground mb-2'>
            {t('location')}
          </h4>
          <div className='flex items-start gap-2'>
            <MapPin className='h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0' />
            <span className='text-sm'>{formatLocation()}</span>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className='text-sm font-medium text-muted-foreground mb-2'>
            {t('priceRange')}
          </h4>
          <div className='text-lg font-semibold text-primary'>
            {formatPrice()}
          </div>
        </div>

        {/* Short Description */}
        {event.shortDescription && (
          <div>
            <h4 className='text-sm font-medium text-muted-foreground mb-2'>
              {t('description')}
            </h4>
            <p className='text-sm text-muted-foreground'>
              {event.shortDescription}
            </p>
          </div>
        )}

        {/* Speakers */}
        {event.speakers.length > 0 && (
          <div>
            <h4 className='text-sm font-medium text-muted-foreground mb-2'>
              {t('speakers')}
            </h4>
            <div className='space-y-2'>
              {event.speakers.map((speaker) => (
                <div key={speaker.id} className='text-sm'>
                  {speaker.userName} {speaker.userSurname}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
