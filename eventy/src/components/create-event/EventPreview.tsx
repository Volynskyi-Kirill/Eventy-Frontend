'use client';

import Image from 'next/image';
import { MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import { formatDate } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { URLS } from '@/components/Navigation/urls';
import { CATEGORIES } from './EventCategories';
import { speakers } from '@/data/speakers';
import { useTranslations } from 'next-intl';

interface EventPreviewProps {
  formValues: Partial<CreateEventFormData>;
  isSubmitting: boolean;
}

export function EventPreview({ formValues, isSubmitting }: EventPreviewProps) {
  const t = useTranslations('EventPreview');
  const {
    title,
    dates,
    mainImg,
    country,
    state,
    city,
    street,
    buildingNumber,
    eventZones,
    categoryIds,
    socialMedia,
    speakerIds,
  } = formValues;

  const countryName =
    country && typeof country === 'object' ? country.name : country;
  const stateName = state && typeof state === 'object' ? state.name : state;
  const cityName = city && typeof city === 'object' ? city.name : city;
  const location = [countryName, stateName, cityName, street, buildingNumber]
    .filter(Boolean)
    .join(', ');

  const hasPrice = eventZones && eventZones.length > 0;
  const lowestPrice = hasPrice
    ? Math.min(...eventZones.map((zone) => zone.price))
    : 0;
  const highestPrice = hasPrice
    ? Math.max(...eventZones.map((zone) => zone.price))
    : 0;
  const currency =
    hasPrice && eventZones[0]?.currency ? eventZones[0].currency : '';

  const priceDisplay =
    lowestPrice === 0
      ? t('freeLabel')
      : lowestPrice === highestPrice
      ? `${lowestPrice} ${currency}`
      : `${lowestPrice} - ${highestPrice} ${currency}`;

  const router = useRouter();

  return (
    <div className='sticky top-6'>
      <Card className='max-w-[18.875em] mx-auto overflow-hidden'>
        <div className='relative h-64 w-full bg-gray-200'>
          {mainImg ? (
            <Image
              src={mainImg || '/placeholder.svg'}
              alt={title || 'Event'}
              fill
              className='object-cover'
            />
          ) : (
            <div className='flex items-center justify-center h-full text-gray-500'>
              {t('mainPhotoLabel')}
            </div>
          )}
        </div>
        <CardContent className='p-4'>
          <h2 className='text-xl font-bold mb-2'>
            {title || t('titlePlaceholder')}
          </h2>
          {categoryIds && categoryIds.length > 0 && (
            <div className='mb-2 text-sm text-gray-500'>
              {t('categoriesLabel')}:{' '}
              {categoryIds
                .map((id: number) => {
                  const category = CATEGORIES.find((c) => c.id === id);
                  return category ? category.name : id;
                })
                .join(', ')}
            </div>
          )}
          {speakerIds && speakerIds.length > 0 && (
            <div className='mb-2 text-sm text-gray-500'>
              {t('speakersLabel')}:{' '}
              {speakerIds
                .map((id: number) => {
                  const speaker = speakers.find((s) => s.id === id);
                  return speaker
                    ? `${speaker.userName} ${speaker.userSurname}`
                    : id;
                })
                .join(', ')}
            </div>
          )}
          {location && (
            <div className='flex items-center text-sm text-gray-500 mb-2'>
              <MapPin className='h-4 w-4 mr-1' />
              <span>{location}</span>
            </div>
          )}
          {dates && dates.length > 0 && (
            <div className='mb-2'>
              {dates.map((dateObj, idx) =>
                dateObj.date ? (
                  <div
                    key={idx}
                    className='flex items-center text-sm text-gray-500 mb-1'
                  >
                    <Calendar className='h-4 w-4 mr-1' />
                    <span>{formatDate(dateObj.date)}</span>
                  </div>
                ) : null
              )}
            </div>
          )}
          <div className='mt-4'>
            <div className='text-lg font-semibold'>{t('priceLabel')}</div>
            <div className='text-md'>{priceDisplay}</div>
          </div>

          {socialMedia && socialMedia.length > 0 && (
            <div className='mt-4'>
              <div className='text-lg font-semibold'>
                {t('socialMediaLabel')}
              </div>
              <ul className='list-disc pl-4'>
                {socialMedia.map((sm, idx) =>
                  sm.link ? (
                    <li key={idx} className='text-md'>
                      <a
                        href={sm.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500 hover:underline'
                      >
                        {sm.platform}
                      </a>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}
          <div className='mt-4 space-y-2'>
            <Button
              type='submit'
              className='w-full bg-emerald-500 hover:bg-emerald-600'
              disabled={isSubmitting}
            >
              {isSubmitting ? t('creating') : t('saveButton')}
            </Button>
            <Button variant='outline' className='w-full'>
              {t('seatsAndPriceButton')}
            </Button>
            <Button
              type='button'
              variant='outline'
              className='w-full'
              onClick={() => router.push(URLS.ORGANIZER.EVENTS)}
            >
              {t('cancelButton')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
