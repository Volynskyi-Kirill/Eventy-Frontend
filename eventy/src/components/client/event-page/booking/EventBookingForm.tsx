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

type EventBookingFormProps = {
  event: Event;
};

const EventBookingForm = ({ event }: EventBookingFormProps) => {
  const t = useTranslations('BookingPage');
  const ticketT = useTranslations('Tickets');

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<{
    dateId: number;
    dateStr: string;
    formattedDate: string;
    time: string;
  } | null>(null);
  const [selectedZone, setSelectedZone] = useState<{
    zoneId: number;
    zoneName: string;
    price: number;
    currency: string;
  } | null>(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('credit');

  // Fetch available tickets
  const { data: availableTickets, isLoading } = useQuery({
    queryKey: ['availableTickets', event.id],
    queryFn: () => ticketsService.getAvailableTickets(event.id),
    enabled: !!event.id,
  });

  const groupedTickets = availableTickets
    ? ticketsService.groupTicketsByDateAndZone(availableTickets)
    : [];

  const totalPrice = selectedZone ? selectedZone.price * ticketCount : 0;

  const handleDateZoneSelect = (
    dateInfo: typeof selectedDate,
    zoneInfo: typeof selectedZone,
    tickets: Ticket[]
  ) => {
    setSelectedDate(dateInfo);
    setSelectedZone(zoneInfo);
    setSelectedTickets(tickets.slice(0, ticketCount));
  };

  const handleTicketCountChange = (count: number) => {
    setTicketCount(count);
    // Update selected tickets based on count
    if (selectedTickets.length > 0) {
      setSelectedTickets((prev) => prev.slice(0, count));
    }
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  // Mock function for completing purchase
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

  if (isLoading) {
    return (
      <div className='p-8 text-center'>
        <div className='animate-pulse h-8 w-48 bg-muted rounded mx-auto mb-4'></div>
        <div className='animate-pulse h-4 w-64 bg-muted rounded mx-auto'></div>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      {step === 1 ? (
        <div className='p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
              <EventCard event={event} compact />

              <DateTimeZoneSelector
                groupedTickets={groupedTickets}
                onSelect={handleDateZoneSelect}
              />
            </div>

            <div className='flex flex-col space-y-6'>
              {selectedZone && selectedDate && (
                <>
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
                        <span className='font-medium'>
                          {t('pricePerTicket')}:
                        </span>{' '}
                        {selectedZone.price} {selectedZone.currency}
                      </p>
                    </div>
                  </div>

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
                    onChange={handleTicketCountChange}
                    translations={ticketTranslations}
                  />

                  <div className='p-6 border rounded-lg mt-auto'>
                    <div className='flex justify-between items-center text-xl font-bold'>
                      <span>{t('totalPrice')}</span>
                      <span>
                        {totalPrice} {selectedZone.currency}
                      </span>
                    </div>
                  </div>

                  <Button
                    size='lg'
                    onClick={handleNextStep}
                    disabled={!selectedDate || !selectedZone || ticketCount < 1}
                  >
                    {t('next')}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
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
                <h3 className='text-xl font-semibold mb-4'>
                  {t('paymentMethod')}
                </h3>
                <div className='grid grid-cols-3 gap-4'>
                  {['credit', 'paypal', 'other'].map((method) => (
                    <div
                      key={method}
                      className={`p-4 border rounded-lg text-center cursor-pointer ${
                        paymentMethod === method
                          ? 'border-primary bg-primary/10'
                          : ''
                      }`}
                      onClick={() => setPaymentMethod(method)}
                    >
                      <div className='h-8 w-full bg-muted rounded mb-2'></div>
                      <p className='text-sm font-medium capitalize'>{method}</p>
                    </div>
                  ))}
                </div>
              </div>

              <ContactDetailsForm onSubmit={handleCompletePurchase} />

              <div className='mt-6 flex flex-col md:flex-row gap-4'>
                <Button variant='outline' onClick={handlePreviousStep}>
                  {t('back')}
                </Button>
                <Button type='submit' form='contact-form' className='flex-1'>
                  {t('buyTickets')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventBookingForm;
