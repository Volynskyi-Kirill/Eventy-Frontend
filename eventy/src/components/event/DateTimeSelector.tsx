'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

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
  };
};

export function DateTimeSelector({
  dates,
  translations,
}: DateTimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Group dates by day/month/year
  const dateGroups = dates.reduce<Record<string, FormattedDate[]>>(
    (groups, date) => {
      const dateKey = `${date.day}.${date.month}.${date.year}`;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(date);
      return groups;
    },
    {}
  );

  const handleDateClick = (dateKey: string) => {
    setSelectedDate(selectedDate === dateKey ? null : dateKey);
  };

  return (
    <div className='flex flex-col w-full'>
      <h2 className='text-2xl font-bold mb-4 text-center'>
        {translations.availableDates}
      </h2>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-6'>
        {Object.keys(dateGroups).map((dateKey) => (
          <Button
            key={dateKey}
            variant={selectedDate === dateKey ? 'default' : 'outline'}
            className='h-auto py-2'
            onClick={() => handleDateClick(dateKey)}
          >
            <div className='text-center'>
              <div className='text-sm'>{dateKey}</div>
            </div>
          </Button>
        ))}
      </div>

      {selectedDate ? (
        <Card className='w-full'>
          <CardHeader>
            <CardTitle className='text-lg'>
              {translations.availableTimes}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2'>
              {dateGroups[selectedDate].map((date, index) => (
                <Button key={index} variant='outline' className='h-auto py-2'>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4' />
                    <span>{date.time}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <p className='text-center text-muted-foreground'>
          {translations.selectDate}
        </p>
      )}
    </div>
  );
}
