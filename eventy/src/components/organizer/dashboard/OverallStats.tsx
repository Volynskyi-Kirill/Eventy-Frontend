'use client';

import { useTranslations } from 'next-intl';
import {
  Calendar,
  CalendarCheck,
  Ticket,
  TicketCheck,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { StatsCard } from './StatsCard';
import { DashboardStats } from '@/lib/types/dashboard-stats.types';

interface OverallStatsProps {
  stats: DashboardStats;
}

export function OverallStats({ stats }: OverallStatsProps) {
  const t = useTranslations('DashboardPage');

  const formatCurrency = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  const calculateTicketSoldPercentage = () => {
    if (stats.totalTicketsCreated === 0) return 0;
    return Math.round(
      (stats.totalTicketsSold / stats.totalTicketsCreated) * 100
    );
  };

  const mainStats = [
    {
      title: t('totalEvents'),
      value: stats.totalEvents.toLocaleString(),
      subtitle:
        stats.eventsThisMonth > 0
          ? t('eventsThisMonth', { count: stats.eventsThisMonth })
          : undefined,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: t('eventsThisMonth'),
      value: stats.eventsThisMonth.toLocaleString(),
      icon: CalendarCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: t('totalRevenue'),
      value: formatCurrency(stats.totalRevenue, stats.currency),
      subtitle:
        stats.averageRevenuePerEvent > 0
          ? t('averagePerEvent', {
              amount: formatCurrency(
                stats.averageRevenuePerEvent,
                stats.currency
              ),
            })
          : undefined,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: t('averageRevenuePerEvent'),
      value: formatCurrency(stats.averageRevenuePerEvent, stats.currency),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: t('ticketsSold'),
      value: stats.totalTicketsSold.toLocaleString(),
      subtitle: `${calculateTicketSoldPercentage()}% ${t(
        'of'
      )} ${stats.totalTicketsCreated.toLocaleString()} ${t('totalTickets')}`,
      icon: TicketCheck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: t('totalTicketsCreated'),
      value: stats.totalTicketsCreated.toLocaleString(),
      icon: Ticket,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {mainStats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
