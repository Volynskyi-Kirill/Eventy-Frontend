'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { OrganizerEventHeader } from '@/components/organizer/event-details/OrganizerEventHeader';
import { OrganizerEventInfo } from '@/components/organizer/event-details/OrganizerEventInfo';
import { OrganizerEventActions } from '@/components/organizer/event-details/OrganizerEventActions';
import { OrganizerEventContent } from '@/components/organizer/event-details/OrganizerEventContent';
import { useOrganizerEventDetails } from '@/lib/hooks/useOrganizerEventDetails';

export default function OrganizerEventDetailsPage() {
  const params = useParams();
  const eventId = Number(params.id);
  const t = useTranslations('OrganizerEventDetailsPage');

  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  const {
    data: eventDetails,
    isLoading,
    error,
  } = useOrganizerEventDetails(eventId, { selectedDate });

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-center items-center py-12'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
            <p className='text-lg text-muted-foreground'>{t('loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !eventDetails) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center py-12'>
          <h2 className='text-xl font-semibold text-destructive mb-2'>
            {t('errorTitle')}
          </h2>
          <p className='text-muted-foreground'>{t('errorDescription')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Cover Image Header */}
      <OrganizerEventHeader event={eventDetails} />

      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Sidebar - Event Info & Actions */}
          <div className='lg:col-span-1 space-y-6'>
            <OrganizerEventInfo event={eventDetails} />
            <OrganizerEventActions event={eventDetails} />
          </div>

          {/* Right Content - Dates, Statistics & Bookings */}
          <div className='lg:col-span-2'>
            <OrganizerEventContent
              event={eventDetails}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
