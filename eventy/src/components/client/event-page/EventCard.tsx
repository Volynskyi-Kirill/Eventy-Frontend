import Image from 'next/image';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { Event } from '@/lib/types/event.types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SocialMediaLinks from './SocialMediaLinks';
import { buildImageUrl } from '@/lib/utils/imageUrl';

type EventCardProps = {
  event: Event;
  compact?: boolean;
};

const EventCard = ({ event, compact = false }: EventCardProps) => {
  const {
    title,
    mainImg,
    categories,
    city,
    street,
    buildingNumber,
    dates,
    socialMedia,
  } = event;

  const formattedLocation = city
    ? `${city}, ${street} ${buildingNumber}`
    : 'Location not specified';

  // Format the first date and time if available
  const firstDate = dates && dates.length > 0 ? new Date(dates[0].date) : null;
  const formattedDate = firstDate ? firstDate.toLocaleDateString() : '';
  const formattedTime = firstDate
    ? firstDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <Card className='overflow-hidden'>
      <div className='relative aspect-video'>
        <Image
          src={buildImageUrl(mainImg)}
          alt={title}
          fill
          className='object-cover'
        />
      </div>
      <CardContent className={compact ? 'p-4' : 'p-6'}>
        <div className='space-y-4'>
          <div>
            <div className='flex flex-wrap gap-2 mb-2'>
              {categories?.map((category) => (
                <Badge key={category.id} variant='secondary'>
                  {category.name}
                </Badge>
              ))}
            </div>
            <h3 className={`font-bold ${compact ? 'text-lg' : 'text-2xl'}`}>
              {title}
            </h3>
          </div>

          <div className='space-y-2 text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <MapPin className='h-4 w-4' />
              <span className='text-sm'>{formattedLocation}</span>
            </div>

            {!compact && formattedDate && (
              <div className='flex items-center gap-2'>
                <Calendar className='h-4 w-4' />
                <span className='text-sm'>{formattedDate}</span>
              </div>
            )}

            {!compact && formattedTime && (
              <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4' />
                <span className='text-sm'>{formattedTime}</span>
              </div>
            )}
          </div>

          {socialMedia && socialMedia.length > 0 && (
            <SocialMediaLinks socialMedia={socialMedia} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
