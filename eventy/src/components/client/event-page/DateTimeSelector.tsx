'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle } from 'lucide-react';

type FormattedDate = {
  day: string;
  month: string;
  year: string;
  time: string;
  originalDate: string;
};

type DateTimeSelectorProps = {
  dates: FormattedDate[];
  translations: {
    availableDates: string;
    availableTimes: string;
    selectDate: string;
    allDatesHavePassed?: string;
  };
};

export function DateTimeSelector({
  dates,
  translations,
}: DateTimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const currentDate = new Date();

  // Group dates by day/month/year and check if they're past
  const dateGroups = dates.reduce<
    Record<string, { dates: FormattedDate[]; isPast: boolean }>
  >((groups, date) => {
    const dateKey = `${date.day}.${date.month}.${date.year}`;
    const dateObj = new Date(date.originalDate);
    const isPast = dateObj < currentDate;

    if (!groups[dateKey]) {
      groups[dateKey] = { dates: [], isPast };
    }
    groups[dateKey].dates.push(date);
    return groups;
  }, {});

  // Check if all dates have passed
  const allDatesPassed = Object.values(dateGroups).every(
    (group) => group.isPast
  );

  const handleDateClick = (dateKey: string) => {
    const group = dateGroups[dateKey];
    if (group.isPast) return; // Don't allow selection of past dates
    setSelectedDate(selectedDate === dateKey ? null : dateKey);
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='flex items-center justify-center mb-4 relative'>
        <h2 className='text-2xl font-bold text-center'>
          {translations.availableDates}
        </h2>
        {allDatesPassed && (
          <Badge
            variant='secondary'
            className='bg-muted text-muted-foreground absolute right-0'
          >
            <AlertCircle className='h-4 w-4 mr-1' />
            Past Event
          </Badge>
        )}
      </div>

      {allDatesPassed && (
        <div className='text-center mb-6 p-4 bg-muted rounded-lg'>
          <p className='text-muted-foreground'>
            {translations.allDatesHavePassed ||
              'All dates for this event have passed'}
          </p>
        </div>
      )}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-6'>
        {Object.entries(dateGroups).map(([dateKey, group]) => (
          <Button
            key={dateKey}
            variant={selectedDate === dateKey ? 'default' : 'outline'}
            className={`h-auto py-2 ${
              group.isPast ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handleDateClick(dateKey)}
            disabled={group.isPast}
          >
            <div className='text-center'>
              <div className='text-sm'>{dateKey}</div>
              {group.isPast && (
                <div className='text-xs text-muted-foreground mt-1'>Past</div>
              )}
            </div>
          </Button>
        ))}
      </div>

      {selectedDate && !dateGroups[selectedDate]?.isPast ? (
        <Card className='w-full'>
          <CardHeader>
            <CardTitle className='text-lg'>
              {translations.availableTimes}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2'>
              {dateGroups[selectedDate].dates.map((date, index) => {
                const timeDate = new Date(date.originalDate);
                const isTimePast = timeDate < currentDate;

                return (
                  <Button
                    key={index}
                    variant='outline'
                    className={`h-auto py-2 ${
                      isTimePast ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isTimePast}
                  >
                    <div className='flex items-center gap-2'>
                      <Clock className='h-4 w-4' />
                      <span>{date.time}</span>
                      {isTimePast && (
                        <span className='text-xs text-muted-foreground'>
                          (Past)
                        </span>
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : !allDatesPassed && !selectedDate ? (
        <p className='text-center text-muted-foreground'>
          {translations.selectDate}
        </p>
      ) : null}
    </div>
  );
}
