'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { URLS } from '@/components/shared/Navigation/urls';
import { RecentEvent } from '@/lib/types/dashboard-stats.types';

interface RecentEventsTableProps {
  events: RecentEvent[];
}

export function RecentEventsTable({ events }: RecentEventsTableProps) {
  const t = useTranslations('DashboardPage');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
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
            <Clock className='h-5 w-5' />
            {t('recentEvents')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-center py-8'>
            <p className='text-muted-foreground'>{t('noRecentEvents')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Clock className='h-5 w-5' />
          {t('recentEvents')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {events.map((event) => {
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
                    <Badge className={ticketStatus.color}>
                      {ticketStatus.text}
                    </Badge>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground'>
                    <span>
                      {t('created')}: {formatDateTime(event.createdAt)}
                    </span>
                    <span>
                      {t('nextDate')}:{' '}
                      {event.nextEventDate
                        ? formatDate(event.nextEventDate)
                        : t('noUpcomingDate')}
                    </span>
                    <span>
                      {t('tickets')}: {event.ticketsSold}/{event.totalTickets}
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
