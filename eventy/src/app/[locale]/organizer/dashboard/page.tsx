'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Plus, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrganizerDashboardStats } from '@/lib/hooks/useOrganizerDashboardStats';
import { OverallStats } from '@/components/organizer/dashboard/OverallStats';
import { TopEventsByRevenue } from '@/components/organizer/dashboard/TopEventsByRevenue';
import { TopEventsByTickets } from '@/components/organizer/dashboard/TopEventsByTickets';
import { CategoryDistributionChart } from '@/components/organizer/dashboard/CategoryDistributionChart';
import { RecentEventsTable } from '@/components/organizer/dashboard/RecentEventsTable';
import { UpcomingEventsTable } from '@/components/organizer/dashboard/UpcomingEventsTable';
import { DashboardEmptyState } from '@/components/organizer/dashboard/DashboardEmptyState';
import { URLS } from '@/components/shared/Navigation/urls';

export default function DashboardPage() {
  const t = useTranslations('DashboardPage');
  const { data: stats, isLoading, error } = useOrganizerDashboardStats();

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-center items-center py-12'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
            <p className='text-lg text-muted-foreground'>{t('loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center py-12'>
          <h2 className='text-xl font-semibold text-destructive mb-2'>
            {t('errorTitle')}
          </h2>
          <p className='text-muted-foreground'>{t('errorDescription')}</p>
        </div>
      </div>
    );
  }

  // Show empty state if no events
  if (!stats || stats.totalEvents === 0) {
    return <DashboardEmptyState />;
  }

  return (
    <div className='container mx-auto px-4 py-8 space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold flex items-center gap-3'>
            <BarChart3 className='h-8 w-8' />
            {t('pageTitle')}
          </h1>
          <p className='text-muted-foreground mt-1'>{t('pageDescription')}</p>
        </div>
        <Button asChild>
          <Link href={URLS.ORGANIZER.EVENTS_NEW}>
            <Plus className='h-4 w-4 mr-2' />
            {t('createEvent')}
          </Link>
        </Button>
      </div>

      {/* Overall Statistics */}
      <OverallStats stats={stats} />

      {/* Charts and Top Events Row */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Category Distribution Chart */}
        <CategoryDistributionChart categories={stats.categoryStats} />

        {/* Top Events by Revenue */}
        <TopEventsByRevenue events={stats.topEventsByRevenue} />
      </div>

      {/* Top Events by Tickets */}
      <TopEventsByTickets events={stats.topEventsByTickets} />

      {/* Recent Activity Row */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Recent Events */}
        <RecentEventsTable events={stats.recentEvents} />

        {/* Upcoming Events */}
        <UpcomingEventsTable events={stats.upcomingEvents} />
      </div>
    </div>
  );
}
