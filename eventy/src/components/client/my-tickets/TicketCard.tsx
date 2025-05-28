'use client';

// import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserTicket } from '@/lib/api/tickets.service';
import { buildImageUrl } from '@/lib/utils/imageUrl';
import { Calendar, Clock, Hash, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type TicketCardProps = {
  userTicket: UserTicket;
};

export function TicketCard({ userTicket }: TicketCardProps) {
  const t = useTranslations('MyTicketsPage');
  const { ticket, soldAt, paymentMethod } = userTicket;
  const { eventZone, eventDate } = ticket;
  const { event } = eventZone;

  const eventDateTime = new Date(eventDate.date);
  const purchaseDateTime = new Date(soldAt);

  const formatEventDate = (date: Date) => {
    return date.toLocaleDateString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatEventTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPurchaseDate = (date: Date) => {
    return date.toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SOLD':
        return 'bg-green-100 text-green-800';
      case 'RESERVED':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'onsite':
        return t('paymentMethods.onsite');
      default:
        return method;
    }
  };

  return (
    <Card className='overflow-hidden hover:shadow-md transition-shadow'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <CardTitle className='text-lg flex items-center gap-2'>
            <Hash className='h-4 w-4' />
            {t('ticketInfo', { seatNumber: ticket.seatNumber })}
          </CardTitle>
          {/* <Badge className={getStatusColor(ticket.status)}>
            {ticket.status}
          </Badge> */}
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Event Image */}
        {event.mainImg && (
          <div className='aspect-video rounded-lg overflow-hidden bg-muted'>
            <Image
              src={buildImageUrl(event.mainImg)}
              alt={event.title}
              width={400}
              height={225}
              className='w-full h-full object-cover'
            />
          </div>
        )}

        {/* Zone Information */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>{t('zone')}:</span>
            <span className='text-sm'>{eventZone.name}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>{t('price')}:</span>
            <span className='text-sm font-semibold'>
              {eventZone.price} {eventZone.currency}
            </span>
          </div>
        </div>

        {/* Date and Time */}
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <Calendar className='h-4 w-4 text-muted-foreground' />
            <div className='flex-1'>
              <div className='text-sm font-medium'>{t('date')}:</div>
              <div className='text-sm text-muted-foreground'>
                {formatEventDate(eventDateTime)}
              </div>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4 text-muted-foreground' />
            <div className='flex-1'>
              <div className='text-sm font-medium'>{t('time')}:</div>
              <div className='text-sm text-muted-foreground'>
                {formatEventTime(eventDateTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className='flex items-center gap-2'>
          <MapPin className='h-4 w-4 text-muted-foreground' />
          <div className='flex-1'>
            <div className='text-sm font-medium'>{t('location')}:</div>
            <div className='text-sm text-muted-foreground'>
              {event.street} {event.buildingNumber}, {event.city}
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className='pt-2 border-t space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>{t('paymentMethod')}:</span>
            <span className='text-sm'>
              {getPaymentMethodLabel(paymentMethod)}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>{t('purchaseDate')}:</span>
            <span className='text-sm text-muted-foreground'>
              {formatPurchaseDate(purchaseDateTime)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
