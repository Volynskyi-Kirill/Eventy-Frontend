'use client';

import { EventImages } from '@/components/create-event/EventImages';
import { EventInformation } from '@/components/create-event/EventInformation';
import { EventSeatsAndPrice } from '@/components/create-event/EventSeatsAndPrice';
import { EventSocialMedia } from '@/components/create-event/EventSocialMedia';
import { EventPreview } from '@/components/create-event/event-preview/EventPreview';
import { eventsService } from '@/lib/api/events.service';
import { createEventDefaultValues } from '@/lib/validation/createEventDefaultValues';
import {
  createEventSchema,
  type CreateEventFormData,
} from '@/lib/validation/createEventSchema';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSpeakersStore } from '@/store/speakersStore';
import { STORAGE_KEYS } from '@/lib/constants';

export default function CreateEventPage() {
  const { user } = useAuthStore();
  const [mainImagePreview, setMainImagePreview] = useState('');
  const t = useTranslations('CreateEventPage');
  const tEventInfo = useTranslations('EventInformation');
  const tDateSelector = useTranslations('DateSelector');
  const tEventSeatsPrice = useTranslations('EventSeatsAndPrice');
  const tEventSocialMedia = useTranslations('EventSocialMedia');
  const [isClient, setIsClient] = useState(false);
  const { clearSpeakers } = useSpeakersStore();

  const methods = useForm<CreateEventFormData>({
    resolver: zodResolver(
      createEventSchema((key: string) => {
        const [namespace, ...rest] = key.split('.');
        const translationKey = rest.join('.');

        const translationMap: Record<string, any> = {
          EventInformation: tEventInfo,
          DateSelector: tDateSelector,
          EventSeatsAndPrice: tEventSeatsPrice,
          EventSocialMedia: tEventSocialMedia,
        };

        const translationFunction = translationMap[namespace];
        return translationFunction ? translationFunction(translationKey) : key;
      })
    ),

    defaultValues: createEventDefaultValues,
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = methods;

  const formValues = watch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        const savedData = localStorage.getItem(STORAGE_KEYS.EVENT_FORM_DATA);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          reset(parsedData);
        }
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, [isClient, reset]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(
        STORAGE_KEYS.EVENT_FORM_DATA,
        JSON.stringify(formValues)
      );
    }
  }, [formValues, isClient]);

  const handleClearForm = () => {
    reset(createEventDefaultValues);
    setMainImagePreview('');
    toast.success(t('formCleared'));
  };

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

      localStorage.removeItem(STORAGE_KEYS.EVENT_FORM_DATA);
      clearSpeakers();

      reset(createEventDefaultValues);
      setMainImagePreview('');

      toast.success(t('success'));
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
                onClearForm={handleClearForm}
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
