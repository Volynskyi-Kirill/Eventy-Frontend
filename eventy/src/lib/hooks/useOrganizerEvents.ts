'use client';

import { useQuery } from '@tanstack/react-query';
import { eventsService } from '@/lib/api/events.service';
import {
  EventStatus,
  OrganizerEventsQueryParams,
} from '@/lib/types/organizer-events.types';
import {
  QUERY_KEYS,
  REFETCH_INTERVAL,
  STALE_TIME,
} from '@/components/organizer/events/constants';

export function useOrganizerEvents(params?: OrganizerEventsQueryParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.ORGANIZER_EVENTS, params],
    queryFn: () => eventsService.getOrganizerEvents(params),
    staleTime: STALE_TIME.ORGANIZER_EVENTS,
    refetchInterval: REFETCH_INTERVAL.ORGANIZER_EVENTS,
    refetchOnWindowFocus: true,
    retry: 3,
  });
}

export function useUpcomingOrganizerEvents() {
  return useOrganizerEvents({ status: EventStatus.UPCOMING });
}

export function usePastOrganizerEvents() {
  return useOrganizerEvents({ status: EventStatus.PAST });
}
