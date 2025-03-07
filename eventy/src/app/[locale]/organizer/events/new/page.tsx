'use client';

import { URLS } from '@/components/Navigation/urls';
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
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function CreateEventPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  const methods = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: '',
      categoryIds: [],
      dates: [{ date: '' }],
      country: '',
      state: '',
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
      toast.success('Event created successfully');
      router.push(URLS.ORGANIZER.EVENTS);
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event. Please try again.');
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
