'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventDateSelector } from './EventDateSelector';
import { EventStatistics } from './EventStatistics';
import { EventBookingsTable } from './EventBookingsTable';
import { OrganizerEventDetails } from '@/lib/types/organizer-event-details.types';

interface OrganizerEventContentProps {
  event: OrganizerEventDetails;
  selectedDate?: string;
  onDateChange: (date?: string) => void;
}

export function OrganizerEventContent({
  event,
  selectedDate,
  onDateChange,
}: OrganizerEventContentProps) {
  const t = useTranslations('OrganizerEventDetailsPage');
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className='space-y-6'>
      {/* Date Selector */}
      <Card>
        <CardHeader>
          <CardTitle>{t('eventDates')}</CardTitle>
        </CardHeader>
        <CardContent>
          <EventDateSelector
            dates={event.availableDates}
            selectedDate={selectedDate}
            onDateChange={onDateChange}
          />
        </CardContent>
      </Card>

      {/* Statistics */}
      <EventStatistics
        statistics={event.statistics}
        selectedDate={selectedDate}
      />

      {/* Content Tabs */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='overview'>{t('overview')}</TabsTrigger>
              <TabsTrigger value='bookings'>{t('bookings')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value='overview' className='space-y-4'>
              <div>
                <h3 className='text-lg font-semibold mb-2'>
                  {t('eventOverview')}
                </h3>
                <p className='text-muted-foreground'>
                  {event.fullDescription || event.shortDescription}
                </p>
              </div>

              {selectedDate && (
                <div>
                  <h4 className='font-medium mb-2'>{t('selectedDateInfo')}</h4>
                  <p className='text-sm text-muted-foreground'>
                    {t('showingDataFor')}{' '}
                    {new Date(selectedDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value='bookings'>
              <EventBookingsTable
                bookings={event.bookings}
                selectedDate={selectedDate}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
