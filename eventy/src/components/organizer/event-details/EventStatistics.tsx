'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Ticket, DollarSign, UserCheck } from 'lucide-react';
import { EventStatistics as EventStatisticsType } from '@/lib/types/organizer-event-details.types';

interface EventStatisticsProps {
  statistics: EventStatisticsType;
  selectedDate?: string;
}

export function EventStatistics({
  statistics,
  selectedDate,
}: EventStatisticsProps) {
  const t = useTranslations('OrganizerEventDetailsPage');

  const formatCurrency = (amount: number, currency: string) => {
    return `${amount} ${currency}`;
  };

  const getOccupancyPercentage = () => {
    if (statistics.totalSeats === 0) return 0;
    return Math.round((statistics.guestsCount / statistics.totalSeats) * 100);
  };

  const getOccupancyColor = () => {
    const percentage = getOccupancyPercentage();
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const statisticsCards = [
    {
      title: t('soldTickets'),
      value: statistics.soldTickets,
      total: statistics.totalTickets,
      icon: Ticket,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: t('totalRevenue'),
      value: formatCurrency(statistics.totalRevenue, statistics.currency),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: t('guestsCount'),
      value: statistics.guestsCount,
      total: statistics.totalSeats,
      icon: Users,
      color: getOccupancyColor(),
      bgColor: 'bg-purple-50',
      percentage: getOccupancyPercentage(),
    },
    {
      title: t('availableTickets'),
      value: statistics.availableTickets,
      icon: UserCheck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>
          {selectedDate ? t('statisticsForDate') : t('overallStatistics')}
        </h3>
        {selectedDate && (
          <span className='text-sm text-muted-foreground'>
            {new Date(selectedDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {statisticsCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <Card key={index}>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium text-muted-foreground'>
                      {card.title}
                    </p>
                    <div className='flex items-baseline space-x-2'>
                      <p className={`text-2xl font-bold ${card.color}`}>
                        {card.value}
                      </p>
                      {card.total !== undefined && (
                        <p className='text-sm text-muted-foreground'>
                          / {card.total}
                        </p>
                      )}
                    </div>
                    {card.percentage !== undefined && (
                      <p className={`text-xs ${card.color}`}>
                        {card.percentage}% {t('occupancy')}
                      </p>
                    )}
                  </div>
                  <div className={`p-2 rounded-full ${card.bgColor}`}>
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
