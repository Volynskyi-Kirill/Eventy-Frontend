'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EventDateTimeSlot } from '@/lib/types/organizer-event-details.types';

interface EventDateSelectorProps {
  dates: EventDateTimeSlot[];
  selectedDate?: string;
  onDateChange: (date?: string) => void;
}

export function EventDateSelector({
  dates,
  selectedDate,
  onDateChange,
}: EventDateSelectorProps) {
  const t = useTranslations('OrganizerEventDetailsPage');

  // Group dates by date (in case there are multiple times for the same date)
  const groupedDates = dates.reduce((acc, dateSlot) => {
    const date = dateSlot.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(dateSlot);
    return acc;
  }, {} as Record<string, EventDateTimeSlot[]>);

  const sortedDates = Object.keys(groupedDates).sort();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const isDateSelected = (date: string) => selectedDate === date;
  const isAllDatesSelected = !selectedDate;

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        {/* All Dates Option */}
        <Button
          variant={isAllDatesSelected ? 'default' : 'outline'}
          size='sm'
          onClick={() => onDateChange(undefined)}
          className='flex-shrink-0'
        >
          {t('allDates')}
        </Button>

        {/* Individual Date Options */}
        {sortedDates.map((date) => {
          const timeSlots = groupedDates[date];
          const isSelected = isDateSelected(date);

          return (
            <div key={date} className='flex flex-col gap-1'>
              <Button
                variant={isSelected ? 'default' : 'outline'}
                size='sm'
                onClick={() => onDateChange(date)}
                className='flex-shrink-0'
              >
                {formatDate(date)}
              </Button>

              {/* Show time slots for selected date */}
              {isSelected && timeSlots.length > 1 && (
                <div className='flex flex-wrap gap-1 mt-1'>
                  {timeSlots.map((slot) => (
                    <Badge
                      key={slot.eventDateId}
                      variant='secondary'
                      className='text-xs'
                    >
                      {slot.time}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className='text-sm text-muted-foreground'>
          {t('selectedDate')}: {formatDate(selectedDate)}
          {groupedDates[selectedDate]?.length > 1 && (
            <span className='ml-2'>
              ({groupedDates[selectedDate].length} {t('timeSlots')})
            </span>
          )}
        </div>
      )}

      {isAllDatesSelected && (
        <div className='text-sm text-muted-foreground'>
          {t('showingAllDates')} ({dates.length} {t('totalSlots')})
        </div>
      )}
    </div>
  );
}
