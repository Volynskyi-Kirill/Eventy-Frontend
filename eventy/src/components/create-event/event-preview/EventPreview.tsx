'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import { QUERY_KEYS } from '@/lib/constants';
import { eventsService, type Category } from '@/lib/api/events.service';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { EventTitle } from './components/EventTitle';
import { EventCategories } from './components/EventCategories';
import { EventSpeakers } from './components/EventSpeakers';
import { EventLocation } from './components/EventLocation';
import { EventDates } from './components/EventDates';
import { EventPricing } from './components/EventPricing';
import { EventSocialMedia } from './components/EventSocialMedia';
import { EventActions } from './components/EventActions';
import { EventImage } from './components/EventImage';

interface EventPreviewProps {
  formValues: Partial<CreateEventFormData>;
  isSubmitting: boolean;
  mainImagePreview?: string;
  onClearForm: () => void;
}

export function EventPreview({
  formValues,
  isSubmitting,
  mainImagePreview,
  onClearForm,
}: EventPreviewProps) {
  const t = useTranslations('EventPreview');

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: eventsService.getCategories,
  });

  return (
    <div className='sticky top-6'>
      <Card className='max-w-[18.875em] mx-auto overflow-hidden'>
        <EventImage
          mainImagePreview={mainImagePreview}
          title={formValues.title}
          t={t}
        />
        <CardContent className='p-4'>
          <EventTitle title={formValues.title} t={t} />
          <EventCategories
            categoryIds={formValues.categoryIds}
            categories={categories}
            t={t}
          />
          <EventSpeakers speakerIds={formValues.speakerIds} t={t} />
          <EventLocation
            country={formValues.country}
            state={formValues.state}
            city={formValues.city}
            street={formValues.street}
            buildingNumber={formValues.buildingNumber}
          />
          <EventDates dates={formValues.dates} t={t} />
          <EventPricing eventZones={formValues.eventZones} t={t} />
          <EventSocialMedia socialMedia={formValues.socialMedia} t={t} />
          <EventActions
            isSubmitting={isSubmitting}
            t={t}
            onClearForm={onClearForm}
          />
        </CardContent>
      </Card>
    </div>
  );
}
