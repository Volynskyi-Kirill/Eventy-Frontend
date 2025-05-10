'use client';

import { useState } from 'react';
import { Event } from '@/lib/types/event.types';
import { ticketsService, Ticket } from '@/lib/api/tickets.service';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { QUERY_KEYS } from '@/lib/constants';
import { TicketSelectionStep, DateInfo, ZoneInfo } from './TicketSelectionStep';
import { PaymentDetailsStep } from './PaymentDetailsStep';
import { LoadingBookingForm } from './LoadingBookingForm';

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

// Main component props
type EventBookingFormProps = {
  event: Event;
};

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

export default EventBookingForm;
