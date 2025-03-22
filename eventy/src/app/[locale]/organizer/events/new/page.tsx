'use client';

import { EventImages } from '@/components/create-event/EventImages';
import { EventInformation } from '@/components/create-event/EventInformation';
import { EventPreview } from '@/components/create-event/EventPreview';
import { EventSeatsAndPrice } from '@/components/create-event/EventSeatsAndPrice';
import { EventSocialMedia } from '@/components/create-event/EventSocialMedia';
import {
  createEventSchema,
  type CreateEventFormData,
} from '@/lib/validation/createEventSchema';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function CreateEventPage() {
  const { user } = useAuthStore();
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
    defaultValues: {
      title: '',
      categoryIds: [],
      dates: [{ date: '' }],
      country: null as any,
      state: null as any,
      city: null as any,
      street: '',
      buildingNumber: '',
      speakerIds: [],
      shortDescription: '',
      fullDescription: '',
      eventZones: [
        { name: 'Zone - 1', price: 0, currency: 'USD', seatCount: 100 },
      ],
      socialMedia: [],
      coverImg: '',
      logoImg: '',
      mainImg: '',
    },
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
      // await eventsService.createEvent(eventData);
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
              />
            </div>
            <div className='lg:col-span-2'>
              <div className='space-y-6'>
                <EventImages />
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
