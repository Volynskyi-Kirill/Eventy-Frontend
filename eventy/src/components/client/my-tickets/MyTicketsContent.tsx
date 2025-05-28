'use client';

import { URLS } from '@/components/shared/Navigation/urls';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ticketsService, UserTicket } from '@/lib/api/tickets.service';
import { QUERY_KEYS } from '@/lib/constants';
import { useAuthStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { Loader2, MapPin, Ticket } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { TicketCard } from './TicketCard';

export function MyTicketsContent() {
  const t = useTranslations('MyTicketsPage');
  const router = useRouter();
  const { user } = useAuthStore();

  const {
    data: userTickets,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER_TICKETS],
    queryFn: () => ticketsService.getUserTickets(),
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='flex items-center gap-2'>
          <Loader2 className='h-6 w-6 animate-spin' />
          <span className='text-lg'>{t('loading')}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className='p-8 text-center'>
        <CardContent>
          <div className='flex flex-col items-center gap-4'>
            <Ticket className='h-12 w-12 text-muted-foreground' />
            <div>
              <h3 className='text-lg font-semibold mb-2'>{t('error')}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userTickets || userTickets.length === 0) {
    return (
      <Card className='p-8 text-center'>
        <CardContent>
          <div className='flex flex-col items-center gap-4'>
            <Ticket className='h-12 w-12 text-muted-foreground' />
            <div>
              <h3 className='text-lg font-semibold mb-2'>{t('noTickets')}</h3>
              <p className='text-muted-foreground mb-4'>
                {t('noTicketsDescription')}
              </p>
              <Button onClick={() => router.push(URLS.CLIENT.EVENTS)}>
                {t('browseEvents')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Group tickets by event
  const ticketsByEvent = userTickets.reduce<Record<number, UserTicket[]>>(
    (groups, ticket) => {
      const eventId = ticket.ticket.eventZone.event.id;
      if (!groups[eventId]) {
        groups[eventId] = [];
      }
      groups[eventId].push(ticket);
      return groups;
    },
    {}
  );

  return (
    <div className='space-y-6'>
      {Object.entries(ticketsByEvent).map(([eventId, tickets]) => {
        const event = tickets[0].ticket.eventZone.event;
        return (
          <div key={eventId} className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-xl font-semibold'>{event.title}</h2>
                <div className='flex items-center gap-4 text-sm text-muted-foreground mt-1'>
                  <div className='flex items-center gap-1'>
                    <MapPin className='h-4 w-4' />
                    <span>
                      {event.city}, {event.state}, {event.country}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant='outline'
                onClick={() => router.push(URLS.CLIENT.EVENT(event.id))}
              >
                {t('viewEvent')}
              </Button>
            </div>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {tickets.map((userTicket) => (
                <TicketCard key={userTicket.ticketId} userTicket={userTicket} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
