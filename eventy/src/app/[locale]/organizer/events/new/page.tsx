'use client';

import { EventImages } from '@/components/create-event/EventImages';
import { EventInformation } from '@/components/create-event/EventInformation';
import { EventSeatsAndPrice } from '@/components/create-event/EventSeatsAndPrice';
import { EventSocialMedia } from '@/components/create-event/EventSocialMedia';
import { EventPreview } from '@/components/create-event/event-preview/EventPreview';
import { eventsService } from '@/lib/api/events.service';
import {
  createEventSchema,
  type CreateEventFormData,
} from '@/lib/validation/createEventSchema';
import {
  createEventDefaultValues,
  createEventDevDefaultValues,
} from '@/lib/validation/createEventDefaultValues';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function CreateEventPage() {
  const { user } = useAuthStore();
  const [mainImagePreview, setMainImagePreview] = useState('');
  const t = useTranslations('CreateEventPage');
  const tEventInfo = useTranslations('EventInformation');
  const tDateSelector = useTranslations('DateSelector');
  const tEventSeatsPrice = useTranslations('EventSeatsAndPrice');
  const tEventSocialMedia = useTranslations('EventSocialMedia');

  const methods = useForm<CreateEventFormData>({
    resolver: zodResolver(
      createEventSchema((key: string) => {
        const [namespace, ...rest] = key.split('.');
        if (namespace === 'EventInformation') {
          return tEventInfo(rest.join('.'));
        }
        if (namespace === 'DateSelector') {
          return tDateSelector(rest.join('.'));
        }
        if (namespace === 'EventSeatsAndPrice') {
          return tEventSeatsPrice(rest.join('.'));
        }
        if (namespace === 'EventSocialMedia') {
          return tEventSocialMedia(rest.join('.'));
        }
        return key;
      })
    ),
    // defaultValues: createEventDevDefaultValues,
    defaultValues: createEventDefaultValues,
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const formValues = watch();

  const onSubmit = async (data: CreateEventFormData) => {
    if (!user) {
      toast.error('You must be logged in to create an event');
      return;
    }

    try {
      const eventData = {
        ...data,
        ownerId: user.id,
      };

      console.log('eventData: ', eventData);
      await eventsService.createEvent(eventData);
      toast.success(t('success'));
      // router.push(URLS.ORGANIZER.EVENTS);
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error(t('error'));
    }
  };

  return (
    <div className='container py-6'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-1'>
              <EventPreview
                formValues={formValues}
                isSubmitting={isSubmitting}
                mainImagePreview={mainImagePreview}
              />
            </div>
            <div className='lg:col-span-2'>
              <div className='space-y-6'>
                <EventImages onMainImagePreviewChange={setMainImagePreview} />
                <EventInformation />
                <EventSeatsAndPrice />
                <EventSocialMedia />
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
