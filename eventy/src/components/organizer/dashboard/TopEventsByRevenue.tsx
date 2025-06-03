'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { TrendingUp, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { URLS } from '@/components/shared/Navigation/urls';
import { TopEventByRevenue } from '@/lib/types/dashboard-stats.types';
import {
  formatCurrency,
  formatDate,
  getOccupancyPercentage,
  getOccupancyColor,
} from '@/lib/utils/dashboard-utils';

interface TopEventsByRevenueProps {
  events: TopEventByRevenue[];
}

export function TopEventsByRevenue({ events }: TopEventsByRevenueProps) {
  const t = useTranslations('DashboardPage');

  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <TrendingUp className='h-5 w-5' />
            {t('topEventsByRevenue')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-center py-8'>
            <p className='text-muted-foreground'>{t('noEventsYet')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <TrendingUp className='h-5 w-5' />
          {t('topEventsByRevenue')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {events.map((event, index) => {
            const occupancyPercentage = getOccupancyPercentage(
              event.ticketsSold,
              event.totalTickets
            );

            return (
              <div
                key={event.id}
                className='flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors'
              >
                <div className='flex-1 space-y-1'>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold'>
                      {index + 1}
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-semibold text-lg'>{event.title}</h4>
                      <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                        <span>
                          {t('revenue')}:{' '}
                          {formatCurrency(event.revenue, event.currency)}
                        </span>
                        <span>
                          {t('ticketsSold')}: {event.ticketsSold}/
                          {event.totalTickets}
                        </span>
                        <span>
                          {t('nextDate')}:{' '}
                          {formatDate(event.nextEventDate) ||
                            t('noUpcomingDate')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Badge className={getOccupancyColor(occupancyPercentage)}>
                    {occupancyPercentage}% {t('filled')}
                  </Badge>
                  <Button variant='outline' size='sm' asChild>
                    <Link href={URLS.ORGANIZER.EVENT_DETAILS(event.id)}>
                      <ExternalLink className='h-4 w-4' />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
