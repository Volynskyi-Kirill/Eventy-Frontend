'use client';

import { useQuery } from '@tanstack/react-query';
import { eventsService } from '@/lib/api/events.service';
import { OrganizerEventDetailsQueryParams } from '@/lib/types/organizer-event-details.types';

const QUERY_KEY = 'organizer-event-details';
const STALE_TIME = 60000; // 1 minute
const REFETCH_INTERVAL = 30000; // 30 seconds

export function useOrganizerEventDetails(
  eventId: number,
  params?: OrganizerEventDetailsQueryParams
) {
  return useQuery({
    queryKey: [QUERY_KEY, eventId, params],
    queryFn: () => eventsService.getOrganizerEventDetails(eventId, params),
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    refetchOnWindowFocus: true,
    retry: 3,
    enabled: !!eventId,
  });
}
