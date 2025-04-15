import { EventDate as EventDateType } from '@/lib/types/event.types';

type FormattedDate = {
  day: string;
  month: string;
  year: string;
  time: string;
  originalDate: string;
};

export const formatEventDates = (dates: EventDateType[]): FormattedDate[] => {
  return dates.map((date) => {
    const dateObj = new Date(date.date);
    return {
      day: dateObj.getDate().toString().padStart(2, '0'),
      month: (dateObj.getMonth() + 1).toString().padStart(2, '0'),
      year: dateObj.getFullYear().toString(),
      time: dateObj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      originalDate: date.date,
    };
  });
};
