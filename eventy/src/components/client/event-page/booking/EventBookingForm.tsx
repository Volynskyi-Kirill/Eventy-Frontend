'use client';

import { useState } from 'react';
import { Event } from '@/lib/types/event.types';
import EventCard from '../EventCard';
import { ticketsService, Ticket } from '@/lib/api/tickets.service';
import { useQuery } from '@tanstack/react-query';
import DateTimeZoneSelector from './DateTimeZoneSelector';
import TicketQuantitySelector from './TicketQuantitySelector';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import ContactDetailsForm from './ContactDetailsForm';
import { QUERY_KEYS } from '@/lib/constants';

// Constants for form steps
const BOOKING_STEPS = {
  TICKET_SELECTION: 'TICKET_SELECTION',
  PAYMENT_DETAILS: 'PAYMENT_DETAILS',
};

// Default state values
const DEFAULT_VALUES = {
  TICKET_COUNT: 1,
  PAYMENT_METHOD: 'credit',
};

// Types
type EventBookingFormProps = {
  event: Event;
};

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

// Main component
const EventBookingForm = ({ event }: EventBookingFormProps) => {
  const t = useTranslations('BookingPage');
  const ticketT = useTranslations('Tickets');

  // Form state
  const [currentStep, setCurrentStep] = useState(
    BOOKING_STEPS.TICKET_SELECTION
  );
  const [selectedDate, setSelectedDate] = useState<DateInfo>(null);
  const [selectedZone, setSelectedZone] = useState<ZoneInfo>(null);
  const [ticketCount, setTicketCount] = useState(DEFAULT_VALUES.TICKET_COUNT);
  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);
  const [paymentMethod, setPaymentMethod] = useState(
    DEFAULT_VALUES.PAYMENT_METHOD
  );

  // Fetch available tickets
  const { data: availableTickets, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.AVAILABLE_TICKETS, event.id],
    queryFn: () => ticketsService.getAvailableTickets(event.id),
    enabled: !!event.id,
  });

  const groupedTickets = availableTickets
    ? ticketsService.groupTicketsByDateAndZone(availableTickets)
    : [];

  const totalPrice = selectedZone ? selectedZone.price * ticketCount : 0;

  // Event handlers
  const handleDateZoneSelect = (
    dateInfo: DateInfo,
    zoneInfo: ZoneInfo,
    tickets: Ticket[]
  ) => {
    setSelectedDate(dateInfo);
    setSelectedZone(zoneInfo);
    setSelectedTickets(tickets.slice(0, ticketCount));
  };

  const handleDateChange = () => {
    // Reset all selections when date changes
    setSelectedZone(null);
    setSelectedTickets([]);
    setTicketCount(DEFAULT_VALUES.TICKET_COUNT);
  };

  const handleTicketCountChange = (count: number) => {
    setTicketCount(count);
    // Update selected tickets based on count
    if (selectedTickets.length > 0) {
      setSelectedTickets((prev) => prev.slice(0, count));
    }
  };

  const handleNextStep = () => {
    setCurrentStep(BOOKING_STEPS.PAYMENT_DETAILS);
  };

  const handlePreviousStep = () => {
    setCurrentStep(BOOKING_STEPS.TICKET_SELECTION);
  };

  // Purchase handler
  const handleCompletePurchase = async (contactInfo: any) => {
    if (!selectedTickets.length || !selectedZone) return;

    try {
      await ticketsService.purchaseTicket({
        ticketIds: selectedTickets.map((ticket) => ticket.id),
        paymentMethod,
        contactInfo,
        agreeToTerms: true,
      });

      // Handle success (redirect to success page or show success message)
      console.log('Purchase successful');
      // Redirect to success page
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const ticketTranslations = {
    tickets: ticketT('tickets'),
    ticketCount: ticketT('ticketCount'),
    increase: ticketT('increase'),
    decrease: ticketT('decrease'),
  };

  // Loading state
  if (isLoading) {
    return <LoadingBookingForm />;
  }

  return (
    <div className='flex flex-col'>
      {currentStep === BOOKING_STEPS.TICKET_SELECTION ? (
        <TicketSelectionStep
          event={event}
          groupedTickets={groupedTickets}
          selectedDate={selectedDate}
          selectedZone={selectedZone}
          ticketCount={ticketCount}
          totalPrice={totalPrice}
          availableTickets={availableTickets || []}
          onDateZoneSelect={handleDateZoneSelect}
          onDateChange={handleDateChange}
          onTicketCountChange={handleTicketCountChange}
          onNextStep={handleNextStep}
          translations={{ t, ticketTranslations }}
        />
      ) : (
        <PaymentDetailsStep
          event={event}
          selectedDate={selectedDate}
          selectedZone={selectedZone}
          ticketCount={ticketCount}
          totalPrice={totalPrice}
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
          onPreviousStep={handlePreviousStep}
          onCompletePurchase={handleCompletePurchase}
          translations={{ t }}
        />
      )}
    </div>
  );
};

// Loading component
const LoadingBookingForm = () => (
  <div className='p-8 text-center'>
    <div className='animate-pulse h-8 w-48 bg-muted rounded mx-auto mb-4'></div>
    <div className='animate-pulse h-4 w-64 bg-muted rounded mx-auto'></div>
  </div>
);

// Step 1: Ticket Selection
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

// Step 2: Payment Details
type PaymentDetailsStepProps = {
  event: Event;
  selectedDate: DateInfo;
  selectedZone: ZoneInfo;
  ticketCount: number;
  totalPrice: number;
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  onPreviousStep: () => void;
  onCompletePurchase: (contactInfo: any) => void;
  translations: {
    t: any;
  };
};

const PaymentDetailsStep = ({
  event,
  selectedDate,
  selectedZone,
  ticketCount,
  totalPrice,
  paymentMethod,
  onPaymentMethodChange,
  onPreviousStep,
  onCompletePurchase,
  translations,
}: PaymentDetailsStepProps) => {
  const { t } = translations;

  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <EventCard event={event} compact />

          <div className='p-6 border rounded-lg mt-6'>
            <h3 className='text-xl font-semibold mb-4'>
              {t('selectedOptions')}
            </h3>
            <div className='space-y-2'>
              <p>
                <span className='font-medium'>{t('date')}:</span>{' '}
                {selectedDate?.formattedDate}
              </p>
              <p>
                <span className='font-medium'>{t('time')}:</span>{' '}
                {selectedDate?.time}
              </p>
              <p>
                <span className='font-medium'>{t('zone')}:</span>{' '}
                {selectedZone?.zoneName}
              </p>
              <p>
                <span className='font-medium'>{t('tickets')}:</span>{' '}
                {ticketCount}
              </p>
              <p>
                <span className='font-medium'>{t('totalPrice')}:</span>{' '}
                {totalPrice} {selectedZone?.currency}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold mb-4'>{t('paymentMethod')}</h3>
            <div className='grid grid-cols-3 gap-4'>
              {['credit', 'paypal', 'other'].map((method) => (
                <div
                  key={method}
                  className={`p-4 border rounded-lg text-center cursor-pointer ${
                    paymentMethod === method
                      ? 'border-primary bg-primary/10'
                      : ''
                  }`}
                  onClick={() => onPaymentMethodChange(method)}
                >
                  <div className='h-8 w-full bg-muted rounded mb-2'></div>
                  <p className='text-sm font-medium capitalize'>{method}</p>
                </div>
              ))}
            </div>
          </div>

          <ContactDetailsForm onSubmit={onCompletePurchase} />

          <div className='mt-6 flex flex-col md:flex-row gap-4'>
            <Button variant='outline' onClick={onPreviousStep}>
              {t('back')}
            </Button>
            <Button type='submit' form='contact-form' className='flex-1'>
              {t('buyTickets')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBookingForm;
