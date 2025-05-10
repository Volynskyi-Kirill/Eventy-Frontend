import { Event } from '@/lib/types/event.types';
import { Button } from '@/components/ui/button';
import EventCard from '../EventCard';
import ContactDetailsForm from './ContactDetailsForm';
import { DateInfo, ZoneInfo } from './TicketSelectionStep';

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

export { PaymentDetailsStep };
