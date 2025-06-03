'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { CalendarDays, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { URLS } from '@/components/shared/Navigation/urls';
import { UpcomingEvent } from '@/lib/types/dashboard-stats.types';
import {
  formatCurrency,
  formatDateTime,
  getDaysUntilEvent,
  getUrgencyColor,
  getUrgencyText,
  getTicketStatus,
} from '@/lib/utils/dashboard-utils';

interface UpcomingEventsTableProps {
  events: UpcomingEvent[];
}

export function UpcomingEventsTable({ events }: UpcomingEventsTableProps) {
  const t = useTranslations('DashboardPage');

  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <CalendarDays className='h-5 w-5' />
            {t('upcomingEvents')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-center py-8'>
            <p className='text-muted-foreground'>{t('noUpcomingEvents')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <CalendarDays className='h-5 w-5' />
          {t('upcomingEvents')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {events.map((event) => {
            const daysUntil = getDaysUntilEvent(event.nextEventDate);
            const ticketStatus = getTicketStatus(
              event.ticketsSold,
              event.totalTickets,
              event.nextEventDate,
              t
            );

            return (
              <div
                key={event.id}
                className='flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors'
              >
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center gap-3'>
                    <h4 className='font-semibold text-lg'>{event.title}</h4>
                    <Badge className={getUrgencyColor(daysUntil)}>
                      {daysUntil > 0
                        ? `${daysUntil} ${t('daysLeft')}`
                        : getUrgencyText(daysUntil, t)}
                    </Badge>
                    <Badge className={ticketStatus.color}>
                      {ticketStatus.text}
                    </Badge>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground'>
                    <span>
                      {t('eventDate')}: {formatDateTime(event.nextEventDate)}
                    </span>
                    <span>
                      {t('tickets')}: {event.ticketsSold}/{event.totalTickets}
                    </span>
                    <span>
                      {t('revenue')}:{' '}
                      {formatCurrency(event.revenue, event.currency)}
                    </span>
                  </div>
                </div>
                <Button variant='outline' size='sm' asChild>
                  <Link href={URLS.ORGANIZER.EVENT_DETAILS(event.id)}>
                    <ExternalLink className='h-4 w-4' />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
