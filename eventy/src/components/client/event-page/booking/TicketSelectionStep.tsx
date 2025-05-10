import { Event } from '@/lib/types/event.types';
import { Ticket } from '@/lib/api/tickets.service';
import { Button } from '@/components/ui/button';
import EventCard from '../EventCard';
import DateTimeZoneSelector from './DateTimeZoneSelector';
import TicketQuantitySelector from './TicketQuantitySelector';

// Types
type DateInfo = {
  dateId: number;
  dateStr: string;
  formattedDate: string;
  time: string;
} | null;

type ZoneInfo = {
  zoneId: number;
  zoneName: string;
  price: number;
  currency: string;
} | null;

type TicketSelectionStepProps = {
  event: Event;
  groupedTickets: any[];
  selectedDate: DateInfo;
  selectedZone: ZoneInfo;
  ticketCount: number;
  totalPrice: number;
  availableTickets: Ticket[];
  onDateZoneSelect: (
    dateInfo: DateInfo,
    zoneInfo: ZoneInfo,
    tickets: Ticket[]
  ) => void;
  onDateChange: () => void;
  onTicketCountChange: (count: number) => void;
  onNextStep: () => void;
  translations: {
    t: any;
    ticketTranslations: any;
  };
};

const TicketSelectionStep = ({
  event,
  groupedTickets,
  selectedDate,
  selectedZone,
  ticketCount,
  totalPrice,
  availableTickets,
  onDateZoneSelect,
  onDateChange,
  onTicketCountChange,
  onNextStep,
  translations,
}: TicketSelectionStepProps) => {
  const { t, ticketTranslations } = translations;

  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <EventCard event={event} compact />
        </div>

        <div>
          <DateTimeZoneSelector
            groupedTickets={groupedTickets}
            onSelect={onDateZoneSelect}
            onDateChange={onDateChange}
          />
        </div>
      </div>

      {selectedZone && selectedDate && (
        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='p-6 border rounded-lg'>
            <h3 className='text-xl font-semibold mb-4'>
              {t('selectedOptions')}
            </h3>
            <div className='space-y-2'>
              <p>
                <span className='font-medium'>{t('date')}:</span>{' '}
                {selectedDate.formattedDate}
              </p>
              <p>
                <span className='font-medium'>{t('time')}:</span>{' '}
                {selectedDate.time}
              </p>
              <p>
                <span className='font-medium'>{t('zone')}:</span>{' '}
                {selectedZone.zoneName}
              </p>
              <p>
                <span className='font-medium'>{t('pricePerTicket')}:</span>{' '}
                {selectedZone.price} {selectedZone.currency}
              </p>
            </div>
          </div>

          <div className='flex flex-col space-y-4'>
            <TicketQuantitySelector
              maxTickets={Math.min(
                10,
                availableTickets?.filter(
                  (t) =>
                    t.eventZoneId === selectedZone.zoneId &&
                    t.eventDateId === selectedDate.dateId
                ).length || 0
              )}
              ticketCount={ticketCount}
              onChange={onTicketCountChange}
              translations={ticketTranslations}
            />

            <div className='p-6 border rounded-lg'>
              <div className='flex justify-between items-center text-xl font-bold'>
                <span>{t('totalPrice')}</span>
                <span>
                  {totalPrice} {selectedZone.currency}
                </span>
              </div>
            </div>

            <Button
              size='lg'
              onClick={onNextStep}
              disabled={!selectedDate || !selectedZone || ticketCount < 1}
              className='mt-2'
            >
              {t('next')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { TicketSelectionStep, type DateInfo, type ZoneInfo };
