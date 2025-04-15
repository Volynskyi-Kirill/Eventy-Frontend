import { eventsService } from '@/lib/api/events.service';
import type { Event } from '@/lib/types/event.types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin } from 'lucide-react';
import { buildImageUrl } from '@/lib/utils/imageUrl';
import { getTranslations } from 'next-intl/server';
import { DateTimeSelector } from '@/components/events/DateTimeSelector';

type EventPageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'EventPage' });

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
      year: dateObj.getFullYear().toString(),
      time: dateObj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      originalDate: date.date,
    };
  });

  // Build address for map
  const addressParts = [
    event.street,
    event.buildingNumber,
    event.city,
    event.country,
  ].filter(Boolean);
  const fullAddress = addressParts.join(', ');

  return (
    <div className='flex flex-col w-full items-center'>
      <div className='relative w-full h-[300px] overflow-hidden'>
        <Image
          src={buildImageUrl(event.coverImg)}
          alt={event.title}
          fill
          className='object-cover w-full'
          priority
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>

        <div className='absolute bottom-10 left-90 md:left-50 z-10'>
          <Image
            src={buildImageUrl(event.logoImg)}
            alt={t('logoAlt', { title: event.title })}
            width={150}
            height={50}
            className='rounded-lg border-4 border-white shadow-lg object-cover bg-white'
          />
        </div>

        <div className='absolute bottom-10 left-10 md:left-20 z-10'>
          <Image
            src={buildImageUrl(event.mainImg)}
            alt={t('mainImageAlt', { title: event.title })}
            width={150}
            height={150}
            className='rounded-lg border-4 border-white shadow-lg object-cover bg-white'
          />
        </div>
      </div>

      <div className='container px-4 md:px-6 mt-8 max-w-4xl mx-auto'>
        <div className='flex flex-col items-center text-center'>
          <div className='flex flex-wrap gap-2 mb-3 justify-center'>
            {event.categories.map((category) => (
              <Badge key={category.id} variant='secondary'>
                {category.name}
              </Badge>
            ))}
          </div>

          <h1 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
            {event.title}
          </h1>

          <p className='mt-2 text-muted-foreground'>{event.shortDescription}</p>

          <div className='flex items-center gap-1 mt-4 text-sm text-muted-foreground'>
            <MapPin className='h-4 w-4' />
            <span>
              {event.city}, {event.country}
            </span>
            <span>
              {event.street} {event.buildingNumber}
            </span>
          </div>

          <div className='mt-6 text-lg font-semibold'>
            {minPrice === maxPrice
              ? `${minPrice} ${currency}`
              : `${minPrice} - ${maxPrice} ${currency}`}
          </div>

          <Button className='mt-4' size='lg'>
            {t('bookTicket')}
          </Button>
        </div>
      </div>

      <div className='container px-4 md:px-6 mt-8 max-w-4xl mx-auto'>
        <DateTimeSelector
          dates={formattedDates}
          translations={{
            availableDates: t('availableDates'),
            availableTimes: t('availableTimes'),
            selectDate: t('selectDate'),
          }}
        />
      </div>

      <div className='container px-4 md:px-6 mt-12 max-w-4xl mx-auto'>
        <h2 className='text-2xl font-bold mb-6 text-center'>{t('speakers')}</h2>
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

      <div className='container px-4 md:px-6 mt-12 max-w-4xl mx-auto'>
        <h2 className='text-2xl font-bold mb-4 text-center'>
          {t('fullDescription')}
        </h2>
        <div className='h-px bg-border w-full mb-6'></div>
        <div className='prose max-w-none'>
          {event.fullDescription.split('\n').map((paragraph, index) => (
            <p key={index} className='mb-4'>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className='container px-4 md:px-6 mt-12 max-w-4xl mx-auto'>
        <h2 className='text-2xl font-bold mb-4 text-center'>{t('address')}</h2>
        <div className='h-px bg-border w-full mb-6'></div>
      </div>

      {/* todo: подставить свой API key из енв */}
      <div className='container px-4 md:px-6 mt-4 mb-12 max-w-4xl mx-auto'>
        <div className='w-full h-[300px] relative rounded-lg overflow-hidden bg-muted'>
          <iframe
            title={t('eventLocation')}
            width='100%'
            height='100%'
            frameBorder='0'
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
              fullAddress
            )}`}
            allowFullScreen
            className='absolute inset-0'
          ></iframe>
        </div>
      </div>
    </div>
  );
}
