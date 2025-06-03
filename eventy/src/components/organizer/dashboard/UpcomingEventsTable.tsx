'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { CalendarDays, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { URLS } from '@/components/shared/Navigation/urls';
import { UpcomingEvent } from '@/lib/types/dashboard-stats.types';

interface UpcomingEventsTableProps {
  events: UpcomingEvent[];
}

export function UpcomingEventsTable({ events }: UpcomingEventsTableProps) {
  const t = useTranslations('DashboardPage');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  const getDaysUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 3) return 'bg-red-100 text-red-800';
    if (days <= 7) return 'bg-yellow-100 text-yellow-800';
    if (days <= 14) return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  };

  const getUrgencyText = (days: number) => {
    if (days <= 0) return t('today');
    if (days === 1) return t('tomorrow');
    if (days <= 7) return t('thisWeek');
    if (days <= 30) return t('thisMonth');
    return t('upcoming');
  };

  const getTicketStatus = (sold: number, total: number) => {
    if (total === 0)
      return { text: t('noTickets'), color: 'bg-gray-100 text-gray-800' };

    const percentage = (sold / total) * 100;

    if (percentage === 0) {
      return { text: t('notStarted'), color: 'bg-red-100 text-red-800' };
    } else if (percentage === 100) {
      return { text: t('soldOut'), color: 'bg-green-100 text-green-800' };
    } else if (percentage >= 80) {
      return { text: t('almostFull'), color: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { text: t('onSale'), color: 'bg-blue-100 text-blue-800' };
    }
  };

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
              event.totalTickets
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
                        : getUrgencyText(daysUntil)}
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
