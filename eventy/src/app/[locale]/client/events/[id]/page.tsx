import { eventsService } from '@/lib/api/events.service';
import type { Event } from '@/lib/types/event.types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, MapPin } from 'lucide-react';
import { buildImageUrl } from '@/lib/utils/imageUrl';

type EventPageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;

  let event: Event;

  try {
    event = await eventsService.getEvent(id);

    if (!event) {
      return notFound();
    }
  } catch (error) {
    console.log('Failed to fetch event:', error);
    return notFound();
  }

  // Format price
  const minPrice = event.eventZones.reduce(
    (min, zone) => (zone.price < min ? zone.price : min),
    event.eventZones[0]?.price || 0
  );
  const maxPrice = event.eventZones.reduce(
    (max, zone) => (zone.price > max ? zone.price : max),
    0
  );
  const currency = event.eventZones[0]?.currency || 'UAH';

  // Format dates for display
  const formattedDates = event.dates.map((date) => {
    const dateObj = new Date(date.date);
    return {
      day: dateObj.getDate().toString().padStart(2, '0'),
      month: (dateObj.getMonth() + 1).toString().padStart(2, '0'),
      year: dateObj.getFullYear(),
      time: dateObj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  });

  return (
    <div className='flex flex-col w-full'>
      {/* Banner section */}
      <div className='relative w-full h-[300px] overflow-hidden'>
        <Image
          src={
            buildImageUrl(event.mainImg) || '/home-page/background-event.png'
          }
          alt={event.title}
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
      </div>

      {/* Event header section */}
      <div className='container px-4 md:px-6 -mt-16 relative z-10'>
        <div className='flex flex-col md:flex-row gap-6'>
          {/* Event logo/image */}
          <div className='flex-shrink-0'>
            <Image
              src={buildImageUrl(event.logoImg) || '/logo-nav-black.svg'}
              alt={`${event.title} logo`}
              width={200}
              height={200}
              className='rounded-lg border-4 border-white shadow-lg object-cover bg-white'
            />
          </div>

          {/* Event details */}
          <div className='flex-grow mt-4'>
            {/* Categories */}
            <div className='flex flex-wrap gap-2 mb-3'>
              {event.categories.map((category) => (
                <Badge key={category.id} variant='secondary'>
                  {category.name}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className='text-3xl md:text-4xl font-bold text-foreground'>
              {event.title}
            </h1>

            {/* Short description */}
            <p className='mt-2 text-muted-foreground max-w-3xl'>
              {event.shortDescription}
            </p>

            {/* Location info */}
            <div className='flex items-center gap-1 mt-4 text-sm text-muted-foreground'>
              <MapPin className='h-4 w-4' />
              <span>
                {event.city}, {event.country}
              </span>
              <span>
                {event.street} {event.buildingNumber}
              </span>
            </div>

            {/* Price and seats info */}
            <div className='mt-6 text-lg font-semibold'>
              {minPrice === maxPrice
                ? `${minPrice} ${currency}`
                : `${minPrice} - ${maxPrice} ${currency}`}
            </div>

            {/* Booking button */}
            <Button className='mt-4' size='lg'>
              Book ticket
            </Button>
          </div>
        </div>
      </div>

      {/* Date section */}
      <div className='container px-4 md:px-6 mt-8'>
        <Card className='overflow-hidden'>
          <CardContent className='p-0'>
            <div className='flex flex-wrap'>
              {formattedDates.slice(0, 4).map((date, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? 'default' : 'outline'}
                  className='rounded-none border-r border-b flex-1'
                >
                  <div className='flex flex-col items-center py-2'>
                    <div className='flex items-center gap-2'>
                      <Clock className='h-4 w-4' />
                      <span>{date.time}</span>
                    </div>
                    <div className='text-sm'>
                      {date.day}.{date.month}.{date.year}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Speakers section */}
      <div className='container px-4 md:px-6 mt-12'>
        <h2 className='text-2xl font-bold mb-6'>SPEAKERS</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {event.speakers.map((speaker) => (
            <div
              key={speaker.id}
              className='flex flex-col items-center text-center'
            >
              <Avatar className='h-24 w-24 mb-3'>
                <AvatarImage
                  src={buildImageUrl(speaker.avatarUrl)}
                  alt={`${speaker.userName} ${speaker.userSurname}`}
                />
                <AvatarFallback>
                  {speaker.userName?.[0]}
                  {speaker.userSurname?.[0]}
                </AvatarFallback>
              </Avatar>
              <h3 className='text-lg font-semibold'>{speaker.userName}</h3>
              <p className='text-muted-foreground'>{speaker.userSurname}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full description section */}
      <div className='container px-4 md:px-6 mt-12'>
        <h2 className='text-2xl font-bold mb-4'>FULL DESCRIPTION</h2>
        <div className='h-px bg-border w-full mb-6'></div>
        <div className='prose max-w-none'>
          {event.fullDescription.split('\n').map((paragraph, index) => (
            <p key={index} className='mb-4'>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Map section */}
      <div className='container px-4 md:px-6 mt-12 mb-12'>
        <div className='w-full h-[300px] relative rounded-lg overflow-hidden bg-muted'>
          <div className='absolute inset-0 flex items-center justify-center text-muted-foreground'>
            Map location placeholder
          </div>
          <Button className='absolute bottom-4 left-1/2 -translate-x-1/2 z-10'>
            Show on map
          </Button>
        </div>
      </div>
    </div>
  );
}
