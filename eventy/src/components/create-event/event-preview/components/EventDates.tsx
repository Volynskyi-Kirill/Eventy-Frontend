import { Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface DateObject {
  date?: string;
  [key: string]: any;
}

interface EventDatesProps {
  dates?: DateObject[];
  t: any;
}

export function EventDates({ dates, t }: EventDatesProps) {
  const hasValidDates =
    dates && dates.length > 0 && dates.some((dateObj) => dateObj.date);

  if (!hasValidDates) {
    return null;
  }

  return (
    <div className='mb-2'>
      {dates!.map((dateObj, idx) =>
        dateObj.date ? (
          <div
            key={idx}
            className='flex items-center text-sm text-gray-500 mb-1'
          >
            <Calendar className='h-4 w-4 mr-1' />
            <span>{formatDate(dateObj.date)}</span>
          </div>
        ) : null
      )}
    </div>
  );
}
