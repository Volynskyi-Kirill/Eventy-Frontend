'use client';

import { useQuery } from '@tanstack/react-query';
import { eventsService } from '@/lib/api/events.service';
import { DashboardStatsQueryParams } from '@/lib/types/dashboard-stats.types';

const QUERY_KEY = 'organizer-dashboard-stats';
const STALE_TIME = 300000; // 5 minutes
const REFETCH_INTERVAL = 300000; // 5 minutes

export function useOrganizerDashboardStats(params?: DashboardStatsQueryParams) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => eventsService.getOrganizerDashboardStats(params),
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    refetchOnWindowFocus: true,
    retry: 3,
  });
}
